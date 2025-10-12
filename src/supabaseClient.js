import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = "https://zafimhbfebnopouewzwv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZmltaGJmZWJub3BvdWV3end2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNjk4MTksImV4cCI6MjA3NTc0NTgxOX0.YOrI7F1LbGcoHLKmbTnqe3ykHnmJ0x27oGQ5Mr37thY";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL yoki Key topilmadi. .env faylini tekshiring.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
