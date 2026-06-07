globalThis.__nitro_main__ = import.meta.url;
import { _t as toEventHandler, bt as serve, gt as defineLazyEventHandler, ht as defineHandler, mt as HTTPError, pt as H3Core, yt as NodeResponse } from "./_libs/h3+[...].mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs").then((n) => n.i)) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/.vlt/~npm~nitro@3.0.260603-beta/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/_headers": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"43-6wLjzIYbdCRUKsZakcKm2pUtf50\"",
		"mtime": "2026-06-07T15:08:05.592Z",
		"size": 67,
		"path": "../public/_headers"
	},
	"/googleb8a9572b6ecfc15f.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"36-bOvaXm3/R5NzpXa4uJ19eJsfQB0\"",
		"mtime": "2026-06-07T15:08:05.592Z",
		"size": 54,
		"path": "../public/googleb8a9572b6ecfc15f.html"
	},
	"/assets/app-D2-WcEsy.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3c4-FwdCjRzJmHvXSggDwsr45HHvYX0\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 964,
		"path": "../public/assets/app-D2-WcEsy.css"
	},
	"/assets/app-dROZzBup.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c52e-wCJfq/chSbr8BQXFjGkEFFBJDJY\"",
		"mtime": "2026-06-07T15:08:05.008Z",
		"size": 378158,
		"path": "../public/assets/app-dROZzBup.js"
	},
	"/assets/aspect-ratio-DKzLFUdO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"670f-PIrT8lirc1z28CAWBzBfD7IB9MU\"",
		"mtime": "2026-06-07T15:08:05.009Z",
		"size": 26383,
		"path": "../public/assets/aspect-ratio-DKzLFUdO.js"
	},
	"/assets/blog-CuDzOeLQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f9-sWUOLDzs0OAeABKVOhy4LpGTf+8\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 1017,
		"path": "../public/assets/blog-CuDzOeLQ.js"
	},
	"/assets/blogCard-CibB3taI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"334-cXJa86wUzozgvRelD7mxRSk/yrg\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 820,
		"path": "../public/assets/blogCard-CibB3taI.js"
	},
	"/assets/card-DSJ1--wU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39f-+ElEUtWxTxchZsbH0f7MvrIe27o\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 927,
		"path": "../public/assets/card-DSJ1--wU.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"47e-YPx/xHYvTLIY78VXIGiCKw3lalA\"",
		"mtime": "2026-06-07T15:08:05.592Z",
		"size": 1150,
		"path": "../public/favicon.ico"
	},
	"/assets/certificateCard-C4vpqN4c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f5-66bfl/hS6XBtvuTkYQ9okg4Xzqg\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 757,
		"path": "../public/assets/certificateCard-C4vpqN4c.js"
	},
	"/assets/dist-BofVhwLO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a309-0mDlmLEtbO4kjmsuByy653PDwTo\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 41737,
		"path": "../public/assets/dist-BofVhwLO.js"
	},
	"/assets/globals-D-uNZYZP.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"cd4c-AJWxTyblVxMdjN7etx5RDk1tD7k\"",
		"mtime": "2026-06-07T15:08:05.011Z",
		"size": 52556,
		"path": "../public/assets/globals-D-uNZYZP.css"
	},
	"/assets/index-CGmq9_dR.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"400-wUcO1rsTCglNSypAjlvH84Hup6s\"",
		"mtime": "2026-06-07T15:08:05.011Z",
		"size": 1024,
		"path": "../public/assets/index-CGmq9_dR.css"
	},
	"/assets/certificates-tcme1IXv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"390-CLRn1IndudblxjG2hDGBQoeLmQ4\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 912,
		"path": "../public/assets/certificates-tcme1IXv.js"
	},
	"/assets/message_me-CHuHsFdp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10be-Bcqd/KMJpGHCaieOPfQjJA/Ghm0\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 4286,
		"path": "../public/assets/message_me-CHuHsFdp.js"
	},
	"/assets/projectCard-D7jZzXMN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"367-XZfiye/png9LgO9Ss156PZZi7pg\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 871,
		"path": "../public/assets/projectCard-D7jZzXMN.js"
	},
	"/assets/projects-CI1IEB1M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-lhABMsV+HTq3fjwBVtdeDzSqNu4\"",
		"mtime": "2026-06-07T15:08:05.010Z",
		"size": 916,
		"path": "../public/assets/projects-CI1IEB1M.js"
	},
	"/assets/index-S8Lqc4bb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6535b-AqKPCUqksoXpVwEAXElvyGh4r+8\"",
		"mtime": "2026-06-07T15:08:05.007Z",
		"size": 414555,
		"path": "../public/assets/index-S8Lqc4bb.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/.vlt/~npm~nitro@3.0.260603-beta/node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_z1iZzB = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_z1iZzB
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/.vlt/~npm~nitro@3.0.260603-beta/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.vlt/~npm~nitro@3.0.260603-beta/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.vlt/~npm~nitro@3.0.260603-beta/node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/.vlt/~npm~nitro@3.0.260603-beta/node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
