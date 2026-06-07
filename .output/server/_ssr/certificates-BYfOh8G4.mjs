import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificates-BYfOh8G4.js
var $$splitComponentImporter = () => import("./certificates-DwLHLpr9.mjs");
var fetchCertificates = createServerFn().handler(createSsrRpc("a7f33294ed8c421a49b1f39ef67109dba9166055eac75207181241f7c12d9c95"));
var Route = createFileRoute("/certificates")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return { certificates: await fetchCertificates() };
	}
});
//#endregion
export { Route as t };
