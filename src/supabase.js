import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rtqvapuoilwxcuwpgxqk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cXZhcHVvaWx3eGN1d3BneHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzU5NDMsImV4cCI6MjA5NjExMTk0M30.WOhzLdTklzxJMrxEd3CBvzKH1rCmII2bVQd8hAeZbHA";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);