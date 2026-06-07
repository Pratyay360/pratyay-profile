import { m as getCookie$1, nt as setCookie$1, t as H3Event } from "./h3+[...].mjs";
import { t as getContext$1 } from "./unctx.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
function getHTTPEvent() {
	return getEvent();
}
var HTTPEventSymbol = Symbol("$HTTPEvent");
function isEvent(obj) {
	return typeof obj === "object" && (obj instanceof H3Event || obj?.[HTTPEventSymbol] instanceof H3Event || obj?.__is_event__ === true);
}
function createWrapperFunction(h3Function) {
	return function(...args) {
		let event = args[0];
		if (!isEvent(event)) {
			if (!globalThis.app.config.server.experimental?.asyncContext) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
			event = getHTTPEvent();
			if (!event) throw new Error(`No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
			args.unshift(event);
		} else args[0] = event instanceof H3Event || event.__is_event__ ? event : event[HTTPEventSymbol];
		return h3Function(...args);
	};
}
var getCookie = createWrapperFunction(getCookie$1);
var setCookie = createWrapperFunction(setCookie$1);
function getNitroAsyncContext() {
	return getContext$1("nitro-app", {
		asyncContext: globalThis.app.config.server.experimental?.asyncContext ? true : false,
		AsyncLocalStorage
	});
}
function getEvent() {
	return getNitroAsyncContext().use().event;
}
//#endregion
export { setCookie as n, getCookie as t };
