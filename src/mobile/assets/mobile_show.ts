import $ from "jquery"

const routes = {
  "^/show/.*": require("../apps/show/client/index.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
