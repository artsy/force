import $ from "jquery"

const routes = {
  "/categories$": require("../apps/categories/client").default,
  "/category$": require("../apps/categories/client").default,
  "/gene$": require("../apps/categories/client").default,
  "/tag": require("../apps/tag/client.js").setupTagPage,
  "/gene/.*": require("../apps/gene/client.js").setupGenePage,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
