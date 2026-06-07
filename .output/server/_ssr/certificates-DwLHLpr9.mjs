import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { t as CertCard } from "./certificateCard-CtxAhcrF.mjs";
import { n as SkeletonTheme } from "../_libs/react-loading-skeleton.mjs";
import { t as Route } from "./certificates-BYfOh8G4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificates-DwLHLpr9.js
var import_jsx_runtime = require_jsx_runtime();
function CertificatesPage() {
	const { certificates } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-center items-center justify-center top-36 tracking-[20px] sm:text-xl text-3xl lg:text-4xl font-bold p-3",
			children: "CERTIFICATES"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "body-font",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container px-5 py-24 mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap -m-4 justify-center whitespace-break-spaces",
					children: certificates.map((cer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 md:w-1/3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertCard, {
							link: cer.link,
							imageSrc: cer.imageSrc,
							description: cer.description,
							title: cer.title
						})
					}, index))
				})
			})
		})]
	}) });
}
//#endregion
export { CertificatesPage as component };
