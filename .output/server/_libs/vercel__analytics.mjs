import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "./@radix-ui/react-aspect-ratio+[...].mjs";
//#region node_modules/.vlt/~npm~@vercel+analytics@1.6.1/node_modules/@vercel/analytics/dist/react/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var name = "@vercel/analytics";
var version = "1.6.1";
var initQueue = () => {
	if (window.va) return;
	window.va = function a(...params) {
		(window.vaq = window.vaq || []).push(params);
	};
};
function isBrowser() {
	return typeof window !== "undefined";
}
function detectEnvironment() {
	return "production";
}
function setMode(mode = "auto") {
	if (mode === "auto") {
		window.vam = detectEnvironment();
		return;
	}
	window.vam = mode;
}
function getMode() {
	return (isBrowser() ? window.vam : detectEnvironment()) || "production";
}
function isDevelopment() {
	return getMode() === "development";
}
function getScriptSrc(props) {
	if (props.scriptSrc) return props.scriptSrc;
	if (isDevelopment()) return "https://va.vercel-scripts.com/v1/script.debug.js";
	if (props.basePath) return `${props.basePath}/insights/script.js`;
	return "/_vercel/insights/script.js";
}
function inject(props = { debug: true }) {
	var _a;
	if (!isBrowser()) return;
	setMode(props.mode);
	initQueue();
	if (props.beforeSend) (_a = window.va) == null || _a.call(window, "beforeSend", props.beforeSend);
	const src = getScriptSrc(props);
	if (document.head.querySelector(`script[src*="${src}"]`)) return;
	const script = document.createElement("script");
	script.src = src;
	script.defer = true;
	script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
	script.dataset.sdkv = version;
	if (props.disableAutoTrack) script.dataset.disableAutoTrack = "1";
	if (props.endpoint) script.dataset.endpoint = props.endpoint;
	else if (props.basePath) script.dataset.endpoint = `${props.basePath}/insights`;
	if (props.dsn) script.dataset.dsn = props.dsn;
	script.onerror = () => {
		const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
		console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
	};
	if (isDevelopment() && props.debug === false) script.dataset.debug = "false";
	document.head.appendChild(script);
}
function pageview({ route, path }) {
	var _a;
	(_a = window.va) == null || _a.call(window, "pageview", {
		route,
		path
	});
}
function getBasePath() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
}
function Analytics(props) {
	(0, import_react.useEffect)(() => {
		var _a;
		if (props.beforeSend) (_a = window.va) == null || _a.call(window, "beforeSend", props.beforeSend);
	}, [props.beforeSend]);
	(0, import_react.useEffect)(() => {
		inject({
			framework: props.framework || "react",
			basePath: props.basePath ?? getBasePath(),
			...props.route !== void 0 && { disableAutoTrack: true },
			...props
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (props.route && props.path) pageview({
			route: props.route,
			path: props.path
		});
	}, [props.route, props.path]);
	return null;
}
//#endregion
export { Analytics as t };
