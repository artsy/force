//
// Simply includes each app's javascripts into one big package and
// requires the appropriate one based on location.pathname.
// In the beginning this will be easier for simplicity's sake, but as this
// package gets large, and we micro-optimize initial page load, we'll want
// to get more complex in how we break up and load assets.
//

import $ from "jquery"
import { data as sd } from "sharify"

const routes = {
  "^/search": require("../apps/search/client.coffee").init,
  "^/contact": require("../apps/contact/client/index.coffee").init,
  "^/how-auctions-work[/]?.*": require("../apps/how_auctions_work/client/index.coffee")
    .init,
  "^/tag/.*": require("../apps/tag/client.coffee").init,
  "^/profile/.*": require("../apps/profile/client.coffee"),
  "^/collect$": require("../apps/browse/client.coffee").init,
  "^/.*/articles.*": require("../apps/partner_profile/client/articles.coffee"),
  "^/.*/contact.*": require("../apps/partner_profile/client/contact.ts"),
  "^/.*/(collection|shop)[/]?": require("../apps/partner_profile/client/artworks.coffee")
    .init,
  "^/auctions": require("../apps/auctions/client/auctions.coffee").init,
  // Use more specific regex to avoid intercepting '^/.*/browse/artist/.*'
  // Note that the order of iteration over a dictionary is not guaranteed.
  "^/[^/]*/artist/.*": require("../apps/partner_profile/client/artist.coffee")
    .init,
  "^/.*/overview.*": () => {
    if (sd.PROFILE != null) {
      return require("../apps/profile/client.coffee")
    } else if (sd.PARTNER_PROFILE != null) {
      return require("../apps/partner_profile/client/index.coffee")
    }
  },
  "^/([^/]+)$": () => {
    if (sd.FAIR_ORGANIZER != null) {
      return require("../apps/fair_organizer/client/fair_organizer.coffee").init()
    } else if (sd.PARTNER_PROFILE != null) {
      return require("../apps/partner_profile/client/index.coffee")
    } else if (sd.PROFILE != null) {
      return require("../apps/profile/client.coffee")
    } else {
      // Last resort
      return require("../components/layout/bootstrap.coffee")()
    }
  },
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
