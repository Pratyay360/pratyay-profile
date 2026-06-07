import { createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from "vinxi/http";

export async function createClient() {
  const supabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          const cookies: { name: string; value: string }[] = [];
          const cookieHeader = getCookie("cookie");
          if (cookieHeader) {
            const pairs = cookieHeader.split(";");
            for (const pair of pairs) {
              const [name, ...rest] = pair.split("=");
              const value = rest.join("=");
              if (name && value) {
                cookies.push({
                  name: name.trim(),
                  value: decodeURIComponent(value.trim()),
                });
              }
            }
          }
          return cookies;
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              setCookie(name, value, {
                path: options?.path,
                maxAge: options?.maxAge,
                httpOnly: options?.httpOnly,
                secure: options?.secure,
                sameSite: options?.sameSite as "lax" | "strict" | "none" | undefined,
              });
            }
          } catch {
            // Server component - can't set cookies
          }
        },
      },
    },
  );

  return supabase;
}
