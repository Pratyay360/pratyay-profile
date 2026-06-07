import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-C8akFyBH.js
var fetchBlogPosts_createServerFn_handler = createServerRpc({
	id: "7761cc11e93e275565e2b1c0770e113c09d9e1565373c06900296a93af70bcd7",
	name: "fetchBlogPosts",
	filename: "src/app/blog.tsx"
}, (opts) => fetchBlogPosts.__executeServer(opts));
var fetchBlogPosts = createServerFn().handler(fetchBlogPosts_createServerFn_handler, async () => {
	const query = `
    query Publication {
      publication(host: "pratyaywrites.hashnode.dev") {
        posts(first: 50) {
          edges {
            node {
              coverImage { url }
              title
              brief
              url
            }
          }
        }
      }
    }
  `;
	try {
		const json = await (await fetch("https://gql.hashnode.com", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query })
		})).json();
		if (json.errors) throw json.errors;
		return json.data?.publication?.posts?.edges.map((e) => e.node) ?? [];
	} catch (e) {
		console.error(e);
		return [];
	}
});
//#endregion
export { fetchBlogPosts_createServerFn_handler };
