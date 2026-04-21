import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("--- SUPABASE DEBUG START ---");
console.log("URL From Env:", supabaseUrl);
console.log("Valid URL Format?", supabaseUrl?.startsWith('https://'));
console.log("Is haphv present?", supabaseUrl?.includes('haphv'));
console.log("--- SUPABASE DEBUG END ---");

export const supabase = createClient(supabaseUrl, supabaseKey);
