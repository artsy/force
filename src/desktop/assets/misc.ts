import $ from "jquery"
// FIXME: not sure why we require jquery/blueimp packages
require("jquery-ui")
require("blueimp-file-upload")
require("jquery.iframe-transport")

const routes = {
  "/about": () => {
    require("../apps/about/client/index.coffee").init()
    require("../apps/about/client/easter_egg.coffee")()
  },

  "/contact": require("../apps/contact/client/index.coffee").init,

  "/jobs": require("../apps/jobs/client/index.coffee").init,

  "/profile/.*": require("../apps/user/client/index.coffee").init,

  "/user/.*": require("../apps/user/client/index.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
