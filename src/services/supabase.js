import { createClient } from '@supabase/supabase-js';

let supabaseAddress;

if (import.meta.env.NETLIFY === 'true') {
    supabaseAddress = process.env.VITE_SUPABASE_URL;
} else {
    supabaseAddress = import.meta.env.VITE_SUPABASE_URL;
}

export const supabaseUrl = supabaseAddress;
// export const supabaseUrl;

let supabaseKey;

if (import.meta.env.NETLIFY === 'true') {
    supabaseKey = process.env.VITE_SUPABASE_KEY;
} else {
    supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
