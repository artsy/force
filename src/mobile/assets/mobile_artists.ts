//
// Assets for the Artists app
//
import $ from "jquery"

const routes = {
  "/^/artists.*": require("../apps/artists/client.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
