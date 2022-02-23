import $ from "jquery"
// FIXME: not sure why we require jquery/blueimp packages
require("jquery-ui")
require("blueimp-file-upload")
require("jquery.iframe-transport")

const routes = {
  "/contact": require("../apps/contact/client/index.coffee").init,

  "/jobs": require("../apps/jobs/client/index.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
