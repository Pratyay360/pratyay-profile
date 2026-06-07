import { t as createClient } from "./server-D9mWckOW.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CSiXhZNc.js
var fetchProjects_createServerFn_handler = createServerRpc({
	id: "d4ae728a9ff5fe98cffef47064b7742587119fa97150e5ee6e2d0c9f62b54917",
	name: "fetchProjects",
	filename: "src/app/projects.tsx"
}, (opts) => fetchProjects.__executeServer(opts));
var fetchProjects = createServerFn().handler(fetchProjects_createServerFn_handler, async () => {
	const { data } = await (await createClient()).from("project").select("*");
	return data ?? [];
});
//#endregion
export { fetchProjects_createServerFn_handler };
