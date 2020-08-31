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
  "^/search"() {
    return require("../apps/search/client.coffee").init()
  },

  "^/contact"() {
    return require("../apps/contact/client/index.coffee").init()
  },

  "^/how-auctions-work[/]?.*"() {
    return require("../apps/how_auctions_work/client/index.coffee").init()
  },

  "^/gene/.*"() {
    return require("../apps/gene/client.coffee").init()
  },

  "^/tag/.*"() {
    return require("../apps/tag/client.coffee").init()
  },

  "^/unsubscribe*"() {
    return require("../apps/unsubscribe/client.coffee").init()
  },

  "^/profile/.*"() {
    return require("../apps/profile/client.coffee")
  },

  "^/collect$"() {
    return require("../apps/browse/client.coffee").init()
  },

  "^/.*/articles.*"() {
    return require("../apps/partner_profile/client/articles.coffee")
  },

  "^/.*/(collection|shop)[/]?"() {
    return require("../apps/partner_profile/client/artworks.coffee").init()
  },

  "^/art-fairs"() {
    return require("../apps/art_fairs/client/art_fairs.coffee").init()
  },

  "^/auctions"() {
    return require("../apps/auctions/client/auctions.coffee").init()
  },

  "^/shows"() {
    return require("../apps/shows/client/shows.coffee").init()
  },

  "^/all-cities"() {
    return require("../apps/shows/client/shows.coffee").init()
  },

  "^/(galleries|institutions)"() {
    return require("../apps/galleries_institutions/client/galleries_institutions.coffee").init()
  },

  // Use more specific regex to avoid intercepting '^/.*/browse/artist/.*'
  // Note that the order of iteration over a dictionary is not guaranteed.
  "^/[^/]*/artist/.*"() {
    return require("../apps/partner_profile/client/artist.coffee").init()
  },

  "^/.*/live"() {
    return require("../apps/fair/client/trending.coffee").init()
  },

  "^/.*/feed"() {
    return require("../apps/fair/client/feed.coffee").init()
  },

  "^/.*/for-you"() {
    return require("../apps/fair/client/for_you.coffee").init()
  },

  "^/.*/programming.*"() {
    return require("../apps/fair/client/programming.coffee").init()
  },

  "^/.*/events.*"() {
    return require("../apps/fair_info/client/events.coffee").init()
  },

  "^/.*/armory-arts-week"() {
    return require("../apps/fair_info/client/events.coffee").init()
  },

  "^/.*/browse/artist/.*"() {
    return require("../apps/fair/client/artist.coffee").init()
  },

  "^/.*/browse/booths"() {
    return require("../apps/fair/client/exhibitors.coffee").init()
  },

  "^/.*/browse/artworks"() {
    return require("../apps/fair/client/artworks.coffee").init()
  },

  "(^/.*/browse/exhibitors)|(^/.*/browse/artists)|(^/.*/browse/filter)"() {
    return require("../apps/fair/client/main_page.coffee").init()
  },

  "^/.*/overview.*"() {
    if (sd.FAIR != null) {
      if (location.pathname.match("info2")) {
        return require("../apps/fair_info/client/index.coffee").init()
      } else {
        return require("../apps/fair/client/main_page.coffee").init()
      }
    } else if (sd.PROFILE != null) {
      return require("../apps/profile/client.coffee")
    } else if (sd.PARTNER_PROFILE != null) {
      return require("../apps/partner_profile/client/index.coffee")
    }
  },

  "^/.*/info.*"() {
    if (sd.FAIR != null) {
      if (location.pathname.match("info2")) {
        return require("../apps/fair_info/client/index.coffee").init()
      }
    }
  },

  "^/([^/]+)$"() {
    if (sd.FAIR_ORGANIZER != null) {
      return require("../apps/fair_organizer/client/fair_organizer.coffee").init()
    } else if (sd.FAIR != null) {
      return require("../apps/fair/client/main_page.coffee").init()
    } else if (sd.PARTNER_PROFILE != null) {
      return require("../apps/partner_profile/client/index.coffee")
    } else if (sd.PROFILE != null) {
      return require("../apps/profile/client.coffee")
    } else {
      // Last resort
      return require("../components/layout/bootstrap.coffee")()
    }
  },

  "^$"() {
    return require("../apps/home/client/index.coffee")
  },
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
