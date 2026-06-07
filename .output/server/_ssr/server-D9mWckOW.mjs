import { t as createServerClient } from "../_libs/@supabase/ssr+[...].mjs";
import { n as setCookie, t as getCookie } from "../_libs/vinxi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-D9mWckOW.js
async function createClient() {
	return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { cookies: {
		getAll() {
			const cookies = [];
			const cookieHeader = getCookie("cookie");
			if (cookieHeader) {
				const pairs = cookieHeader.split(";");
				for (const pair of pairs) {
					const [name, ...rest] = pair.split("=");
					const value = rest.join("=");
					if (name && value) cookies.push({
						name: name.trim(),
						value: decodeURIComponent(value.trim())
					});
				}
			}
			return cookies;
		},
		setAll(cookiesToSet) {
			try {
				for (const { name, value, options } of cookiesToSet) setCookie(name, value, {
					path: options?.path,
					maxAge: options?.maxAge,
					httpOnly: options?.httpOnly,
					secure: options?.secure,
					sameSite: options?.sameSite
				});
			} catch {}
		}
	} });
}
//#endregion
export { createClient as t };
