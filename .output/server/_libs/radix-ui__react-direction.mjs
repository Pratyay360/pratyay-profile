import { o as __toESM } from "../_runtime.mjs";
import { s as require_react } from "./phosphor-icons__react+react.mjs";
import { l as require_jsx_runtime } from "./@radix-ui/react-aspect-ratio+[...].mjs";
//#region node_modules/.aube/@radix-ui+react-direction@1.1.2_@types+react@19.2.17_react@19.2.7/node_modules/@radix-ui/react-direction/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_jsx_runtime();
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
//#endregion
export { useDirection as t };
