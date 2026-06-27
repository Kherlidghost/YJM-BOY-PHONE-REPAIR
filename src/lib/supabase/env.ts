export function hasValidSupabaseEnv(url?: string, key?: string) {
  return Boolean(
    url?.startsWith("http") &&
      key &&
      key !== "your_anon_key" &&
      !url.includes("your_project_url"),
  );
}

export function getSupabaseEnv(): { supabaseUrl: string; supabaseAnonKey: string } {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasValidSupabaseEnv(supabaseUrl, supabaseAnonKey)) {
    throw new Error(
      "Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY with real Supabase values.",
    );
  }

  return {
    supabaseUrl: supabaseUrl as string,
    supabaseAnonKey: supabaseAnonKey as string,
  };
}
