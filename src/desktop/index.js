import * as modules from './lib/global_react_modules'
const app = (module.exports = require('express')())

// NOTE:
// App order matters as some apps establish logic that is shared inside of subapps.

// TODO: Move to src/lib/middleware/locals once done developing; this is just so
// we can get hot module reloading which only works in /desktop and /mobile
app.use(require('@artsy/stitch/iso').middleware(modules))

// Apps with hardcoded routes or "RESTful" routes
app.use(require('./apps/home'))
app.use(require('./apps/editorial_features'))
app.use(require('./apps/apply'))
app.use(require('./apps/auctions'))
app.use(require('./apps/auctions2'))
app.use(require('./apps/artist'))
app.use(require('./apps/artist2/server'))
app.use(require('./apps/artists'))
app.use(require('./apps/auction'))
app.use(require('./apps/auction_support'))
app.use(require('./apps/auction_lots'))
app.use(require('./apps/artwork_purchase'))
app.use(require('./apps/artwork'))
app.use(require('./apps/artwork2/server'))
app.use(require('./apps/about'))
app.use(require('./apps/collect_art'))
app.use(require('./apps/collect'))
app.use(require('./apps/categories'))
app.use(require('./apps/consign'))
app.use(require('./apps/contact'))
app.use(require('./apps/eoy_2016'))
app.use(require('./apps/how_auctions_work'))
app.use(require('./apps/inquiry'))
app.use(require('./apps/fairs'))
app.use(require('./apps/partnerships'))
app.use(require('./apps/gene'))
app.use(require('./apps/geo'))
app.use(require('./apps/jobs'))
app.use(require('./apps/notifications'))
app.use(require('./apps/order'))
app.use(require('./apps/order2/index.tsx'))
app.use(require('./apps/personalize'))
app.use(require('./apps/press'))
app.use(require('./apps/pro_buyer'))
app.use(require('./apps/search'))
app.use(require('./apps/show'))
app.use(require('./apps/shows'))
app.use(require('./apps/tag'))
app.use(require('./apps/unsubscribe'))
app.use(require('./apps/unsupported_browser'))
app.use(require('./apps/style_guide'))
app.use(require('./apps/auth'))
app.use(require('./apps/static'))
app.use(require('./apps/clear_cache'))
app.use(require('./apps/sitemaps'))
app.use(require('./apps/rss'))
app.use(require('./apps/dev'))
app.use(require('./apps/article'))
app.use(require('./apps/artsy_primer'))
app.use(require('./apps/gallery_partnerships'))
app.use(require('./apps/marketing_signup_modals'))
app.use(require('./apps/artsy_in_miami').default)
app.use(require('./apps/armory_week').default)
app.use(require('./apps/frieze_week').default)
app.use(require('./apps/basel_week').default)

// Non-profile dynamic vanity url apps
app.use(require('./apps/galleries_institutions'))
app.use(require('./apps/articles'))
app.use(require('./apps/page'))
app.use(require('./apps/shortcuts'))

// Apps that need to fetch a profile
app.use(require('./apps/profile'))
app.use(require('./apps/partner2'))
app.use(require('./apps/partner'))
app.use(require('./apps/fair'))
app.use(require('./apps/fair_info'))
app.use(require('./apps/fair_organizer'))
app.use(require('./apps/feature'))

// User profiles
app.use(require('./apps/user'))

// Examples
app.use(require('./apps/react_example'))
app.use(require('./apps/isomorphic-relay-example/server'))
