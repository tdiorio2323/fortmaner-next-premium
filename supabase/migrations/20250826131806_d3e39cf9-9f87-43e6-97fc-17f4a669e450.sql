-- Tighten RLS on public.orders to prevent broad access while preserving functionality
-- Ensure RLS is enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policy if it exists
DO $$ BEGIN
  DROP POLICY IF EXISTS "Service role can manage orders" ON public.orders;
EXCEPTION WHEN undefined_object THEN NULL; END $$;

-- Recreate policy scoped strictly to the service_role (used by secure backend operations)
CREATE POLICY "Service role can manage orders"
ON public.orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Keep existing user-facing SELECT policy (users can only see their own orders)
-- If it doesn't exist in some environments, (re)create it safely by dropping and creating
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Users can view their own orders'
  ) THEN
    CREATE POLICY "Users can view their own orders"
    ON public.orders
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;