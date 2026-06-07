import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CoocU7WD.js
var $$splitComponentImporter = () => import("./projects-B9YCj_0H.mjs");
var fetchProjects = createServerFn().handler(createSsrRpc("d4ae728a9ff5fe98cffef47064b7742587119fa97150e5ee6e2d0c9f62b54917"));
var Route = createFileRoute("/projects")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return { projects: await fetchProjects() };
	}
});
//#endregion
export { Route as t };
