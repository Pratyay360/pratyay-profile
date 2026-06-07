import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-Bfif-6-K.mjs";
import { t as AspectRatio } from "./aspect-ratio-CRnIagDm.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Image } from "../_libs/unpic__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blogCard-Cz0YJHJT.js
var import_jsx_runtime = require_jsx_runtime();
function BlogCard({ imageUrl, link, title, brief }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: link,
		target: "_blank",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "group relative h-full overflow-hidden transition-transform hover:scale-105",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AspectRatio, {
					ratio: 16 / 9,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: imageUrl,
						alt: title,
						width: 800,
						height: 450,
						className: "object-cover w-full h-full",
						sizes: "(max-width: 768px) 100vw, 50vw"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg line-clamp-2",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					className: "line-clamp-3",
					children: brief
				})] })
			})]
		})
	});
}
//#endregion
export { BlogCard as t };
