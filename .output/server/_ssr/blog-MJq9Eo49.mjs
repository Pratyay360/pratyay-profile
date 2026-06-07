import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { t as BlogCard } from "./blogCard-Cz0YJHJT.mjs";
import { t as Skeleton } from "../_libs/react-loading-skeleton.mjs";
import { t as Route } from "./blog-9CLAt1YN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-MJq9Eo49.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPage() {
	const { posts } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background px-4 py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-5xl font-bold text-center tracking-wider mb-16",
				children: "Blogs by Pratyay Mitra Mustafi"
			}),
			posts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							height: 220,
							className: "rounded-xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							height: 24,
							width: "70%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { count: 2 })
					]
				}, i))
			}),
			posts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto",
				children: posts.filter((p) => p.coverImage?.url).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogCard, {
					link: post.url,
					imageUrl: post.coverImage.url,
					title: post.title,
					brief: post.brief
				}, post.url))
			})
		]
	});
}
//#endregion
export { BlogPage as component };
