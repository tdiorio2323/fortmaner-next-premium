// API route for Stripe checkout
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    // Call Supabase Edge Function for checkout
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { items }
    });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
}