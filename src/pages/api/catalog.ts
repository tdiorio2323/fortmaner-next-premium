// API route for IG/FB catalog feed
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Call Supabase Edge Function for catalog
    const { data, error } = await supabase.functions.invoke('catalog-feed');

    if (error) throw error;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=catalog.csv');
    res.status(200).send(data);
  } catch (error: any) {
    console.error('Catalog error:', error);
    res.status(500).json({ error: error.message });
  }
}