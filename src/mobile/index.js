import { middleware as stitchMiddleware } from "@artsy/stitch/dist/internal/middleware"
import * as globalReactModules from "desktop/components/react/stitch_components"

const app = (module.exports = require("express")())

// Configure stitch SSR functionality. Mounted here (rather than in setup) so
// changes to stitched code can be hot reloaded.
// See: https://github.com/artsy/stitch/tree/master/src/internal for more info.
app.use(
  stitchMiddleware({
    modules: globalReactModules,
    wrapper: globalReactModules.StitchWrapper,
  })
)

app.use(require("./apps/page"))
app.use(require("./apps/home"))
app.use(require("./apps/unsubscribe"))
app.use(require("./apps/fair_organizer"))
app.use(require("./apps/contact"))
app.use(require("./apps/how_auctions_work"))
app.use(require("./apps/profile"))
app.use(require("./apps/user"))
app.use(require("./apps/feature"))
app.use(require("./apps/gene"))
app.use(require("./apps/artists"))
app.use(require("./apps/partners"))
app.use(require("./apps/articles"))
app.use(require("./apps/fair_organizer"))
app.use(require("./apps/fair"))
app.use(require("./apps/fair_info"))
app.use(require("./apps/tag"))
app.use(require("./apps/show"))
app.use(require("./apps/galleries_institutions"))
app.use(require("./apps/browse"))
app.use(require("./apps/partner_profile"))
app.use(require("./apps/favorites_following"))
app.use(require("./apps/art_fairs"))
app.use(require("./apps/auctions"))
app.use(require("./apps/shows"))
app.use(require("./apps/dev"))
