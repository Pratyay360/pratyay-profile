// Environment variable validation
export const env = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL!,
  VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY!,
} as const;

// Validate required environment variables
function validateEnv() {
  const missing = Object.entries(env)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
}

validateEnv();
