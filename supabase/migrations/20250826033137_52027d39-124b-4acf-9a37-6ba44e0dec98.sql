-- Tighten RLS on orders to protect sensitive payment data
-- 1) Ensure RLS is enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 2) Remove overly permissive policy (if present)
DROP POLICY IF EXISTS "Service role can manage orders" ON public.orders;

-- 3) Recreate service role policy restricted to service_role only
CREATE POLICY "Service role can manage orders"
ON public.orders
AS PERMISSIVE
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 4) Ensure only authenticated users can view their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
