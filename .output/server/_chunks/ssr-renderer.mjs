import { mt as HTTPError, vt as toRequest } from "../_libs/h3+[...].mjs";
//#region node_modules/.aube/nitro@3.0.260603-beta_dotenv@17.4.2_giget@3.2.0_jiti@2.7.0_rollup@4.61.1_vite@0.1.24_@t_a2138a32570e43063f7fc0d1d0a7b313/node_modules/nitro/dist/runtime/vite.mjs
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
//#endregion
//#region node_modules/.aube/nitro@3.0.260603-beta_dotenv@17.4.2_giget@3.2.0_jiti@2.7.0_rollup@4.61.1_vite@0.1.24_@t_a2138a32570e43063f7fc0d1d0a7b313/node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
//#endregion
export { ssrRenderer as default };
