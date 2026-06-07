import { t as createClient } from "./server-D9mWckOW.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificates-CRna-86k.js
var fetchCertificates_createServerFn_handler = createServerRpc({
	id: "a7f33294ed8c421a49b1f39ef67109dba9166055eac75207181241f7c12d9c95",
	name: "fetchCertificates",
	filename: "src/app/certificates.tsx"
}, (opts) => fetchCertificates.__executeServer(opts));
var fetchCertificates = createServerFn().handler(fetchCertificates_createServerFn_handler, async () => {
	const { data } = await (await createClient()).from("certificate").select("*");
	return data ?? [];
});
//#endregion
export { fetchCertificates_createServerFn_handler };
