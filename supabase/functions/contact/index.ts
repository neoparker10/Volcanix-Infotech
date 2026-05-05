// supabase/functions/contact/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { ok, err, options } from '../_shared/helpers.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return options();

  if (req.method !== 'POST') return err('Method not allowed', 405);

  try {
    const body = await req.json();
    const { first_name, last_name, email, subject, message } = body;

    if (!first_name || !last_name || !email || !subject || !message) {
      return err('All fields are required');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return err('Invalid email address');
    }
    if (message.length < 10) {
      return err('Message must be at least 10 characters');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SB_SERVICE_KEY')!,
    );

    const { error } = await supabase.from('contact_messages').insert({
      first_name: String(first_name).slice(0, 100),
      last_name: String(last_name).slice(0, 100),
      email: String(email).slice(0, 255),
      subject: String(subject).slice(0, 255),
      message: String(message).slice(0, 5000),
    });

    if (error) throw error;

    return ok({ message: 'Message sent successfully! We will get back to you soon.' });
  } catch (e) {
    console.error(e);
    return err('Failed to send message. Please try again.', 500);
  }
});
