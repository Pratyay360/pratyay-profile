import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-9CLAt1YN.js
var $$splitComponentImporter = () => import("./blog-MJq9Eo49.mjs");
var fetchBlogPosts = createServerFn().handler(createSsrRpc("7761cc11e93e275565e2b1c0770e113c09d9e1565373c06900296a93af70bcd7"));
var Route = createFileRoute("/blog")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return { posts: await fetchBlogPosts() };
	}
});
//#endregion
export { Route as t };
