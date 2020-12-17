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
  "^/.*/articles.*": require("../apps/partner_profile/client/articles.coffee"),
  "^/.*/(collection|shop)[/]?": require("../apps/partner_profile/client/artworks.coffee")
    .init,
  "^/contact": require("../apps/contact/client/index.coffee").init,
  "^/.*/contact.*": require("../apps/partner_profile/client/contact.ts"),
  "^/gene/.*": require("../apps/gene/client.coffee").init,
  "^/all-cities": require("../apps/shows/client/shows.coffee").init,
  "^/how-auctions-work[/]?.*": require("../apps/how_auctions_work/client/index.coffee")
    .init,
  "^/(galleries|institutions)": require("../apps/galleries_institutions/client/galleries_institutions.coffee")
    .init,
  "^/profile/.*": require("../apps/profile/client.coffee"),
  "^/.*/live": require("../apps/fair/client/trending.coffee").init,
  "^/search": require("../apps/search/client.coffee").init,
  "^/.*/feed": require("../apps/fair/client/feed.coffee").init,
  "^/.*/events.*": require("../apps/fair_info/client/events.coffee").init,
  "^/tag/.*": require("../apps/tag/client.coffee").init,
  "^/.*/armory-arts-week": require("../apps/fair_info/client/events.coffee")
    .init,
  "^/unsubscribe*": require("../apps/unsubscribe/client.coffee").init,
  
  
  "^/.*/browse/artist/.*": require("../apps/fair/client/artist.coffee").init,
  

"^/collect$": require("../apps/browse/client.coffee").init,
  

"(^/.*/browse/exhibitors)|(^/.*/browse/artists)|(^/.*/browse/filter)": require("../apps/fair/client/main_page.coffee")
    .init,
  

"^/art-fairs": require("../apps/art_fairs/client/art_fairs.coffee").init,
  

"^/.*/browse/artworks": require("../apps/fair/client/artworks.coffee").init,
  

"^/auctions": require("../apps/auctions/client/auctions.coffee").init,
  

"^$": require("../apps/home/client/index"),
  

"^/shows": require("../apps/shows/client/shows.coffee").init,
  

"^/([^/]+)$": () => {
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
  

"^/.*/browse/booths": require("../apps/fair/client/exhibitors.coffee").init,
  // Use more specific regex to avoid intercepting '^/.*/browse/artist/.*'
// Note that the order of iteration over a dictionary is not guaranteed.
"^/[^/]*/artist/.*": require("../apps/partner_profile/client/artist.coffee")
    .init,
  "^/.*/for-you": require("../apps/fair/client/for_you.coffee").init,
  "^/.*/info.*": () => {
    if (sd.FAIR != null) {
      if (location.pathname.match("info2")) {
        return require("../apps/fair_info/client/index.coffee").init()
      }
    }
  },
  "^/.*/overview.*": () => {
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
  "^/.*/programming.*": require("../apps/fair/client/programming.coffee").init,
}

for (let path in routes) {
  const init = routes[path]
  if (location.pathname.match(path)) {
    $(init)
  }
}
