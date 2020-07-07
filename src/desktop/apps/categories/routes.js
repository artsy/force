import App from "./components/App"
import GeneFamiliesQuery from "./queries/geneFamilies"
import _metaphysics2 from "lib/metaphysics2.coffee"
import { stitch as _stitch } from "@artsy/stitch"
import { geneFamiliesFromConnection } from "./utils"

// FIXME: Rewire
let metaphysics2 = _metaphysics2
let stitch = _stitch

export const index = async (req, res, next) => {
  try {
    const geneFamilyConnection = await metaphysics2({
      query: GeneFamiliesQuery(),
    })
    const geneFamilies = geneFamiliesFromConnection(geneFamilyConnection)

    const layout = await stitch({
      basePath: req.app.get("views"),
      config: {
        styledComponents: true,
      },
      layout: "../../../components/main_layout/templates/react_index.jade",
      blocks: {
        head: "meta.jade",
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: "categories",
      },
      data: {
        geneFamilies,
      },
    })

    res.send(layout)
  } catch (err) {
    next(err)
  }
}
