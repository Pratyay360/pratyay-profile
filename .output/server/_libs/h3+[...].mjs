import { n as serialize, t as parse$1 } from "./cookie-es.mjs";
import { t as destr } from "./destr.mjs";
import { t as defu } from "./defu.mjs";
import nodeHTTP from "node:http";
import { PassThrough, Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import nodeHTTPS from "node:https";
import nodeHTTP2 from "node:http2";
import nodeCrypto from "node:crypto";
//#region node_modules/srvx/dist/_chunks/_url.mjs
function lazyInherit(target, source, sourceKey) {
	for (const key of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
		if (key === "constructor") continue;
		const targetDesc = Object.getOwnPropertyDescriptor(target, key);
		const desc = Object.getOwnPropertyDescriptor(source, key);
		let modified = false;
		if (desc.get) {
			modified = true;
			desc.get = targetDesc?.get || function() {
				return this[sourceKey][key];
			};
		}
		if (desc.set) {
			modified = true;
			desc.set = targetDesc?.set || function(value) {
				this[sourceKey][key] = value;
			};
		}
		if (!targetDesc?.value && typeof desc.value === "function") {
			modified = true;
			desc.value = function(...args) {
				return this[sourceKey][key](...args);
			};
		}
		if (modified) Object.defineProperty(target, key, desc);
	}
}
var _needsNormRE = /(?:(?:^|\/)(?:\.|\.\.|%2e|%2e\.|\.%2e|%2e%2e)(?:\/|$))|[\\^\x80-\uffff]/i;
var FastURL = /* @__PURE__ */ (() => {
	const NativeURL = globalThis.URL;
	const FastURL = class URL {
		#url;
		#href;
		#protocol;
		#host;
		#pathname;
		#search;
		#searchParams;
		#pos;
		constructor(url) {
			if (typeof url === "string") if (url[0] === "/") this.#href = url;
			else this.#url = new NativeURL(url);
			else if (_needsNormRE.test(url.pathname)) this.#url = new NativeURL(`${url.protocol || "http:"}//${url.host || "localhost"}${url.pathname}${url.search || ""}`);
			else {
				this.#protocol = url.protocol;
				this.#host = url.host;
				this.#pathname = url.pathname;
				this.#search = url.search;
			}
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeURL;
		}
		get _url() {
			if (this.#url) return this.#url;
			this.#url = new NativeURL(this.href);
			this.#href = void 0;
			this.#protocol = void 0;
			this.#host = void 0;
			this.#pathname = void 0;
			this.#search = void 0;
			this.#searchParams = void 0;
			this.#pos = void 0;
			return this.#url;
		}
		get href() {
			if (this.#url) return this.#url.href;
			if (!this.#href) this.#href = `${this.#protocol || "http:"}//${this.#host || "localhost"}${this.#pathname || "/"}${this.#search || ""}`;
			return this.#href;
		}
		#getPos() {
			if (!this.#pos) {
				const url = this.href;
				const protoIndex = url.indexOf("://");
				const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
				const qIndex = pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex);
				this.#pos = [
					protoIndex,
					pathnameIndex,
					qIndex
				];
			}
			return this.#pos;
		}
		get pathname() {
			if (this.#url) return this.#url.pathname;
			if (this.#pathname === void 0) {
				const [, pathnameIndex, queryIndex] = this.#getPos();
				if (pathnameIndex === -1) return this._url.pathname;
				this.#pathname = this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex);
			}
			return this.#pathname;
		}
		get search() {
			if (this.#url) return this.#url.search;
			if (this.#search === void 0) {
				const [, pathnameIndex, queryIndex] = this.#getPos();
				if (pathnameIndex === -1) return this._url.search;
				const url = this.href;
				this.#search = queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex);
			}
			return this.#search;
		}
		get searchParams() {
			if (this.#url) return this.#url.searchParams;
			if (!this.#searchParams) this.#searchParams = new URLSearchParams(this.search);
			return this.#searchParams;
		}
		get protocol() {
			if (this.#url) return this.#url.protocol;
			if (this.#protocol === void 0) {
				const [protocolIndex] = this.#getPos();
				if (protocolIndex === -1) return this._url.protocol;
				const url = this.href;
				this.#protocol = url.slice(0, protocolIndex + 1);
			}
			return this.#protocol;
		}
		toString() {
			return this.href;
		}
		toJSON() {
			return this.href;
		}
	};
	lazyInherit(FastURL.prototype, NativeURL.prototype, "_url");
	Object.setPrototypeOf(FastURL.prototype, NativeURL.prototype);
	Object.setPrototypeOf(FastURL, NativeURL);
	return FastURL;
})();
//#endregion
//#region node_modules/srvx/dist/_chunks/_utils2.mjs
function resolvePortAndHost(opts) {
	const _port = opts.port ?? globalThis.process?.env.PORT ?? 3e3;
	const port = typeof _port === "number" ? _port : Number.parseInt(_port, 10);
	if (port < 0 || port > 65535) throw new RangeError(`Port must be between 0 and 65535 (got "${port}").`);
	return {
		port,
		hostname: opts.hostname ?? globalThis.process?.env.HOST
	};
}
function fmtURL(host, port, secure) {
	if (!host || !port) return;
	if (host.includes(":")) host = `[${host}]`;
	return `http${secure ? "s" : ""}://${host}:${port}/`;
}
function printListening(opts, url) {
	if (!url || (opts.silent ?? globalThis.process?.env?.TEST)) return;
	let additionalInfo = "";
	try {
		const _url = new URL(url);
		if (_url.hostname === "[::]" || _url.hostname === "0.0.0.0") {
			_url.hostname = "localhost";
			url = _url.href;
			additionalInfo = " (all interfaces)";
		}
	} catch {}
	let listeningOn = `➜ Listening on:`;
	if (globalThis.process.stdout?.isTTY) {
		listeningOn = `\u001B[32m${listeningOn}\u001B[0m`;
		url = `\u001B[36m${url}\u001B[0m`;
		additionalInfo = `\u001B[2m${additionalInfo}\u001B[0m`;
	}
	console.log(`${listeningOn} ${url}${additionalInfo}`);
}
function resolveTLSOptions(opts) {
	if (!opts.tls || opts.protocol === "http") return;
	const cert = resolveCertOrKey(opts.tls.cert);
	const key = resolveCertOrKey(opts.tls.key);
	if (!cert && !key) {
		if (opts.protocol === "https") throw new TypeError("TLS `cert` and `key` must be provided for `https` protocol.");
		return;
	}
	if (!cert || !key) throw new TypeError("TLS `cert` and `key` must be provided together.");
	return {
		cert,
		key,
		passphrase: opts.tls.passphrase
	};
}
function resolveCertOrKey(value) {
	if (!value) return;
	if (typeof value !== "string") throw new TypeError("TLS certificate and key must be strings in PEM format or file paths.");
	if (value.startsWith("-----BEGIN ")) return value;
	const { readFileSync } = process.getBuiltinModule("node:fs");
	return readFileSync(value, "utf8");
}
function createWaitUntil() {
	const promises = /* @__PURE__ */ new Set();
	return {
		waitUntil: (promise) => {
			if (typeof promise?.then !== "function") return;
			promises.add(Promise.resolve(promise).catch(console.error).finally(() => {
				promises.delete(promise);
			}));
		},
		wait: () => {
			return Promise.all(promises);
		}
	};
}
//#endregion
//#region node_modules/srvx/dist/_chunks/_utils.mjs
var noColor = /* @__PURE__ */ (() => {
	const env = globalThis.process?.env ?? {};
	return env.NO_COLOR === "1" || env.TERM === "dumb";
})();
var _c = (c, r = 39) => (t) => noColor ? t : `\u001B[${c}m${t}\u001B[${r}m`;
var bold = /* @__PURE__ */ _c(1, 22);
var red = /* @__PURE__ */ _c(31);
var green = /* @__PURE__ */ _c(32);
var gray = /* @__PURE__ */ _c(90);
//#endregion
//#region node_modules/srvx/dist/_chunks/_plugins.mjs
function wrapFetch(server) {
	const fetchHandler = server.options.fetch;
	const middleware = server.options.middleware || [];
	return middleware.length === 0 ? fetchHandler : (request) => callMiddleware$1(request, fetchHandler, middleware, 0);
}
function callMiddleware$1(request, fetchHandler, middleware, index) {
	if (index === middleware.length) return fetchHandler(request);
	return middleware[index](request, () => callMiddleware$1(request, fetchHandler, middleware, index + 1));
}
var errorPlugin = (server) => {
	const errorHandler = server.options.error;
	if (!errorHandler) return;
	server.options.middleware.unshift((_req, next) => {
		try {
			const res = next();
			return res instanceof Promise ? res.catch((error) => errorHandler(error)) : res;
		} catch (error) {
			return errorHandler(error);
		}
	});
};
var gracefulShutdownPlugin = (server) => {
	const config = server.options?.gracefulShutdown;
	if (!globalThis.process?.on || config === false || config === void 0 && (process.env.CI || process.env.TEST)) return;
	const gracefulTimeout = config === true || !config?.gracefulTimeout ? Number.parseInt(process.env.SERVER_SHUTDOWN_TIMEOUT || "") || 5 : config.gracefulTimeout;
	let isClosing = false;
	let isClosed = false;
	const w = server.options.silent ? () => {} : process.stderr.write.bind(process.stderr);
	const forceClose = async () => {
		if (isClosed) return;
		w(red("\x1B[2K\rForcibly closing connections...\n"));
		isClosed = true;
		await server.close(true);
	};
	const shutdown = async () => {
		if (isClosing || isClosed) return;
		setTimeout(() => {
			globalThis.process.once("SIGINT", forceClose);
		}, 100);
		isClosing = true;
		const closePromise = server.close();
		for (let remaining = gracefulTimeout; remaining > 0; remaining--) {
			w(gray(`\rStopping server gracefully (${remaining}s)... Press ${bold("Ctrl+C")} again to force close.`));
			if (await Promise.race([closePromise.then(() => true), new Promise((r) => setTimeout(() => r(false), 1e3))])) {
				w("\x1B[2K\r" + green("Server closed successfully.\n"));
				isClosed = true;
				return;
			}
		}
		w("\x1B[2K\rGraceful shutdown timed out.\n");
		await forceClose();
	};
	for (const sig of ["SIGINT", "SIGTERM"]) globalThis.process.on(sig, shutdown);
};
//#endregion
//#region node_modules/srvx/dist/adapters/node.mjs
async function sendNodeResponse(nodeRes, webRes) {
	if (!webRes) {
		nodeRes.statusCode = 500;
		return endNodeResponse(nodeRes);
	}
	if (webRes._toNodeResponse) {
		const res = webRes._toNodeResponse();
		if (res.body) {
			if (res.body instanceof ReadableStream) {
				writeHead(nodeRes, res.status, res.statusText, res.headers);
				return streamBody(res.body, nodeRes);
			} else if (typeof res.body?.pipe === "function") return pipeBody(res.body, nodeRes, res.status, res.statusText, res.headers);
			writeHead(nodeRes, res.status, res.statusText, res.headers);
			nodeRes.write(res.body);
		} else writeHead(nodeRes, res.status, res.statusText, res.headers);
		return endNodeResponse(nodeRes);
	}
	const rawHeaders = [...webRes.headers];
	writeHead(nodeRes, webRes.status, webRes.statusText, rawHeaders);
	return webRes.body ? streamBody(webRes.body, nodeRes) : endNodeResponse(nodeRes);
}
function writeHead(nodeRes, status, statusText, rawHeaders) {
	const writeHeaders = rawHeaders.flat();
	if (!nodeRes.headersSent) if (nodeRes.req?.httpVersion === "2.0") nodeRes.writeHead(status, writeHeaders);
	else nodeRes.writeHead(status, statusText, writeHeaders);
}
function endNodeResponse(nodeRes) {
	return new Promise((resolve) => nodeRes.end(resolve));
}
function pipeBody(stream, nodeRes, status, statusText, headers) {
	if (nodeRes.destroyed) {
		stream.destroy?.();
		return;
	}
	if (typeof stream.on !== "function" || typeof stream.destroy !== "function") {
		writeHead(nodeRes, status, statusText, headers);
		stream.pipe(nodeRes);
		return new Promise((resolve) => nodeRes.on("close", resolve));
	}
	if (stream.destroyed) {
		writeHead(nodeRes, 500, "Internal Server Error", []);
		return endNodeResponse(nodeRes);
	}
	return new Promise((resolve) => {
		function onEarlyError() {
			stream.off("readable", onReadable);
			stream.destroy();
			writeHead(nodeRes, 500, "Internal Server Error", []);
			endNodeResponse(nodeRes).then(resolve);
		}
		function onReadable() {
			stream.off("error", onEarlyError);
			if (nodeRes.destroyed) {
				stream.destroy();
				return resolve();
			}
			writeHead(nodeRes, status, statusText, headers);
			pipeline(stream, nodeRes).catch(() => {}).then(() => resolve());
		}
		stream.once("error", onEarlyError);
		stream.once("readable", onReadable);
	});
}
function streamBody(stream, nodeRes) {
	if (nodeRes.destroyed) {
		stream.cancel();
		return;
	}
	const reader = stream.getReader();
	function streamCancel(error) {
		reader.cancel(error).catch(() => {});
		if (error) nodeRes.destroy(error);
	}
	function streamHandle({ done, value }) {
		try {
			if (done) nodeRes.end();
			else if (nodeRes.write(value)) reader.read().then(streamHandle, streamCancel);
			else nodeRes.once("drain", () => reader.read().then(streamHandle, streamCancel));
		} catch (error) {
			streamCancel(error instanceof Error ? error : void 0);
		}
	}
	nodeRes.on("close", streamCancel);
	nodeRes.on("error", streamCancel);
	reader.read().then(streamHandle, streamCancel);
	return reader.closed.catch(streamCancel).finally(() => {
		nodeRes.off("close", streamCancel);
		nodeRes.off("error", streamCancel);
	});
}
var HOST_RE = /^(\[(?:[A-Fa-f0-9:.]+)\]|(?:[A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/;
var NodeRequestURL = class extends FastURL {
	#req;
	constructor({ req }) {
		const path = req.url || "/";
		let host = req.headers.host || req.headers[":authority"];
		if (host && !HOST_RE.test(host)) host = "_invalid_";
		else if (!host) if (req.socket) host = `${req.socket.localFamily === "IPv6" ? "[" + req.socket.localAddress + "]" : req.socket.localAddress}:${req.socket?.localPort || "80"}`;
		else host = "localhost";
		const protocol = req.socket?.encrypted || req.headers["x-forwarded-proto"] === "https" || req.headers[":scheme"] === "https" ? "https:" : "http:";
		if (path[0] === "/") {
			const qIndex = path.indexOf("?");
			super({
				protocol,
				host,
				pathname: qIndex === -1 ? path : path.slice(0, qIndex) || "/",
				search: qIndex === -1 ? "" : path.slice(qIndex) || ""
			});
		} else if (path === "*") super({
			protocol,
			host,
			pathname: "/*",
			search: ""
		});
		else super(path);
		this.#req = req;
	}
	get pathname() {
		return super.pathname;
	}
	set pathname(value) {
		this._url.pathname = value;
		this.#req.url = this._url.pathname + this._url.search;
	}
};
var NodeRequestHeaders = /* @__PURE__ */ (() => {
	const NativeHeaders = globalThis.Headers;
	class Headers {
		#req;
		#headers;
		constructor(req) {
			this.#req = req;
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeHeaders;
		}
		get _headers() {
			if (!this.#headers) {
				const headers = new NativeHeaders();
				const rawHeaders = this.#req.rawHeaders;
				const len = rawHeaders.length;
				for (let i = 0; i < len; i += 2) {
					const key = rawHeaders[i];
					if (key.charCodeAt(0) === 58) continue;
					const value = rawHeaders[i + 1];
					headers.append(key, value);
				}
				this.#headers = headers;
			}
			return this.#headers;
		}
		get(name) {
			if (this.#headers) return this.#headers.get(name);
			const value = this.#req.headers[name.toLowerCase()];
			return Array.isArray(value) ? value.join(", ") : value || null;
		}
		has(name) {
			if (this.#headers) return this.#headers.has(name);
			return name.toLowerCase() in this.#req.headers;
		}
		getSetCookie() {
			if (this.#headers) return this.#headers.getSetCookie();
			const value = this.#req.headers["set-cookie"];
			return Array.isArray(value) ? value : value ? [value] : [];
		}
		entries() {
			return this._headers.entries();
		}
		[Symbol.iterator]() {
			return this.entries();
		}
	}
	lazyInherit(Headers.prototype, NativeHeaders.prototype, "_headers");
	Object.setPrototypeOf(Headers, NativeHeaders);
	Object.setPrototypeOf(Headers.prototype, NativeHeaders.prototype);
	return Headers;
})();
var NodeRequest = /* @__PURE__ */ (() => {
	const NativeRequest = globalThis.Request;
	class Request {
		runtime;
		#req;
		#url;
		#bodyStream;
		#request;
		#headers;
		#abortController;
		constructor(ctx) {
			this.#req = ctx.req;
			this.runtime = {
				name: "node",
				node: ctx
			};
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeRequest;
		}
		get ip() {
			return this.#req.socket?.remoteAddress;
		}
		get method() {
			if (this.#request) return this.#request.method;
			return this.#req.method || "GET";
		}
		get _url() {
			return this.#url ||= new NodeRequestURL({ req: this.#req });
		}
		set _url(url) {
			this.#url = url;
		}
		get url() {
			if (this.#request) return this.#request.url;
			return this._url.href;
		}
		get headers() {
			if (this.#request) return this.#request.headers;
			return this.#headers ||= new NodeRequestHeaders(this.#req);
		}
		get _abortController() {
			if (!this.#abortController) {
				this.#abortController = new AbortController();
				const { req, res } = this.runtime.node;
				const abortController = this.#abortController;
				const abort = (err) => abortController.abort?.(err);
				if (res) res.once("close", () => {
					const reqError = req.errored;
					if (reqError) abort(reqError);
					else if (!res.writableEnded) abort();
				});
				else req.once("close", () => {
					if (!req.complete) abort();
				});
			}
			return this.#abortController;
		}
		get signal() {
			return this.#request ? this.#request.signal : this._abortController.signal;
		}
		get body() {
			if (this.#request) return this.#request.body;
			if (this.#bodyStream === void 0) {
				const method = this.method;
				const hasBody = !(method === "GET" || method === "HEAD");
				this.#bodyStream = hasBody ? Readable.toWeb(this.#req) : null;
			}
			return this.#bodyStream;
		}
		text() {
			if (this.#request) return this.#request.text();
			if (this.#bodyStream !== void 0) return this.#bodyStream ? new Response(this.#bodyStream).text() : Promise.resolve("");
			return readBody$1(this.#req).then((buf) => buf.toString());
		}
		json() {
			if (this.#request) return this.#request.json();
			return this.text().then((text) => JSON.parse(text));
		}
		get _request() {
			if (!this.#request) {
				const body = this.body;
				this.#request = new NativeRequest(this.url, {
					method: this.method,
					headers: this.headers,
					signal: this._abortController.signal,
					body,
					duplex: body ? "half" : void 0
				});
				this.#headers = void 0;
				this.#bodyStream = void 0;
			}
			return this.#request;
		}
	}
	lazyInherit(Request.prototype, NativeRequest.prototype, "_request");
	Object.setPrototypeOf(Request.prototype, NativeRequest.prototype);
	return Request;
})();
function readBody$1(req) {
	if ("rawBody" in req && Buffer.isBuffer(req.rawBody)) return Promise.resolve(req.rawBody);
	return new Promise((resolve, reject) => {
		const chunks = [];
		const onData = (chunk) => {
			chunks.push(chunk);
		};
		const onError = (err) => {
			reject(err);
		};
		const onEnd = () => {
			req.off("error", onError);
			req.off("data", onData);
			resolve(Buffer.concat(chunks));
		};
		req.on("data", onData).once("end", onEnd).once("error", onError);
	});
}
var NodeResponse = /* @__PURE__ */ (() => {
	const NativeResponse = globalThis.Response;
	const STATUS_CODES = globalThis.process?.getBuiltinModule?.("node:http")?.STATUS_CODES || {};
	class NodeResponse {
		#body;
		#init;
		#headers;
		#response;
		constructor(body, init) {
			this.#body = body;
			this.#init = init;
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeResponse;
		}
		get status() {
			return this.#response?.status || this.#init?.status || 200;
		}
		get statusText() {
			return this.#response?.statusText || this.#init?.statusText || STATUS_CODES[this.status] || "";
		}
		get headers() {
			if (this.#response) return this.#response.headers;
			if (this.#headers) return this.#headers;
			const initHeaders = this.#init?.headers;
			return this.#headers = initHeaders instanceof Headers ? initHeaders : new Headers(initHeaders);
		}
		get ok() {
			if (this.#response) return this.#response.ok;
			const status = this.status;
			return status >= 200 && status < 300;
		}
		get _response() {
			if (this.#response) return this.#response;
			let body = this.#body;
			if (body && typeof body.pipe === "function" && !(body instanceof Readable)) {
				const stream = new PassThrough();
				body.pipe(stream);
				const abort = body.abort;
				if (abort) stream.once("close", () => abort());
				body = stream;
			}
			this.#response = new NativeResponse(body, this.#headers ? {
				...this.#init,
				headers: this.#headers
			} : this.#init);
			this.#init = void 0;
			this.#headers = void 0;
			this.#body = void 0;
			return this.#response;
		}
		_toNodeResponse() {
			const status = this.status;
			const statusText = this.statusText;
			let body;
			let contentType;
			let contentLength;
			if (this.#response) body = this.#response.body;
			else if (this.#body) if (this.#body instanceof ReadableStream) body = this.#body;
			else if (typeof this.#body === "string") {
				body = this.#body;
				contentType = "text/plain; charset=UTF-8";
				contentLength = Buffer.byteLength(this.#body);
			} else if (this.#body instanceof ArrayBuffer) {
				body = Buffer.from(this.#body);
				contentLength = this.#body.byteLength;
			} else if (this.#body instanceof Uint8Array) {
				body = this.#body;
				contentLength = this.#body.byteLength;
			} else if (this.#body instanceof DataView) {
				body = Buffer.from(this.#body.buffer);
				contentLength = this.#body.byteLength;
			} else if (this.#body instanceof Blob) {
				body = this.#body.stream();
				contentType = this.#body.type;
				contentLength = this.#body.size;
			} else if (typeof this.#body.pipe === "function") body = this.#body;
			else body = this._response.body;
			const headers = [];
			const initHeaders = this.#init?.headers;
			const headerEntries = this.#response?.headers || this.#headers || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : initHeaders?.entries ? initHeaders.entries() : Object.entries(initHeaders).map(([k, v]) => [k.toLowerCase(), v]) : void 0);
			let hasContentTypeHeader;
			let hasContentLength;
			if (headerEntries) for (const [key, value] of headerEntries) {
				if (Array.isArray(value)) for (const v of value) headers.push([key, v]);
				else headers.push([key, value]);
				if (key === "content-type") hasContentTypeHeader = true;
				else if (key === "content-length") hasContentLength = true;
			}
			if (contentType && !hasContentTypeHeader) headers.push(["content-type", contentType]);
			if (contentLength && !hasContentLength) headers.push(["content-length", String(contentLength)]);
			this.#init = void 0;
			this.#headers = void 0;
			this.#response = void 0;
			this.#body = void 0;
			return {
				status,
				statusText,
				headers,
				body
			};
		}
	}
	lazyInherit(NodeResponse.prototype, NativeResponse.prototype, "_response");
	Object.setPrototypeOf(NodeResponse, NativeResponse);
	Object.setPrototypeOf(NodeResponse.prototype, NativeResponse.prototype);
	return NodeResponse;
})();
function serve(options) {
	return new NodeServer(options);
}
var NodeServer = class {
	runtime = "node";
	options;
	node;
	serveOptions;
	fetch;
	waitUntil;
	#isSecure;
	#listeningPromise;
	#listenError;
	#wait;
	constructor(options) {
		this.options = {
			...options,
			middleware: [...options.middleware || []]
		};
		for (const plugin of options.plugins || []) plugin(this);
		errorPlugin(this);
		const fetchHandler = this.fetch = wrapFetch(this);
		const handler = (nodeReq, nodeRes) => {
			const reqUrl = nodeReq.url;
			if (reqUrl && reqUrl[0] !== "/" && reqUrl !== "*" && !URL.canParse(reqUrl)) {
				nodeRes.statusCode = 400;
				nodeRes.end();
				return;
			}
			const request = new NodeRequest({
				req: nodeReq,
				res: nodeRes
			});
			request.waitUntil = this.#wait?.waitUntil;
			const res = fetchHandler(request);
			return res instanceof Promise ? res.then((resolvedRes) => sendNodeResponse(nodeRes, resolvedRes)) : sendNodeResponse(nodeRes, res);
		};
		this.node = {
			handler,
			server: void 0
		};
		const loader = globalThis.__srvxLoader__;
		if (loader) {
			loader({ server: this });
			return;
		}
		gracefulShutdownPlugin(this);
		this.#wait = createWaitUntil();
		this.waitUntil = this.#wait.waitUntil;
		const tls = resolveTLSOptions(this.options);
		const { port, hostname: host } = resolvePortAndHost(this.options);
		this.serveOptions = {
			port,
			host,
			exclusive: !this.options.reusePort,
			...tls ? {
				cert: tls.cert,
				key: tls.key,
				passphrase: tls.passphrase
			} : {},
			...this.options.node
		};
		let server;
		this.#isSecure = !!this.serveOptions.cert && this.options.protocol !== "http";
		if (this.options.node?.http2 ?? this.#isSecure) if (this.#isSecure) server = nodeHTTP2.createSecureServer({
			allowHTTP1: true,
			...this.serveOptions
		}, handler);
		else throw new Error("node.http2 option requires tls certificate!");
		else if (this.#isSecure) server = nodeHTTPS.createServer(this.serveOptions, handler);
		else server = nodeHTTP.createServer(this.serveOptions, handler);
		this.node.server = server;
		if (!options.manual) this.serve().catch(() => {});
	}
	serve() {
		if (this.#listeningPromise) return this.#listeningPromise.then(() => this);
		const server = this.node?.server;
		if (!server) return Promise.reject(/* @__PURE__ */ new Error("Server not initialized"));
		this.#listenError = void 0;
		this.#listeningPromise = new Promise((resolve, reject) => {
			const onError = (error) => {
				server.off("listening", onListening);
				this.#listenError = error;
				this.#listeningPromise = void 0;
				reject(error);
			};
			const onListening = () => {
				server.off("error", onError);
				printListening(this.options, this.url);
				resolve();
			};
			server.once("error", onError);
			server.once("listening", onListening);
			server.listen(this.serveOptions);
		});
		return this.#listeningPromise.then(() => this);
	}
	get url() {
		const addr = this.node?.server?.address();
		if (!addr) return;
		return typeof addr === "string" ? addr : fmtURL(addr.address, addr.port, this.#isSecure);
	}
	ready() {
		if (this.#listenError) return Promise.reject(this.#listenError);
		return Promise.resolve(this.#listeningPromise).then(() => this);
	}
	async close(closeAll) {
		await Promise.all([this.#wait?.wait(), new Promise((resolve, reject) => {
			const server = this.node?.server;
			if (server && closeAll && "closeAllConnections" in server) server.closeAllConnections();
			if (!server || !server.listening) return resolve();
			server.close((error) => error ? reject(error) : resolve());
		})]);
	}
};
//#endregion
//#region node_modules/rou3/dist/index.mjs
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
//#endregion
//#region node_modules/h3/dist/h3.mjs
function decodePathname(pathname) {
	return decodeURI(pathname.includes("%25") ? pathname.replace(/%25/g, "%2525") : pathname);
}
var kEventNS = "h3.internal.event.";
var kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
var kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
var kEventResErrHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.err.headers`);
var H3Event$1 = class {
	app;
	req;
	url;
	context;
	static __is_event__ = true;
	constructor(req, context, app) {
		this.context = context || req.context || new NullProtoObj();
		this.req = req;
		this.app = app;
		const _url = req._url;
		const url = _url && _url instanceof URL ? _url : new FastURL(req.url);
		if (url.pathname.includes("%")) url.pathname = decodePathname(url.pathname);
		this.url = url;
	}
	get res() {
		return this[kEventRes] ||= new H3EventResponse();
	}
	get runtime() {
		return this.req.runtime;
	}
	waitUntil(promise) {
		this.req.waitUntil?.(promise);
	}
	toString() {
		return `[${this.req.method}] ${this.req.url}`;
	}
	toJSON() {
		return this.toString();
	}
	get node() {
		return this.req.runtime?.node;
	}
	get headers() {
		return this.req.headers;
	}
	get path() {
		return this.url.pathname + this.url.search;
	}
	get method() {
		return this.req.method;
	}
};
var H3EventResponse = class {
	status;
	statusText;
	get headers() {
		return this[kEventResHeaders] ||= new Headers();
	}
	get errHeaders() {
		return this[kEventResErrHeaders] ||= new Headers();
	}
};
var DISALLOWED_STATUS_CHARS$1 = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage$1(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS$1, "");
}
function sanitizeStatusCode$1(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}
var HTTPError = class HTTPError extends Error {
	get name() {
		return "HTTPError";
	}
	status;
	statusText;
	headers;
	cause;
	data;
	body;
	unhandled;
	static isError(input) {
		return input instanceof Error && input?.name === "HTTPError";
	}
	static status(status, statusText, details) {
		return new HTTPError({
			...details,
			statusText,
			status
		});
	}
	constructor(arg1, arg2) {
		let messageInput;
		let details;
		if (typeof arg1 === "string") {
			messageInput = arg1;
			details = arg2;
		} else details = arg1;
		const status = sanitizeStatusCode$1(details?.status || details?.statusCode || (details?.cause)?.status || (details?.cause)?.statusCode, 500);
		const statusText = sanitizeStatusMessage$1(details?.statusText || details?.statusMessage || (details?.cause)?.statusText || (details?.cause)?.statusMessage);
		const message = messageInput || details?.message || (details?.cause)?.message || details?.statusText || details?.statusMessage || [
			"HTTPError",
			status,
			statusText
		].filter(Boolean).join(" ");
		super(message, { cause: details });
		this.cause = details;
		this.status = status;
		this.statusText = statusText || void 0;
		const rawHeaders = details?.headers || (details?.cause)?.headers;
		this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
		this.unhandled = details?.unhandled ?? (details?.cause)?.unhandled ?? void 0;
		this.data = details?.data;
		this.body = details?.body;
	}
	get statusCode() {
		return this.status;
	}
	get statusMessage() {
		return this.statusText;
	}
	toJSON() {
		const unhandled = this.unhandled;
		return {
			status: this.status,
			statusText: this.statusText,
			unhandled,
			message: unhandled ? "HTTPError" : this.message,
			data: unhandled ? void 0 : this.data,
			...unhandled ? void 0 : this.body
		};
	}
};
function isJSONSerializable(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
var kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
var kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
	if (typeof val?.then === "function") return val.then((resolvedVal) => toResponse(resolvedVal, event, config), (r) => toResponse(typeof r === "number" ? new HTTPError({ status: r }) : r, event, config));
	const response = prepareResponse(val, event, config);
	if (typeof response?.then === "function") return toResponse(response, event, config);
	const { onResponse } = config;
	return onResponse ? Promise.resolve(onResponse(response, event)).then(() => response) : response;
}
var HTTPResponse = class {
	#headers;
	#init;
	body;
	constructor(body, init) {
		this.body = body;
		this.#init = init;
	}
	get status() {
		return this.#init?.status || 200;
	}
	get statusText() {
		return this.#init?.statusText || "OK";
	}
	get headers() {
		return this.#headers ||= new Headers(this.#init?.headers);
	}
};
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new NodeResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val?.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError } = config;
		const errHeaders = event[kEventRes]?.[kEventResErrHeaders];
		return onError && !nested ? Promise.resolve(onError(error, event)).catch((error) => error).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug, errHeaders);
	}
	const preparedRes = event[kEventRes];
	const preparedHeaders = preparedRes?.[kEventResHeaders];
	event[kEventRes] = void 0;
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const status = res.status || preparedRes?.status;
		return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: res.statusText || preparedRes?.statusText,
			headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
		});
	}
	if (!preparedHeaders || nested || !val.ok) return val;
	try {
		mergeHeaders$1(val.headers, preparedHeaders, val.headers);
		return val;
	} catch {
		return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
			status: val.status,
			statusText: val.statusText,
			headers: mergeHeaders$1(val.headers, preparedHeaders)
		});
	}
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
	for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
	else target.set(name, value);
	return target;
}
var frozen = (name) => (...args) => {
	throw new Error(`Headers are frozen (${name} ${args.join(", ")})`);
};
var FrozenHeaders = class extends Headers {
	set = frozen("set");
	append = frozen("append");
	delete = frozen("delete");
};
var emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
var jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) {
		event.res.headers.set("content-length", val.byteLength.toString());
		return { body: val };
	}
	if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val;
	if (isJSONSerializable(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = new Headers({
			"content-type": val.type,
			"content-length": val.size.toString()
		});
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug, errHeaders) {
	let headers = error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders);
	if (errHeaders) headers = mergeHeaders$1(headers, errHeaders);
	return new NodeResponse(JSON.stringify({
		...error.toJSON(),
		stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
	}, void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers
	});
}
function callMiddleware(event, middleware, handler, index = 0) {
	if (index === middleware.length) return handler(event);
	const fn = middleware[index];
	let nextCalled;
	let nextResult;
	const next = () => {
		if (nextCalled) return nextResult;
		nextCalled = true;
		nextResult = callMiddleware(event, middleware, handler, index + 1);
		return nextResult;
	};
	const ret = fn(event, next);
	return isUnhandledResponse(ret) ? next() : typeof ret?.then === "function" ? ret.then((resolved) => isUnhandledResponse(resolved) ? next() : resolved) : ret;
}
function isUnhandledResponse(val) {
	return val === void 0 || val === kNotFound;
}
function toRequest(input, options) {
	if (typeof input === "string") {
		let url = input;
		if (url[0] === "/") {
			const headers = options?.headers ? new Headers(options.headers) : void 0;
			const host = headers?.get("host") || "localhost";
			url = `${headers?.get("x-forwarded-proto") === "https" ? "https" : "http"}://${host}${url}`;
		}
		return new Request(url, options);
	} else if (options || input instanceof URL) return new Request(input, options);
	return input;
}
function defineHandler(input) {
	if (typeof input === "function") return handlerWithFetch(input);
	const handler = input.handler || (input.fetch ? function _fetchHandler(event) {
		return input.fetch(event.req);
	} : NoHandler);
	return Object.assign(handlerWithFetch(input.middleware?.length ? function _handlerMiddleware(event) {
		return callMiddleware(event, input.middleware, handler);
	} : handler), input);
}
function handlerWithFetch(handler) {
	if ("fetch" in handler) return handler;
	return Object.assign(handler, { fetch: (req) => {
		if (typeof req === "string") req = new URL(req, "http://_");
		if (req instanceof URL) req = new Request(req);
		const event = new H3Event$1(req);
		try {
			return Promise.resolve(toResponse(handler(event), event));
		} catch (error) {
			return Promise.resolve(toResponse(error, event));
		}
	} });
}
function defineLazyEventHandler(loader) {
	let handler;
	let promise;
	return defineHandler(function lazyHandler(event) {
		return handler ? handler(event) : (promise ??= Promise.resolve(loader()).then(function resolveLazyHandler(r) {
			handler = toEventHandler(r) || toEventHandler(r.default);
			if (typeof handler !== "function") throw new TypeError("Invalid lazy handler", { cause: { resolved: r } });
			return handler;
		})).then((r) => r(event));
	});
}
function toEventHandler(handler) {
	if (typeof handler === "function") return handler;
	if (typeof handler?.handler === "function" && handler.constructor?.["~h3"]) return handler.handler;
	if (typeof handler?.fetch === "function") return function _fetchHandler(event) {
		return handler.fetch(event.req);
	};
}
var NoHandler = () => kNotFound;
var H3Core = class {
	static "~h3" = true;
	config;
	"~middleware";
	"~routes" = [];
	constructor(config = {}) {
		this["~middleware"] = [];
		this.config = config;
		this.fetch = this.fetch.bind(this);
		this.handler = this.handler.bind(this);
	}
	fetch(request) {
		return this["~request"](request);
	}
	handler(event) {
		const route = this["~findRoute"](event);
		if (route) {
			event.context.params = route.params;
			event.context.matchedRoute = route.data;
		}
		const routeHandler = route?.data.handler || NoHandler;
		const middleware = this["~getMiddleware"](event, route);
		return middleware.length > 0 ? callMiddleware(event, middleware, routeHandler) : routeHandler(event);
	}
	"~request"(request, context) {
		const event = new H3Event$1(request, context, this);
		let handlerRes;
		try {
			if (this.config.onRequest) {
				const hookRes = this.config.onRequest(event);
				handlerRes = typeof hookRes?.then === "function" ? hookRes.then(() => this.handler(event)) : this.handler(event);
			} else handlerRes = this.handler(event);
		} catch (error) {
			handlerRes = Promise.reject(error);
		}
		return toResponse(handlerRes, event, this.config);
	}
	"~findRoute"(_event) {}
	"~addRoute"(_route) {
		this["~routes"].push(_route);
	}
	"~getMiddleware"(_event, route) {
		const routeMiddleware = route?.data.middleware;
		const globalMiddleware = this["~middleware"];
		return routeMiddleware ? [...globalMiddleware, ...routeMiddleware] : globalMiddleware;
	}
};
String.fromCharCode;
var PLUS_RE = /\+/g;
function decode(text = "") {
	try {
		return decodeURIComponent("" + text);
	} catch {
		return "" + text;
	}
}
function decodeQueryKey(text) {
	return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
	return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
	const object = /* @__PURE__ */ Object.create(null);
	if (parametersString[0] === "?") parametersString = parametersString.slice(1);
	for (const parameter of parametersString.split("&")) {
		const s = parameter.match(/([^=]+)=?(.*)/) || [];
		if (s.length < 2) continue;
		const key = decodeQueryKey(s[1]);
		if (key === "__proto__" || key === "constructor") continue;
		const value = decodeQueryValue(s[2] || "");
		if (object[key] === void 0) object[key] = value;
		else if (Array.isArray(object[key])) object[key].push(value);
		else object[key] = [object[key], value];
	}
	return object;
}
var PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
var PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
var PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
function hasProtocol(inputString, opts = {}) {
	if (typeof opts === "boolean") opts = { acceptRelative: opts };
	if (opts.strict) return PROTOCOL_STRICT_REGEX.test(inputString);
	return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/");
	return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
	if (!hasTrailingSlash(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
	}
	const [s0, ...s] = path.split("?");
	return ((s0.endsWith("/") ? s0.slice(0, -1) : s0) || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withoutBase(input, base) {
	if (isEmptyURL(base)) return input;
	const _base = withoutTrailingSlash(base);
	if (!input.startsWith(_base)) return input;
	const nextChar = input[_base.length];
	if (nextChar && nextChar !== "/" && nextChar !== "?") return input;
	return "/" + input.slice(_base.length).replace(/^\/+/, "");
}
function getQuery$1(input) {
	return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
	return !url || url === "/";
}
var protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
	const _specialProtoMatch = input.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
	if (_specialProtoMatch) {
		const [, _proto, _pathname = ""] = _specialProtoMatch;
		return {
			protocol: _proto.toLowerCase(),
			pathname: _pathname,
			href: _proto + _pathname,
			auth: "",
			host: "",
			search: "",
			hash: ""
		};
	}
	if (!hasProtocol(input, { acceptRelative: true })) return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
	const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
	let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
	if (protocol === "file:") path = path.replace(/\/(?=[A-Za-z]:)/, "");
	const { pathname, search, hash } = parsePath(path);
	return {
		protocol: protocol.toLowerCase(),
		auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
		host,
		pathname,
		search,
		hash,
		[protocolRelative]: !protocol
	};
}
function parsePath(input = "") {
	const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
	return {
		pathname,
		search,
		hash
	};
}
//#endregion
//#region node_modules/vinxi/node_modules/h3/node_modules/ohash/dist/shared/ohash.BvSMZzli.mjs
var defaults$1 = Object.freeze({
	ignoreUnknown: false,
	respectType: false,
	respectFunctionNames: false,
	respectFunctionProperties: false,
	unorderedObjects: true,
	unorderedArrays: false,
	unorderedSets: false,
	excludeKeys: void 0,
	excludeValues: void 0,
	replacer: void 0
});
function objectHash(object, options) {
	if (options) options = {
		...defaults$1,
		...options
	};
	else options = defaults$1;
	const hasher = createHasher(options);
	hasher.dispatch(object);
	return hasher.toString();
}
var defaultPrototypesKeys = Object.freeze([
	"prototype",
	"__proto__",
	"constructor"
]);
function createHasher(options) {
	let buff = "";
	let context = /* @__PURE__ */ new Map();
	const write = (str) => {
		buff += str;
	};
	return {
		toString() {
			return buff;
		},
		getContext() {
			return context;
		},
		dispatch(value) {
			if (options.replacer) value = options.replacer(value);
			const type = value === null ? "null" : typeof value;
			return this[type](value);
		},
		object(object) {
			if (object && typeof object.toJSON === "function") return this.object(object.toJSON());
			const objString = Object.prototype.toString.call(object);
			let objType = "";
			const objectLength = objString.length;
			if (objectLength < 10) objType = "unknown:[" + objString + "]";
			else objType = objString.slice(8, objectLength - 1);
			objType = objType.toLowerCase();
			let objectNumber = null;
			if ((objectNumber = context.get(object)) === void 0) context.set(object, context.size);
			else return this.dispatch("[CIRCULAR:" + objectNumber + "]");
			if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
				write("buffer:");
				return write(object.toString("utf8"));
			}
			if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
				if (this[objType]) this[objType](object);
				else if (!options.ignoreUnknown) this.unkown(object, objType);
			} else {
				let keys = Object.keys(object);
				if (options.unorderedObjects) keys = keys.sort();
				let extraKeys = [];
				if (options.respectType !== false && !isNativeFunction(object)) extraKeys = defaultPrototypesKeys;
				if (options.excludeKeys) {
					keys = keys.filter((key) => {
						return !options.excludeKeys(key);
					});
					extraKeys = extraKeys.filter((key) => {
						return !options.excludeKeys(key);
					});
				}
				write("object:" + (keys.length + extraKeys.length) + ":");
				const dispatchForKey = (key) => {
					this.dispatch(key);
					write(":");
					if (!options.excludeValues) this.dispatch(object[key]);
					write(",");
				};
				for (const key of keys) dispatchForKey(key);
				for (const key of extraKeys) dispatchForKey(key);
			}
		},
		array(arr, unordered) {
			unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
			write("array:" + arr.length + ":");
			if (!unordered || arr.length <= 1) {
				for (const entry of arr) this.dispatch(entry);
				return;
			}
			const contextAdditions = /* @__PURE__ */ new Map();
			const entries = arr.map((entry) => {
				const hasher = createHasher(options);
				hasher.dispatch(entry);
				for (const [key, value] of hasher.getContext()) contextAdditions.set(key, value);
				return hasher.toString();
			});
			context = contextAdditions;
			entries.sort();
			return this.array(entries, false);
		},
		date(date) {
			return write("date:" + date.toJSON());
		},
		symbol(sym) {
			return write("symbol:" + sym.toString());
		},
		unkown(value, type) {
			write(type);
			if (!value) return;
			write(":");
			if (value && typeof value.entries === "function") return this.array(Array.from(value.entries()), true);
		},
		error(err) {
			return write("error:" + err.toString());
		},
		boolean(bool) {
			return write("bool:" + bool);
		},
		string(string) {
			write("string:" + string.length + ":");
			write(string);
		},
		function(fn) {
			write("fn:");
			if (isNativeFunction(fn)) this.dispatch("[native]");
			else this.dispatch(fn.toString());
			if (options.respectFunctionNames !== false) this.dispatch("function-name:" + String(fn.name));
			if (options.respectFunctionProperties) this.object(fn);
		},
		number(number) {
			return write("number:" + number);
		},
		xml(xml) {
			return write("xml:" + xml.toString());
		},
		null() {
			return write("Null");
		},
		undefined() {
			return write("Undefined");
		},
		regexp(regex) {
			return write("regex:" + regex.toString());
		},
		uint8array(arr) {
			write("uint8array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		uint8clampedarray(arr) {
			write("uint8clampedarray:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		int8array(arr) {
			write("int8array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		uint16array(arr) {
			write("uint16array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		int16array(arr) {
			write("int16array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		uint32array(arr) {
			write("uint32array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		int32array(arr) {
			write("int32array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		float32array(arr) {
			write("float32array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		float64array(arr) {
			write("float64array:");
			return this.dispatch(Array.prototype.slice.call(arr));
		},
		arraybuffer(arr) {
			write("arraybuffer:");
			return this.dispatch(new Uint8Array(arr));
		},
		url(url) {
			return write("url:" + url.toString());
		},
		map(map) {
			write("map:");
			const arr = [...map];
			return this.array(arr, options.unorderedSets !== false);
		},
		set(set) {
			write("set:");
			const arr = [...set];
			return this.array(arr, options.unorderedSets !== false);
		},
		file(file) {
			write("file:");
			return this.dispatch([
				file.name,
				file.size,
				file.type,
				file.lastModfied
			]);
		},
		blob() {
			if (options.ignoreUnknown) return write("[blob]");
			throw new Error("Hashing Blob objects is currently not supported\nUse \"options.replacer\" or \"options.ignoreUnknown\"\n");
		},
		domwindow() {
			return write("domwindow");
		},
		bigint(number) {
			return write("bigint:" + number.toString());
		},
		process() {
			return write("process");
		},
		timer() {
			return write("timer");
		},
		pipe() {
			return write("pipe");
		},
		tcp() {
			return write("tcp");
		},
		udp() {
			return write("udp");
		},
		tty() {
			return write("tty");
		},
		statwatcher() {
			return write("statwatcher");
		},
		securecontext() {
			return write("securecontext");
		},
		connection() {
			return write("connection");
		},
		zlib() {
			return write("zlib");
		},
		context() {
			return write("context");
		},
		nodescript() {
			return write("nodescript");
		},
		httpparser() {
			return write("httpparser");
		},
		dataview() {
			return write("dataview");
		},
		signal() {
			return write("signal");
		},
		fsevent() {
			return write("fsevent");
		},
		tlswrap() {
			return write("tlswrap");
		}
	};
}
var nativeFunc = "[native code] }";
function isNativeFunction(f) {
	if (typeof f !== "function") return false;
	return Function.prototype.toString.call(f).slice(-15) === nativeFunc;
}
//#endregion
//#region node_modules/uncrypto/dist/crypto.node.mjs
var subtle = nodeCrypto.webcrypto?.subtle || {};
var randomUUID = () => {
	return nodeCrypto.randomUUID();
};
var getRandomValues = (array) => {
	return nodeCrypto.webcrypto.getRandomValues(array);
};
var _crypto = {
	randomUUID,
	getRandomValues,
	subtle
};
//#endregion
//#region node_modules/iron-webcrypto/dist/index.js
var alphabetByEncoding = {};
var alphabetByValue = Array.from({ length: 64 });
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
	const char = String.fromCharCode(i + start);
	alphabetByEncoding[char] = i;
	alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
	const char = String.fromCharCode(i + start);
	const index = i + 26;
	alphabetByEncoding[char] = index;
	alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
	alphabetByEncoding[i.toString(10)] = i + 52;
	const char = i.toString(10);
	const index = i + 52;
	alphabetByEncoding[char] = index;
	alphabetByValue[index] = char;
}
alphabetByEncoding["-"] = 62;
alphabetByValue[62] = "-";
alphabetByEncoding["_"] = 63;
alphabetByValue[63] = "_";
var bitsPerLetter = 6;
var bitsPerByte = 8;
var maxLetterValue = 63;
var stringToBuffer = (value) => {
	return new TextEncoder().encode(value);
};
var bufferToString = (value) => {
	return new TextDecoder().decode(value);
};
var base64urlDecode = (_input) => {
	const input = _input + "=".repeat((4 - _input.length % 4) % 4);
	let totalByteLength = input.length / 4 * 3;
	if (input.endsWith("==")) totalByteLength -= 2;
	else if (input.endsWith("=")) totalByteLength--;
	const out = new ArrayBuffer(totalByteLength);
	const dataView = new DataView(out);
	for (let i = 0; i < input.length; i += 4) {
		let bits = 0;
		let bitLength = 0;
		for (let j = i, limit = i + 3; j <= limit; j++) if (input[j] === "=") bits >>= bitsPerLetter;
		else {
			if (!(input[j] in alphabetByEncoding)) throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
			bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
			bitLength += bitsPerLetter;
		}
		const chunkOffset = i / 4 * 3;
		bits >>= bitLength % bitsPerByte;
		const byteLength = Math.floor(bitLength / bitsPerByte);
		for (let k = 0; k < byteLength; k++) {
			const offset = (byteLength - k - 1) * bitsPerByte;
			dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
		}
	}
	return new Uint8Array(out);
};
var base64urlEncode = (_input) => {
	const input = typeof _input === "string" ? stringToBuffer(_input) : _input;
	let str = "";
	for (let i = 0; i < input.length; i += 3) {
		let bits = 0;
		let bitLength = 0;
		for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
			bits |= input[j] << (limit - j - 1) * bitsPerByte;
			bitLength += bitsPerByte;
		}
		const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
		bits <<= bitClusterCount * bitsPerLetter - bitLength;
		for (let k = 1; k <= bitClusterCount; k++) {
			const offset = (bitClusterCount - k) * bitsPerLetter;
			str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
		}
	}
	return str;
};
var defaults = {
	encryption: {
		saltBits: 256,
		algorithm: "aes-256-cbc",
		iterations: 1,
		minPasswordlength: 32
	},
	integrity: {
		saltBits: 256,
		algorithm: "sha256",
		iterations: 1,
		minPasswordlength: 32
	},
	ttl: 0,
	timestampSkewSec: 60,
	localtimeOffsetMsec: 0
};
var clone = (options) => ({
	...options,
	encryption: { ...options.encryption },
	integrity: { ...options.integrity }
});
var algorithms = {
	"aes-128-ctr": {
		keyBits: 128,
		ivBits: 128,
		name: "AES-CTR"
	},
	"aes-256-cbc": {
		keyBits: 256,
		ivBits: 128,
		name: "AES-CBC"
	},
	sha256: {
		keyBits: 256,
		name: "SHA-256"
	}
};
var macPrefix = "Fe26.2";
var randomBytes = (_crypto, size) => {
	const bytes = new Uint8Array(size);
	_crypto.getRandomValues(bytes);
	return bytes;
};
var randomBits = (_crypto, bits) => {
	if (bits < 1) throw new Error("Invalid random bits count");
	return randomBytes(_crypto, Math.ceil(bits / 8));
};
var pbkdf2 = async (_crypto, password, salt, iterations, keyLength, hash) => {
	const passwordBuffer = stringToBuffer(password);
	const importedKey = await _crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2" }, false, ["deriveBits"]);
	const params = {
		name: "PBKDF2",
		hash,
		salt: stringToBuffer(salt),
		iterations
	};
	return await _crypto.subtle.deriveBits(params, importedKey, keyLength * 8);
};
var generateKey = async (_crypto, password, options) => {
	var _a;
	if (!(password == null ? void 0 : password.length)) throw new Error("Empty password");
	if (options == null || typeof options !== "object") throw new Error("Bad options");
	if (!(options.algorithm in algorithms)) throw new Error(`Unknown algorithm: ${options.algorithm}`);
	const algorithm = algorithms[options.algorithm];
	const result = {};
	const hmac = (_a = options.hmac) != null ? _a : false;
	const id = hmac ? {
		name: "HMAC",
		hash: algorithm.name
	} : { name: algorithm.name };
	const usage = hmac ? ["sign", "verify"] : ["encrypt", "decrypt"];
	if (typeof password === "string") {
		if (password.length < options.minPasswordlength) throw new Error(`Password string too short (min ${options.minPasswordlength} characters required)`);
		let { salt = "" } = options;
		if (!salt) {
			const { saltBits = 0 } = options;
			if (!saltBits) throw new Error("Missing salt and saltBits options");
			const randomSalt = randomBits(_crypto, saltBits);
			salt = [...new Uint8Array(randomSalt)].map((x) => x.toString(16).padStart(2, "0")).join("");
		}
		const derivedKey = await pbkdf2(_crypto, password, salt, options.iterations, algorithm.keyBits / 8, "SHA-1");
		result.key = await _crypto.subtle.importKey("raw", derivedKey, id, false, usage);
		result.salt = salt;
	} else {
		if (password.length < algorithm.keyBits / 8) throw new Error("Key buffer (password) too small");
		result.key = await _crypto.subtle.importKey("raw", password, id, false, usage);
		result.salt = "";
	}
	if (options.iv) result.iv = options.iv;
	else if ("ivBits" in algorithm) result.iv = randomBits(_crypto, algorithm.ivBits);
	return result;
};
var getEncryptParams = (algorithm, key, data) => {
	return [
		algorithm === "aes-128-ctr" ? {
			name: "AES-CTR",
			counter: key.iv,
			length: 128
		} : {
			name: "AES-CBC",
			iv: key.iv
		},
		key.key,
		typeof data === "string" ? stringToBuffer(data) : data
	];
};
var encrypt = async (_crypto, password, options, data) => {
	const key = await generateKey(_crypto, password, options);
	const encrypted = await _crypto.subtle.encrypt(...getEncryptParams(options.algorithm, key, data));
	return {
		encrypted: new Uint8Array(encrypted),
		key
	};
};
var decrypt = async (_crypto, password, options, data) => {
	const key = await generateKey(_crypto, password, options);
	const decrypted = await _crypto.subtle.decrypt(...getEncryptParams(options.algorithm, key, data));
	return bufferToString(new Uint8Array(decrypted));
};
var hmacWithPassword = async (_crypto, password, options, data) => {
	const key = await generateKey(_crypto, password, {
		...options,
		hmac: true
	});
	const textBuffer = stringToBuffer(data);
	const signed = await _crypto.subtle.sign({ name: "HMAC" }, key.key, textBuffer);
	return {
		digest: base64urlEncode(new Uint8Array(signed)),
		salt: key.salt
	};
};
var normalizePassword = (password) => {
	if (typeof password === "string" || password instanceof Uint8Array) return {
		encryption: password,
		integrity: password
	};
	if ("secret" in password) return {
		id: password.id,
		encryption: password.secret,
		integrity: password.secret
	};
	return {
		id: password.id,
		encryption: password.encryption,
		integrity: password.integrity
	};
};
var seal = async (_crypto, object, password, options) => {
	if (!password) throw new Error("Empty password");
	const opts = clone(options);
	const now = Date.now() + (opts.localtimeOffsetMsec || 0);
	const objectString = JSON.stringify(object);
	const { id = "", encryption, integrity } = normalizePassword(password);
	if (id && !/^\w+$/.test(id)) throw new Error("Invalid password id");
	const { encrypted, key } = await encrypt(_crypto, encryption, opts.encryption, objectString);
	const encryptedB64 = base64urlEncode(new Uint8Array(encrypted));
	const iv = base64urlEncode(key.iv);
	const expiration = opts.ttl ? now + opts.ttl : "";
	const macBaseString = `${macPrefix}*${id}*${key.salt}*${iv}*${encryptedB64}*${expiration}`;
	const mac = await hmacWithPassword(_crypto, integrity, opts.integrity, macBaseString);
	return `${macBaseString}*${mac.salt}*${mac.digest}`;
};
var fixedTimeComparison = (a, b) => {
	let mismatch = a.length === b.length ? 0 : 1;
	if (mismatch) b = a;
	for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return mismatch === 0;
};
var unseal = async (_crypto, sealed, password, options) => {
	if (!password) throw new Error("Empty password");
	const opts = clone(options);
	const now = Date.now() + (opts.localtimeOffsetMsec || 0);
	const parts = sealed.split("*");
	if (parts.length !== 8) throw new Error("Incorrect number of sealed components");
	const prefix = parts[0];
	let passwordId = parts[1];
	const encryptionSalt = parts[2];
	const encryptionIv = parts[3];
	const encryptedB64 = parts[4];
	const expiration = parts[5];
	const hmacSalt = parts[6];
	const hmac = parts[7];
	const macBaseString = `${prefix}*${passwordId}*${encryptionSalt}*${encryptionIv}*${encryptedB64}*${expiration}`;
	if ("Fe26.2" !== prefix) throw new Error("Wrong mac prefix");
	if (expiration) {
		if (!/^\d+$/.test(expiration)) throw new Error("Invalid expiration");
		if (Number.parseInt(expiration, 10) <= now - opts.timestampSkewSec * 1e3) throw new Error("Expired seal");
	}
	let pass = "";
	passwordId = passwordId || "default";
	if (typeof password === "string" || password instanceof Uint8Array) pass = password;
	else if (passwordId in password) pass = password[passwordId];
	else throw new Error(`Cannot find password: ${passwordId}`);
	pass = normalizePassword(pass);
	const macOptions = opts.integrity;
	macOptions.salt = hmacSalt;
	if (!fixedTimeComparison((await hmacWithPassword(_crypto, pass.integrity, macOptions, macBaseString)).digest, hmac)) throw new Error("Bad hmac value");
	const encrypted = base64urlDecode(encryptedB64);
	const decryptOptions = opts.encryption;
	decryptOptions.salt = encryptionSalt;
	decryptOptions.iv = base64urlDecode(encryptionIv);
	const decrypted = await decrypt(_crypto, pass.encryption, decryptOptions, encrypted);
	if (decrypted) return JSON.parse(decrypted);
	return null;
};
//#endregion
//#region node_modules/vinxi/node_modules/h3/dist/index.mjs
function useBase(base, handler) {
	base = withoutTrailingSlash(base);
	if (!base || base === "/") return handler;
	return eventHandler(async (event) => {
		event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
		const _path = event._path || event.node.req.url || "/";
		event._path = withoutBase(event.path || "/", base);
		event.node.req.url = event._path;
		try {
			return await handler(event);
		} finally {
			event._path = event.node.req.url = _path;
		}
	});
}
function hasProp(obj, prop) {
	try {
		return prop in obj;
	} catch {
		return false;
	}
}
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
	__defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
	return value;
};
var H3Error = class extends Error {
	constructor(message, opts = {}) {
		super(message, opts);
		__publicField$2(this, "statusCode", 500);
		__publicField$2(this, "fatal", false);
		__publicField$2(this, "unhandled", false);
		__publicField$2(this, "statusMessage");
		__publicField$2(this, "data");
		__publicField$2(this, "cause");
		if (opts.cause && !this.cause) this.cause = opts.cause;
	}
	toJSON() {
		const obj = {
			message: this.message,
			statusCode: sanitizeStatusCode(this.statusCode, 500)
		};
		if (this.statusMessage) obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
		if (this.data !== void 0) obj.data = this.data;
		return obj;
	}
};
__publicField$2(H3Error, "__h3_error__", true);
function createError(input) {
	if (typeof input === "string") return new H3Error(input);
	if (isError(input)) return input;
	const err = new H3Error(input.message ?? input.statusMessage ?? "", { cause: input.cause || input });
	if (hasProp(input, "stack")) try {
		Object.defineProperty(err, "stack", { get() {
			return input.stack;
		} });
	} catch {
		try {
			err.stack = input.stack;
		} catch {}
	}
	if (input.data) err.data = input.data;
	if (input.statusCode) err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
	else if (input.status) err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
	if (input.statusMessage) err.statusMessage = input.statusMessage;
	else if (input.statusText) err.statusMessage = input.statusText;
	if (err.statusMessage) {
		const originalMessage = err.statusMessage;
		if (sanitizeStatusMessage(err.statusMessage) !== originalMessage) console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
	}
	if (input.fatal !== void 0) err.fatal = input.fatal;
	if (input.unhandled !== void 0) err.unhandled = input.unhandled;
	return err;
}
function sendError(event, error, debug) {
	if (event.handled) return;
	const h3Error = isError(error) ? error : createError(error);
	const responseBody = {
		statusCode: h3Error.statusCode,
		statusMessage: h3Error.statusMessage,
		stack: [],
		data: h3Error.data
	};
	if (debug) responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
	if (event.handled) return;
	setResponseStatus(event, Number.parseInt(h3Error.statusCode), h3Error.statusMessage);
	event.node.res.setHeader("content-type", MIMES.json);
	event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
	return input?.constructor?.__h3_error__ === true;
}
function parse(multipartBodyBuffer, boundary) {
	let lastline = "";
	let state = 0;
	let buffer = [];
	const allParts = [];
	let currentPartHeaders = [];
	for (let i = 0; i < multipartBodyBuffer.length; i++) {
		const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
		const currByte = multipartBodyBuffer[i];
		if (!(currByte === 10 || currByte === 13)) lastline += String.fromCodePoint(currByte);
		const newLineDetected = currByte === 10 && prevByte === 13;
		if (0 === state && newLineDetected) {
			if ("--" + boundary === lastline) state = 1;
			lastline = "";
		} else if (1 === state && newLineDetected) {
			if (lastline.length > 0) {
				const i2 = lastline.indexOf(":");
				if (i2 > 0) {
					const name = lastline.slice(0, i2).toLowerCase();
					const value = lastline.slice(i2 + 1).trim();
					currentPartHeaders.push([name, value]);
				}
			} else {
				state = 2;
				buffer = [];
			}
			lastline = "";
		} else if (2 === state) {
			if (lastline.length > boundary.length + 4) lastline = "";
			if ("--" + boundary === lastline) {
				const j = buffer.length - lastline.length;
				const part = buffer.slice(0, j - 1);
				allParts.push(process$1(part, currentPartHeaders));
				buffer = [];
				currentPartHeaders = [];
				lastline = "";
				state = 3;
			} else buffer.push(currByte);
			if (newLineDetected) lastline = "";
		} else if (3 === state && newLineDetected) state = 1;
	}
	return allParts;
}
function process$1(data, headers) {
	const dataObj = {};
	const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
	for (const i of contentDispositionHeader.split(";")) {
		const s = i.split("=");
		if (s.length !== 2) continue;
		const key = (s[0] || "").trim();
		if (key === "name" || key === "filename") {
			const _value = (s[1] || "").trim().replace(/"/g, "");
			dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
		}
	}
	const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
	if (contentType) dataObj.type = contentType;
	dataObj.data = Buffer.from(data);
	return dataObj;
}
async function validateData(data, fn) {
	try {
		const res = await fn(data);
		if (res === false) throw createValidationError();
		if (res === true) return data;
		return res ?? data;
	} catch (error) {
		throw createValidationError(error);
	}
}
function createValidationError(validateError) {
	throw createError({
		status: 400,
		statusMessage: "Validation Error",
		message: validateError?.message || "Validation Error",
		data: validateError
	});
}
function getQuery(event) {
	return getQuery$1(event.path || "");
}
function getValidatedQuery(event, validate) {
	return validateData(getQuery(event), validate);
}
function getRouterParams(event, opts = {}) {
	let params = event.context.params || {};
	if (opts.decode) {
		params = { ...params };
		for (const key in params) params[key] = decode(params[key]);
	}
	return params;
}
function getValidatedRouterParams(event, validate, opts = {}) {
	return validateData(getRouterParams(event, opts), validate);
}
function getRouterParam(event, name, opts = {}) {
	return getRouterParams(event, opts)[name];
}
function isMethod(event, expected, allowHead) {
	if (allowHead && event.method === "HEAD") return true;
	if (typeof expected === "string") {
		if (event.method === expected) return true;
	} else if (expected.includes(event.method)) return true;
	return false;
}
function assertMethod(event, expected, allowHead) {
	if (!isMethod(event, expected, allowHead)) throw createError({
		statusCode: 405,
		statusMessage: "HTTP method is not allowed."
	});
}
function getRequestHeaders(event) {
	const _headers = {};
	for (const key in event.node.req.headers) {
		const val = event.node.req.headers[key];
		_headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
	}
	return _headers;
}
var getHeaders = getRequestHeaders;
function getRequestHeader(event, name) {
	return getRequestHeaders(event)[name.toLowerCase()];
}
var getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
	if (opts.xForwardedHost) {
		const xForwardedHost = event.node.req.headers["x-forwarded-host"];
		if (xForwardedHost) return xForwardedHost;
	}
	return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
	if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") return "https";
	return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
	const host = getRequestHost(event, opts);
	const protocol = getRequestProtocol(event, opts);
	const path = (event.node.req.originalUrl || event.path).replace(/^[/\\]+/g, "/");
	return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
	return event.web?.request || new Request(getRequestURL(event), {
		duplex: "half",
		method: event.method,
		headers: event.headers,
		body: getRequestWebStream(event)
	});
}
function getRequestIP(event, opts = {}) {
	if (event.context.clientAddress) return event.context.clientAddress;
	if (opts.xForwardedFor) {
		const xForwardedFor = getRequestHeader(event, "x-forwarded-for")?.split(",").shift()?.trim();
		if (xForwardedFor) return xForwardedFor;
	}
	if (event.node.req.socket.remoteAddress) return event.node.req.socket.remoteAddress;
}
var RawBodySymbol = Symbol.for("h3RawBody");
var ParsedBodySymbol = Symbol.for("h3ParsedBody");
var PayloadMethods$1 = [
	"PATCH",
	"POST",
	"PUT",
	"DELETE"
];
function readRawBody(event, encoding = "utf8") {
	assertMethod(event, PayloadMethods$1);
	const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
	if (_rawBody) {
		const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
			if (Buffer.isBuffer(_resolved)) return _resolved;
			if (typeof _resolved.pipeTo === "function") return new Promise((resolve, reject) => {
				const chunks = [];
				_resolved.pipeTo(new WritableStream({
					write(chunk) {
						chunks.push(chunk);
					},
					close() {
						resolve(Buffer.concat(chunks));
					},
					abort(reason) {
						reject(reason);
					}
				})).catch(reject);
			});
			else if (typeof _resolved.pipe === "function") return new Promise((resolve, reject) => {
				const chunks = [];
				_resolved.on("data", (chunk) => {
					chunks.push(chunk);
				}).on("end", () => {
					resolve(Buffer.concat(chunks));
				}).on("error", reject);
			});
			if (_resolved.constructor === Object) return Buffer.from(JSON.stringify(_resolved));
			if (_resolved instanceof URLSearchParams) return Buffer.from(_resolved.toString());
			return Buffer.from(_resolved);
		});
		return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
	}
	if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) return Promise.resolve(void 0);
	const promise = event.node.req[RawBodySymbol] = new Promise((resolve, reject) => {
		const bodyData = [];
		event.node.req.on("error", (err) => {
			reject(err);
		}).on("data", (chunk) => {
			bodyData.push(chunk);
		}).on("end", () => {
			resolve(Buffer.concat(bodyData));
		});
	});
	return encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
}
async function readBody(event, options = {}) {
	const request = event.node.req;
	if (hasProp(request, ParsedBodySymbol)) return request[ParsedBodySymbol];
	const contentType = request.headers["content-type"] || "";
	const body = await readRawBody(event);
	let parsed;
	if (contentType === "application/json") parsed = _parseJSON(body, options.strict ?? true);
	else if (contentType.startsWith("application/x-www-form-urlencoded")) parsed = _parseURLEncodedBody(body);
	else if (contentType.startsWith("text/")) parsed = body;
	else parsed = _parseJSON(body, options.strict ?? false);
	request[ParsedBodySymbol] = parsed;
	return parsed;
}
async function readValidatedBody(event, validate) {
	return validateData(await readBody(event, { strict: true }), validate);
}
async function readMultipartFormData(event) {
	const contentType = getRequestHeader(event, "content-type");
	if (!contentType || !contentType.startsWith("multipart/form-data")) return;
	const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
	if (!boundary) return;
	const body = await readRawBody(event, false);
	if (!body) return;
	return parse(body, boundary);
}
async function readFormData(event) {
	return await toWebRequest(event).formData();
}
function getRequestWebStream(event) {
	if (!PayloadMethods$1.includes(event.method)) return;
	const bodyStream = event.web?.request?.body || event._requestBody;
	if (bodyStream) return bodyStream;
	if (RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req) return new ReadableStream({ async start(controller) {
		const _rawBody = await readRawBody(event, false);
		if (_rawBody) controller.enqueue(_rawBody);
		controller.close();
	} });
	return new ReadableStream({ start: (controller) => {
		event.node.req.on("data", (chunk) => {
			controller.enqueue(chunk);
		});
		event.node.req.on("end", () => {
			controller.close();
		});
		event.node.req.on("error", (err) => {
			controller.error(err);
		});
	} });
}
function _parseJSON(body = "", strict) {
	if (!body) return;
	try {
		return destr(body, { strict });
	} catch {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			message: "Invalid JSON body"
		});
	}
}
function _parseURLEncodedBody(body) {
	const form = new URLSearchParams(body);
	const parsedForm = /* @__PURE__ */ Object.create(null);
	for (const [key, value] of form.entries()) if (hasProp(parsedForm, key)) {
		if (!Array.isArray(parsedForm[key])) parsedForm[key] = [parsedForm[key]];
		parsedForm[key].push(value);
	} else parsedForm[key] = value;
	return parsedForm;
}
function handleCacheHeaders(event, opts) {
	const cacheControls = ["public", ...opts.cacheControls || []];
	let cacheMatched = false;
	if (opts.maxAge !== void 0) cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
	if (opts.modifiedTime) {
		const modifiedTime = new Date(opts.modifiedTime);
		const ifModifiedSince = event.node.req.headers["if-modified-since"];
		event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
		if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) cacheMatched = true;
	}
	if (opts.etag) {
		event.node.res.setHeader("etag", opts.etag);
		if (event.node.req.headers["if-none-match"] === opts.etag) cacheMatched = true;
	}
	event.node.res.setHeader("cache-control", cacheControls.join(", "));
	if (cacheMatched) {
		event.node.res.statusCode = 304;
		if (!event.handled) event.node.res.end();
		return true;
	}
	return false;
}
var MIMES = {
	html: "text/html",
	json: "application/json"
};
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = Number.parseInt(statusCode, 10);
	if (statusCode < 100 || statusCode > 999) return defaultStatusCode;
	return statusCode;
}
function parseCookies(event) {
	return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
	return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
	serializeOptions = {
		path: "/",
		...serializeOptions
	};
	const cookieStr = serialize(name, value, serializeOptions);
	let setCookies = event.node.res.getHeader("set-cookie");
	if (!Array.isArray(setCookies)) setCookies = [setCookies];
	const _optionsHash = objectHash(serializeOptions);
	setCookies = setCookies.filter((cookieValue) => {
		return cookieValue && _optionsHash !== objectHash(parse$1(cookieValue));
	});
	event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
	setCookie(event, name, "", {
		...serializeOptions,
		maxAge: 0
	});
}
function splitCookiesString(cookiesString) {
	if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitCookiesString(c));
	if (typeof cookiesString !== "string") return [];
	const cookiesStrings = [];
	let pos = 0;
	let start;
	let ch;
	let lastComma;
	let nextStart;
	let cookiesSeparatorFound;
	const skipWhitespace = () => {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
		return pos < cookiesString.length;
	};
	const notSpecialChar = () => {
		ch = cookiesString.charAt(pos);
		return ch !== "=" && ch !== ";" && ch !== ",";
	};
	while (pos < cookiesString.length) {
		start = pos;
		cookiesSeparatorFound = false;
		while (skipWhitespace()) {
			ch = cookiesString.charAt(pos);
			if (ch === ",") {
				lastComma = pos;
				pos += 1;
				skipWhitespace();
				nextStart = pos;
				while (pos < cookiesString.length && notSpecialChar()) pos += 1;
				if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
					cookiesSeparatorFound = true;
					pos = nextStart;
					cookiesStrings.push(cookiesString.slice(start, lastComma));
					start = pos;
				} else pos = lastComma + 1;
			} else pos += 1;
		}
		if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
	}
	return cookiesStrings;
}
var defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
	if (type) defaultContentType(event, type);
	return new Promise((resolve) => {
		defer(() => {
			if (!event.handled) event.node.res.end(data);
			resolve();
		});
	});
}
function sendNoContent(event, code) {
	if (event.handled) return;
	if (!code && event.node.res.statusCode !== 200) code = event.node.res.statusCode;
	const _code = sanitizeStatusCode(code, 204);
	if (_code === 204) event.node.res.removeHeader("content-length");
	event.node.res.writeHead(_code);
	event.node.res.end();
}
function setResponseStatus(event, code, text) {
	if (code) event.node.res.statusCode = sanitizeStatusCode(code, event.node.res.statusCode);
	if (text) event.node.res.statusMessage = sanitizeStatusMessage(text);
}
function getResponseStatus(event) {
	return event.node.res.statusCode;
}
function getResponseStatusText(event) {
	return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
	if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) event.node.res.setHeader("content-type", type);
}
function sendRedirect(event, location, code = 302) {
	event.node.res.statusCode = sanitizeStatusCode(code, event.node.res.statusCode);
	event.node.res.setHeader("location", location);
	return send(event, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${location.replace(/"/g, "%22")}"></head></html>`, MIMES.html);
}
function getResponseHeaders(event) {
	return event.node.res.getHeaders();
}
function getResponseHeader(event, name) {
	return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
	for (const [name, value] of Object.entries(headers)) event.node.res.setHeader(name, value);
}
var setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
	event.node.res.setHeader(name, value);
}
var setHeader = setResponseHeader;
function appendResponseHeaders(event, headers) {
	for (const [name, value] of Object.entries(headers)) appendResponseHeader(event, name, value);
}
var appendHeaders = appendResponseHeaders;
function appendResponseHeader(event, name, value) {
	let current = event.node.res.getHeader(name);
	if (!current) {
		event.node.res.setHeader(name, value);
		return;
	}
	if (!Array.isArray(current)) current = [current.toString()];
	event.node.res.setHeader(name, [...current, value]);
}
var appendHeader = appendResponseHeader;
function clearResponseHeaders(event, headerNames) {
	if (headerNames && headerNames.length > 0) for (const name of headerNames) removeResponseHeader(event, name);
	else for (const [name] of Object.entries(getResponseHeaders(event))) removeResponseHeader(event, name);
}
function removeResponseHeader(event, name) {
	return event.node.res.removeHeader(name);
}
function sendStream(event, stream) {
	if (!stream || typeof stream !== "object") throw new Error("[h3] Invalid stream provided.");
	event.node.res._data = stream;
	if (!event.node.res.socket) {
		event._handled = true;
		return Promise.resolve();
	}
	if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") return stream.pipeTo(new WritableStream({ write(chunk) {
		event.node.res.write(chunk);
	} })).then(() => {
		event.node.res.end();
	});
	if (hasProp(stream, "pipe") && typeof stream.pipe === "function") return new Promise((resolve, reject) => {
		stream.pipe(event.node.res);
		if (stream.on) {
			stream.on("end", () => {
				event.node.res.end();
				resolve();
			});
			stream.on("error", (error) => {
				reject(error);
			});
		}
		event.node.res.on("close", () => {
			if (stream.abort) stream.abort();
		});
	});
	throw new Error("[h3] Invalid or incompatible stream provided.");
}
var noop = () => {};
function writeEarlyHints(event, hints, cb = noop) {
	if (!event.node.res.socket) {
		cb();
		return;
	}
	if (typeof hints === "string" || Array.isArray(hints)) hints = { link: hints };
	if (hints.link) hints.link = Array.isArray(hints.link) ? hints.link : hints.link.split(",");
	const headers = Object.entries(hints).map((e) => [e[0].toLowerCase(), e[1]]);
	if (headers.length === 0) {
		cb();
		return;
	}
	let hint = "HTTP/1.1 103 Early Hints";
	if (hints.link) hint += `\r
Link: ${hints.link.join(", ")}`;
	for (const [header, value] of headers) {
		if (header === "link") continue;
		hint += `\r
${header}: ${value}`;
	}
	if (event.node.res.socket) event.node.res.socket.write(`${hint}\r
\r
`, "utf8", cb);
	else cb();
}
function sendWebResponse(event, response) {
	for (const [key, value] of response.headers) if (key === "set-cookie") event.node.res.appendHeader(key, splitCookiesString(value));
	else event.node.res.setHeader(key, value);
	if (response.status) event.node.res.statusCode = sanitizeStatusCode(response.status, event.node.res.statusCode);
	if (response.statusText) event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
	if (response.redirected) event.node.res.setHeader("location", response.url);
	if (!response.body) {
		event.node.res.end();
		return;
	}
	return sendStream(event, response.body);
}
function resolveCorsOptions(options = {}) {
	return defu(options, {
		origin: "*",
		methods: "*",
		allowHeaders: "*",
		exposeHeaders: "*",
		credentials: false,
		maxAge: false,
		preflight: { statusCode: 204 }
	});
}
function isPreflightRequest(event) {
	const origin = getRequestHeader(event, "origin");
	const accessControlRequestMethod = getRequestHeader(event, "access-control-request-method");
	return event.method === "OPTIONS" && !!origin && !!accessControlRequestMethod;
}
function isCorsOriginAllowed(origin, options) {
	const { origin: originOption } = options;
	if (!origin || !originOption || originOption === "*" || originOption === "null") return true;
	if (Array.isArray(originOption)) return originOption.some((_origin) => {
		if (_origin instanceof RegExp) return _origin.test(origin);
		return origin === _origin;
	});
	return originOption(origin);
}
function createOriginHeaders(event, options) {
	const { origin: originOption } = options;
	const origin = getRequestHeader(event, "origin");
	if (!origin || !originOption || originOption === "*") return { "access-control-allow-origin": "*" };
	if (typeof originOption === "string") return {
		"access-control-allow-origin": originOption,
		vary: "origin"
	};
	return isCorsOriginAllowed(origin, options) ? {
		"access-control-allow-origin": origin,
		vary: "origin"
	} : {};
}
function createMethodsHeaders(options) {
	const { methods } = options;
	if (!methods) return {};
	if (methods === "*") return { "access-control-allow-methods": "*" };
	return methods.length > 0 ? { "access-control-allow-methods": methods.join(",") } : {};
}
function createCredentialsHeaders(options) {
	const { credentials } = options;
	if (credentials) return { "access-control-allow-credentials": "true" };
	return {};
}
function createAllowHeaderHeaders(event, options) {
	const { allowHeaders } = options;
	if (!allowHeaders || allowHeaders === "*" || allowHeaders.length === 0) {
		const header = getRequestHeader(event, "access-control-request-headers");
		return header ? {
			"access-control-allow-headers": header,
			vary: "access-control-request-headers"
		} : {};
	}
	return {
		"access-control-allow-headers": allowHeaders.join(","),
		vary: "access-control-request-headers"
	};
}
function createExposeHeaders(options) {
	const { exposeHeaders } = options;
	if (!exposeHeaders) return {};
	if (exposeHeaders === "*") return { "access-control-expose-headers": exposeHeaders };
	return { "access-control-expose-headers": exposeHeaders.join(",") };
}
function appendCorsPreflightHeaders(event, options) {
	appendHeaders(event, createOriginHeaders(event, options));
	appendHeaders(event, createCredentialsHeaders(options));
	appendHeaders(event, createExposeHeaders(options));
	appendHeaders(event, createMethodsHeaders(options));
	appendHeaders(event, createAllowHeaderHeaders(event, options));
}
function appendCorsHeaders(event, options) {
	appendHeaders(event, createOriginHeaders(event, options));
	appendHeaders(event, createCredentialsHeaders(options));
	appendHeaders(event, createExposeHeaders(options));
}
function handleCors(event, options) {
	const _options = resolveCorsOptions(options);
	if (isPreflightRequest(event)) {
		appendCorsPreflightHeaders(event, options);
		sendNoContent(event, _options.preflight.statusCode);
		return true;
	}
	appendCorsHeaders(event, options);
	return false;
}
async function getRequestFingerprint(event, opts = {}) {
	const fingerprint = [];
	if (opts.ip !== false) fingerprint.push(getRequestIP(event, { xForwardedFor: opts.xForwardedFor }));
	if (opts.method === true) fingerprint.push(event.method);
	if (opts.path === true) fingerprint.push(event.path);
	if (opts.userAgent === true) fingerprint.push(getRequestHeader(event, "user-agent"));
	const fingerprintString = fingerprint.filter(Boolean).join("|");
	if (!fingerprintString) return null;
	if (opts.hash === false) return fingerprintString;
	const buffer = await _crypto.subtle.digest(opts.hash || "SHA-1", new TextEncoder().encode(fingerprintString));
	return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
var PayloadMethods = /* @__PURE__ */ new Set([
	"PATCH",
	"POST",
	"PUT",
	"DELETE"
]);
var ignoredHeaders = /* @__PURE__ */ new Set([
	"transfer-encoding",
	"connection",
	"keep-alive",
	"upgrade",
	"expect",
	"host",
	"accept"
]);
async function proxyRequest(event, target, opts = {}) {
	let body;
	let duplex;
	if (PayloadMethods.has(event.method)) if (opts.streamRequest) {
		body = getRequestWebStream(event);
		duplex = "half";
	} else body = await readRawBody(event, false).catch(() => void 0);
	const method = opts.fetchOptions?.method || event.method;
	const fetchHeaders = mergeHeaders(getProxyRequestHeaders(event), opts.fetchOptions?.headers, opts.headers);
	return sendProxy(event, target, {
		...opts,
		fetchOptions: {
			method,
			body,
			duplex,
			...opts.fetchOptions,
			headers: fetchHeaders
		}
	});
}
async function sendProxy(event, target, opts = {}) {
	let response;
	try {
		response = await _getFetch(opts.fetch)(target, {
			headers: opts.headers,
			ignoreResponseError: true,
			...opts.fetchOptions
		});
	} catch (error) {
		throw createError({
			status: 502,
			statusMessage: "Bad Gateway",
			cause: error
		});
	}
	event.node.res.statusCode = sanitizeStatusCode(response.status, event.node.res.statusCode);
	event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
	const cookies = [];
	for (const [key, value] of response.headers.entries()) {
		if (key === "content-encoding") continue;
		if (key === "content-length") continue;
		if (key === "set-cookie") {
			cookies.push(...splitCookiesString(value));
			continue;
		}
		event.node.res.setHeader(key, value);
	}
	if (cookies.length > 0) event.node.res.setHeader("set-cookie", cookies.map((cookie) => {
		if (opts.cookieDomainRewrite) cookie = rewriteCookieProperty(cookie, opts.cookieDomainRewrite, "domain");
		if (opts.cookiePathRewrite) cookie = rewriteCookieProperty(cookie, opts.cookiePathRewrite, "path");
		return cookie;
	}));
	if (opts.onResponse) await opts.onResponse(event, response);
	if (response._data !== void 0) return response._data;
	if (event.handled) return;
	if (opts.sendStream === false) {
		const data = new Uint8Array(await response.arrayBuffer());
		return event.node.res.end(data);
	}
	if (response.body) for await (const chunk of response.body) event.node.res.write(chunk);
	return event.node.res.end();
}
function getProxyRequestHeaders(event) {
	const headers = /* @__PURE__ */ Object.create(null);
	const reqHeaders = getRequestHeaders(event);
	for (const name in reqHeaders) if (!ignoredHeaders.has(name)) headers[name] = reqHeaders[name];
	return headers;
}
function fetchWithEvent(event, req, init, options) {
	return _getFetch(options?.fetch)(req, {
		...init,
		context: init?.context || event.context,
		headers: {
			...getProxyRequestHeaders(event),
			...init?.headers
		}
	});
}
function _getFetch(_fetch) {
	if (_fetch) return _fetch;
	if (globalThis.fetch) return globalThis.fetch;
	throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(header, map, property) {
	const _map = typeof map === "string" ? { "*": map } : map;
	return header.replace(new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"), (match, prefix, previousValue) => {
		let newValue;
		if (previousValue in _map) newValue = _map[previousValue];
		else if ("*" in _map) newValue = _map["*"];
		else return match;
		return newValue ? prefix + newValue : "";
	});
}
function mergeHeaders(defaults, ...inputs) {
	const _inputs = inputs.filter(Boolean);
	if (_inputs.length === 0) return defaults;
	const merged = new Headers(defaults);
	for (const input of _inputs) for (const [key, value] of Object.entries(input)) if (value !== void 0) merged.set(key, value);
	return merged;
}
var getSessionPromise = Symbol("getSession");
var DEFAULT_NAME = "h3";
var DEFAULT_COOKIE = {
	path: "/",
	secure: true,
	httpOnly: true
};
async function useSession(event, config) {
	const sessionName = config.name || DEFAULT_NAME;
	await getSession(event, config);
	const sessionManager = {
		get id() {
			return event.context.sessions?.[sessionName]?.id;
		},
		get data() {
			return event.context.sessions?.[sessionName]?.data || {};
		},
		update: async (update) => {
			await updateSession(event, config, update);
			return sessionManager;
		},
		clear: () => {
			clearSession(event, config);
			return Promise.resolve(sessionManager);
		}
	};
	return sessionManager;
}
async function getSession(event, config) {
	const sessionName = config.name || DEFAULT_NAME;
	if (!event.context.sessions) event.context.sessions = /* @__PURE__ */ Object.create(null);
	const existingSession = event.context.sessions[sessionName];
	if (existingSession) return existingSession[getSessionPromise] || existingSession;
	const session = {
		id: "",
		createdAt: 0,
		data: /* @__PURE__ */ Object.create(null)
	};
	event.context.sessions[sessionName] = session;
	let sealedSession;
	if (config.sessionHeader !== false) {
		const headerName = typeof config.sessionHeader === "string" ? config.sessionHeader.toLowerCase() : `x-${sessionName.toLowerCase()}-session`;
		const headerValue = event.node.req.headers[headerName];
		if (typeof headerValue === "string") sealedSession = headerValue;
	}
	if (!sealedSession) sealedSession = getCookie(event, sessionName);
	if (sealedSession) {
		const promise = unsealSession(event, config, sealedSession).catch(() => {}).then((unsealed) => {
			Object.assign(session, unsealed);
			delete event.context.sessions[sessionName][getSessionPromise];
			return session;
		});
		event.context.sessions[sessionName][getSessionPromise] = promise;
		await promise;
	}
	if (!session.id) {
		session.id = config.generateId?.() ?? (config.crypto || _crypto).randomUUID();
		session.createdAt = Date.now();
		await updateSession(event, config);
	}
	return session;
}
async function updateSession(event, config, update) {
	const sessionName = config.name || DEFAULT_NAME;
	const session = event.context.sessions?.[sessionName] || await getSession(event, config);
	if (typeof update === "function") update = update(session.data);
	if (update) Object.assign(session.data, update);
	if (config.cookie !== false) setCookie(event, sessionName, await sealSession(event, config), {
		...DEFAULT_COOKIE,
		expires: config.maxAge ? new Date(session.createdAt + config.maxAge * 1e3) : void 0,
		...config.cookie
	});
	return session;
}
async function sealSession(event, config) {
	const sessionName = config.name || DEFAULT_NAME;
	const session = event.context.sessions?.[sessionName] || await getSession(event, config);
	return await seal(config.crypto || _crypto, session, config.password, {
		...defaults,
		ttl: config.maxAge ? config.maxAge * 1e3 : 0,
		...config.seal
	});
}
async function unsealSession(_event, config, sealed) {
	const unsealed = await unseal(config.crypto || _crypto, sealed, config.password, {
		...defaults,
		ttl: config.maxAge ? config.maxAge * 1e3 : 0,
		...config.seal
	});
	if (config.maxAge) {
		if (Date.now() - (unsealed.createdAt || Number.NEGATIVE_INFINITY) > config.maxAge * 1e3) throw new Error("Session expired!");
	}
	return unsealed;
}
function clearSession(event, config) {
	const sessionName = config.name || DEFAULT_NAME;
	if (event.context.sessions?.[sessionName]) delete event.context.sessions[sessionName];
	setCookie(event, sessionName, "", {
		...DEFAULT_COOKIE,
		...config.cookie
	});
	return Promise.resolve();
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => {
	__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
	return value;
};
var H3Event = class {
	constructor(req, res) {
		__publicField(this, "__is_event__", true);
		__publicField(this, "node");
		__publicField(this, "web");
		__publicField(this, "context", {});
		__publicField(this, "_method");
		__publicField(this, "_path");
		__publicField(this, "_headers");
		__publicField(this, "_requestBody");
		__publicField(this, "_handled", false);
		__publicField(this, "_onBeforeResponseCalled");
		__publicField(this, "_onAfterResponseCalled");
		this.node = {
			req,
			res
		};
	}
	get method() {
		if (!this._method) this._method = (this.node.req.method || "GET").toUpperCase();
		return this._method;
	}
	get path() {
		return this._path || this.node.req.url || "/";
	}
	get headers() {
		if (!this._headers) this._headers = _normalizeNodeHeaders(this.node.req.headers);
		return this._headers;
	}
	get handled() {
		return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
	}
	respondWith(response) {
		return Promise.resolve(response).then((_response) => sendWebResponse(this, _response));
	}
	toString() {
		return `[${this.method}] ${this.path}`;
	}
	toJSON() {
		return this.toString();
	}
	/** @deprecated Please use `event.node.req` instead. */
	get req() {
		return this.node.req;
	}
	/** @deprecated Please use `event.node.res` instead. */
	get res() {
		return this.node.res;
	}
};
function _normalizeNodeHeaders(nodeHeaders) {
	const headers = new Headers();
	for (const [name, value] of Object.entries(nodeHeaders)) if (Array.isArray(value)) for (const item of value) headers.append(name, item);
	else if (value) headers.set(name, value);
	return headers;
}
function defineEventHandler(handler) {
	if (typeof handler === "function") {
		handler.__is_handler__ = true;
		return handler;
	}
	const _hooks = {
		onRequest: _normalizeArray(handler.onRequest),
		onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
	};
	const _handler = (event) => {
		return _callHandler(event, handler.handler, _hooks);
	};
	_handler.__is_handler__ = true;
	_handler.__resolve__ = handler.handler.__resolve__;
	_handler.__websocket__ = handler.websocket;
	return _handler;
}
function _normalizeArray(input) {
	return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
	if (hooks.onRequest) for (const hook of hooks.onRequest) {
		await hook(event);
		if (event.handled) return;
	}
	const response = { body: await handler(event) };
	if (hooks.onBeforeResponse) for (const hook of hooks.onBeforeResponse) await hook(event, response);
	return response.body;
}
var eventHandler = defineEventHandler;
globalThis.Headers;
globalThis.Response;
//#endregion
export { sendRedirect as $, getResponseStatusText as A, parseCookies as B, getRequestIP as C, getResponseHeader as D, getRequestWebStream as E, getValidatedRouterParams as F, readRawBody as G, readBody as H, handleCacheHeaders as I, sealSession as J, readValidatedBody as K, handleCors as L, getRouterParams as M, getSession as N, getResponseHeaders as O, getValidatedQuery as P, sendProxy as Q, isMethod as R, getRequestHost as S, FastURL as St, getRequestURL as T, readFormData as U, proxyRequest as V, readMultipartFormData as W, sendError as X, send as Y, sendNoContent as Z, getProxyRequestHeaders as _, toEventHandler as _t, appendHeaders as a, setResponseHeader as at, getRequestHeader as b, NodeResponse as bt, assertMethod as c, unsealSession as ct, defaultContentType as d, useSession as dt, sendStream as et, deleteCookie as f, writeEarlyHints as ft, getHeaders as g, defineLazyEventHandler as gt, getHeader as h, defineHandler as ht, appendHeader as i, setHeaders as it, getRouterParam as j, getResponseStatus as k, clearResponseHeaders as l, updateSession as lt, getCookie as m, HTTPError as mt, appendCorsHeaders as n, setCookie as nt, appendResponseHeader as o, setResponseHeaders as ot, fetchWithEvent as p, H3Core as pt, removeResponseHeader as q, appendCorsPreflightHeaders as r, setHeader as rt, appendResponseHeaders as s, setResponseStatus as st, H3Event as t, sendWebResponse as tt, clearSession as u, useBase as ut, getQuery as v, toRequest as vt, getRequestProtocol as w, getRequestHeaders as x, serve as xt, getRequestFingerprint as y, NullProtoObj as yt, isPreflightRequest as z };
