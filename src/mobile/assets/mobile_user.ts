//
// Javascript package for the user settings app
//

import $ from "jquery"

const routes = {
  "^/profile/.*": require("../apps/user/client/view.coffee").init,
  "^/user/.*": require("../apps/user/client/view.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
