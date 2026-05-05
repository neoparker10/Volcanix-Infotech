// supabase/functions/subscribe/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ok, err, options } from '../_shared/helpers.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return options();
  if (req.method !== 'POST') return err('Method not allowed', 405);

  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return err('Valid email is required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SB_SERVICE_KEY')!,
    );

    const { error } = await supabase.from('subscribers').insert({ email });

    if (error) {
      if (error.code === '23505') return ok({ message: 'You are already subscribed!' });
      throw error;
    }

    return ok({ message: 'Subscribed successfully! Thank you.' });
  } catch (e) {
    console.error(e);
    return err('Subscription failed', 500);
  }
});
