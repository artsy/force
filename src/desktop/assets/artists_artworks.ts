import $ from "jquery"

const routes = {
  "/artists": require("../apps/artists/client/index.coffee").init,

  "/inquiry": require("../apps/inquiry/client/index.coffee"),
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
