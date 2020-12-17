import $ from "jquery"
import qs from "qs"
// FIXME: not sure why we require jquery/blueimp packages
require("jquery-ui")
require("blueimp-file-upload")
require("jquery.iframe-transport")

const routes = {
  "/about": () => {
    require("../apps/about/client/index.coffee").init()
    require("../apps/about/client/easter_egg.coffee")()
  },

  "/consign": require("../apps/consign/client").init,

  "/consign/submission": require("../apps/consign/client/submission").init,

  "/contact": require("../apps/contact/client/index.coffee").init,

  "/jobs": require("../apps/jobs/client/index.coffee").init,

  "/profile/.*": require("../apps/user/client/index.coffee").init,

  "/reset_password": require("../apps/authentication/client/reset_password.coffee")
    .init,

  "/search": require("../apps/search/client/index.coffee").init,

  "/unsubscribe": require("../apps/unsubscribe/client/index.coffee").init,

  "/user/.*": require("../apps/user/client/index.coffee").init,

  "/works-for-you": () => {
    require("../apps/notifications/client/index.coffee").init()
    const { artist, artist_id } = qs.parse(location.search.substring(1))
    require("../apps/notifications/client/react_grid.js").default.setupReactGrid(
      { artistID: artist || artist_id }
    )
  },
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
