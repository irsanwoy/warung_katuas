import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("DEBUG: Supabase URL Being Used ->", supabaseUrl);
console.log("DEBUG: Supabase Key Starts With ->", supabaseKey?.substring(0, 15));

export const supabase = createClient(supabaseUrl, supabaseKey);
