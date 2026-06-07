import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { a as CardTitle, i as CardHeader, r as CardDescription, t as Card } from "./card-Bfif-6-K.mjs";
import { t as AspectRatio } from "./aspect-ratio-CRnIagDm.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Image } from "../_libs/unpic__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificateCard-CtxAhcrF.js
var import_jsx_runtime = require_jsx_runtime();
function CertCard({ link, imageSrc, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: link,
		target: "_blank",
		rel: "noopener noreferrer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "group relative h-full overflow-hidden transition-transform hover:scale-105",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AspectRatio, {
				ratio: 16 / 10,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: imageSrc,
					alt: title,
					width: 800,
					height: 500,
					className: "object-cover w-full h-full",
					sizes: "(max-width: 768px) 100vw, 50vw"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-lg line-clamp-2",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				className: "line-clamp-3",
				children: description
			})] })]
		})
	});
}
//#endregion
export { CertCard as t };
