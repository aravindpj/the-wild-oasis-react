import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zkqktfprptqlyqbargpx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcWt0ZnBycHRxbHlxYmFyZ3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2ODY0NDQsImV4cCI6MjAwNTI2MjQ0NH0.FxVMWw3usUNtfXzrmivm0R79oh96ULls354KRq1zL9g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
