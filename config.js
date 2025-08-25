// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_CONFIG = {
  url: "https://zmigzvkbyytftdocjcgz.supabase.co", // e.g., 'https://your-project.supabase.co'
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaWd6dmtieXl0ZnRkb2NqY2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwODUyODUsImV4cCI6MjA3MTY2MTI4NX0.BLzW4eCMwo9WSFsXI2EalEo1bP2rkMQOuN_dHSADjyI", // Your anon/public key from Supabase dashboard
};

// Initialize Supabase client
const supabase = window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);
