import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { a as useLocation, c as Outlet, d as createRootRoute, f as Link, i as HeadContent, l as lazyRouteComponent, r as Scripts, s as createRouter, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$3 } from "./blog-9CLAt1YN.mjs";
import { t as Route$4 } from "./certificates-BYfOh8G4.mjs";
import { t as Button } from "./button-DiS1eObn.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { i as Menu, n as Sun, r as Moon, t as X } from "../_libs/lucide-react.mjs";
import { t as Route$5 } from "./projects-CoocU7WD.mjs";
import { a as Viewport, i as Root2, n as Link$1, r as List, t as Item } from "../_libs/@radix-ui/react-navigation-menu+[...].mjs";
import { a as Root, i as Portal, n as Content, o as Title, r as Overlay, s as Trigger, t as Close } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as z, t as J } from "../_libs/next-themes.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CMqwYlhe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NavigationMenu({ className, children, viewport = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, {
		"data-slot": "navigation-menu",
		"data-viewport": viewport,
		className: cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className),
		...props,
		children: [children, viewport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationMenuViewport, {})]
	});
}
function NavigationMenuList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-slot": "navigation-menu-list",
		className: cn("group flex flex-1 list-none items-center justify-center gap-1", className),
		...props
	});
}
function NavigationMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		"data-slot": "navigation-menu-item",
		className: cn("relative", className),
		...props
	});
}
cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1");
function NavigationMenuViewport({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("absolute top-full left-0 isolate z-50 flex justify-center"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			"data-slot": "navigation-menu-viewport",
			className: cn("origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]", className),
			...props
		})
	});
}
function NavigationMenuLink({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		"data-slot": "navigation-menu-link",
		className: cn("data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "sheet",
		...props
	});
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "sheet-trigger",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		"data-slot": "sheet-overlay",
		className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
		"data-slot": "sheet-content",
		className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
			className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-1.5 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		"data-slot": "sheet-title",
		className: cn("text-foreground font-semibold", className),
		...props
	});
}
function ModeToggle() {
	const { theme, setTheme } = z();
	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "icon",
		onClick: toggleTheme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Toggle theme"
			})
		]
	});
}
var navItems = [
	{
		label: "About Me",
		href: "/#aboutme"
	},
	{
		label: "Education",
		href: "/#education"
	},
	{
		label: "Skills",
		href: "/#skills"
	},
	{
		label: "Certificates",
		href: "/#certificate"
	},
	{
		label: "Projects",
		href: "/#projects"
	},
	{
		label: "Blogs",
		href: "/#blogs"
	},
	{
		label: "Resume",
		href: "/#resume"
	},
	{
		label: "Donate",
		href: "/#donate"
	},
	{
		label: "Contact Me",
		href: "/#contact"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useLocation().pathname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container flex h-16 items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationMenu, {
				className: "hidden md:flex flex-1 justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationMenuList, {
					className: "gap-x-6",
					children: navItems.map(({ label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationMenuLink, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: href,
							className: cn("relative px-2 py-1 text-sm font-medium transition-colors", pathname === href ? "text-primary" : "text-muted-foreground hover:text-primary"),
							children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-200", pathname === href && "scale-x-100") })]
						})
					}) }, label))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "right",
							className: "w-64",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Menu" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "mt-6 flex flex-col space-y-3 text-gray-900 dark:text-gray-200",
									children: navItems.map(({ label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: href,
										onClick: () => setOpen(false),
										className: "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
										children: label
									}, label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 border-t pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {})
								})
							]
						})]
					})
				})]
			})]
		})
	});
}
function ThemeProvider$1({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(J, {
		...props,
		children
	});
}
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = z();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		className: "toaster group",
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)"
		},
		...props
	});
};
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-black text-white flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "mx-auto mb-6",
					width: "200",
					height: "200",
					viewBox: "0 0 200 200",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "100",
							cy: "100",
							r: "90",
							fill: "#2F2E41"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M80 60L120 140M120 60L80 140",
							stroke: "#E7D040",
							strokeWidth: "10",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "100",
							cy: "100",
							r: "30",
							fill: "#FBBEBE"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg md:text-xl text-yellow-300 mb-6",
					children: "Oops! You seem to be lost. 🥲"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-white rounded-lg shadow-md hover:shadow-lg py-2 px-6 border border-yellow-300 hover:border-transparent transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2",
					"aria-label": "Return to homepage",
					children: "Return to Home"
				})
			]
		})
	});
}
var globals_default = "/assets/globals-DRha5pEu.css";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Pratyay Mitra Mustafi" }
		],
		links: [{
			rel: "stylesheet",
			href: globals_default
		}]
	}),
	notFoundComponent: NotFound,
	component: RootLayout
});
function RootLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootDocument, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider$1, {
				attribute: "class",
				defaultTheme: "system",
				enableSystem: true,
				disableTransitionOnChange: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), children]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				closeButton: true,
				position: "bottom-right",
				expand: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$1 = () => import("./message_me-BWIp_Qw3.mjs");
var Route$1 = createFileRoute("/message_me")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./app-7JwKV-XT.mjs");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ProjectsRoute = Route$5.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$2
});
var Message_meRoute = Route$1.update({
	id: "/message_me",
	path: "/message_me",
	getParentRoute: () => Route$2
});
var CertificatesRoute = Route$4.update({
	id: "/certificates",
	path: "/certificates",
	getParentRoute: () => Route$2
});
var BlogRoute = Route$3.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$2
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	BlogRoute,
	CertificatesRoute,
	Message_meRoute,
	ProjectsRoute
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
