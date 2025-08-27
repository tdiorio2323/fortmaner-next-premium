-- Tighten RLS on orders: remove overly permissive policy and add scoped write policies

-- Ensure RLS is enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop the broad policy that allowed unrestricted access
DROP POLICY IF EXISTS "Service role can manage orders" ON public.orders;

-- Keep existing SELECT policy (already present):
-- "Users can view their own orders" FOR SELECT USING (auth.uid() = user_id);

-- Add precise write policies only for authenticated users and only for their own rows
CREATE POLICY "Users can insert their own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
