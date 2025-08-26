-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  badges TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  description TEXT,
  options JSONB DEFAULT '{}',
  variants JSONB DEFAULT '[]',
  collections TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  season TEXT CHECK (season IN ('FW', 'SS')),
  capsule TEXT,
  age_range TEXT CHECK (age_range IN ('kids', 'adult')),
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create ugc_posts table for user-generated content
CREATE TABLE public.ugc_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_url TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ig', 'fb')),
  caption TEXT,
  product_ids TEXT[] DEFAULT '{}',
  author TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create community table for events, posts, videos
CREATE TABLE public.community_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL CHECK (kind IN ('event', 'post', 'video')),
  title TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  media_url TEXT,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  location TEXT,
  author TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table for Stripe checkout tracking
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  items JSONB NOT NULL DEFAULT '[]',
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ugc_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- Create policies for UGC posts (public read approved only)
CREATE POLICY "Approved UGC posts are viewable by everyone" 
ON public.ugc_posts FOR SELECT USING (approved = true);

-- Create policies for community items (public read)
CREATE POLICY "Community items are viewable by everyone" 
ON public.community_items FOR SELECT USING (true);

-- Create policies for orders (users can view their own)
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Allow edge functions to insert/update orders
CREATE POLICY "Service role can manage orders" 
ON public.orders FOR ALL USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ugc_posts_updated_at
    BEFORE UPDATE ON public.ugc_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_items_updated_at
    BEFORE UPDATE ON public.community_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();