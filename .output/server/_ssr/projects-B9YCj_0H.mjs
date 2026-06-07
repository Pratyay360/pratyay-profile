import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { t as ProjectCard } from "./projectCard-B0o-de_a.mjs";
import { n as SkeletonTheme } from "../_libs/react-loading-skeleton.mjs";
import { t as Route } from "./projects-CoocU7WD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-B9YCj_0H.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "top-36 p-10 text-center items-center justify-center tracking-[20px] lg:text-5xl font-bold text-3xl ml-3",
			children: "Projects By Pratyay Mitra Mustafi"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "body-font",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container px-5 py-24 mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap -m-4 justify-center",
					children: projects.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 md:w-1/3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
							imageSrc: p.imageSrc,
							title: p.title,
							category: p.category,
							description: p.description,
							link: p.link
						})
					}, index))
				})
			})
		})]
	}) });
}
//#endregion
export { ProjectsPage as component };
