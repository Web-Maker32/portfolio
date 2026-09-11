import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasepublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasepublishableKey) {
  throw new Error("Missing Supabase environment variables in .env.local");
}

export const supabase = createClient(supabaseUrl, supabasepublishableKey);