import $ from "jquery"
import { data as sd } from "sharify"
// FIXME: not sure why we require jquery/blueimp packages
require("jquery-ui")
require("blueimp-file-upload")
require("jquery.iframe-transport")

const routes = {
  ".*": () => {
    if (sd.PARTNER_NEW_LAYOUT === true) {
      require("../apps/partner2/client/index.coffee").init()
    } else if (sd.PARTNER_NEW_LAYOUT === false) {
      require("../apps/partner/client/index.coffee").init()
    }
  },
  "/galleries": require("../apps/galleries_institutions/client/index.coffee"),
  "/institutions": require("../apps/galleries_institutions/client/index.coffee"),
  "/auction-partnerships": require("../apps/partnerships/client/index.coffee")
    .init,
  "/institution-partnerships": require("../apps/partnerships/client/index.coffee")
    .init,
  "/show/.*": require("../apps/show/client/index.coffee").init,
  "/shows": require("../apps/shows/client/index.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
