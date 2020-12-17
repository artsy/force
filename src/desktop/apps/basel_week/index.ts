import { stitch as _stitch } from "@artsy/stitch"
import adminOnly from "../../lib/admin_only"
import JSONPage from "../../components/json_page/es6"
import { FairWeekPageScaffold } from "desktop/components/fair_week_marketing/PageScaffold"
import { FairWeekMeta } from "desktop/components/fair_week_marketing/Meta"
import { merge } from "lodash"
import queryString from "query-string"

let stitch = _stitch
const SLUG = "basel-art-week"
const MARKETING_MODAL_ID = "ca18"

export class EditableBaselWeekPage extends JSONPage {
  registerRoutes() {
    this.app.get(this.jsonPage.paths.show, this.show.bind(this))
    this.app.get(this.jsonPage.paths.show + "/data", this.data)
    this.app.get(this.jsonPage.paths.edit, adminOnly, this.edit)
    this.app.post(this.jsonPage.paths.edit, adminOnly, this.upload)
  }

  async show(req, res, next) {
    try {
      if (req.query["m-id"] !== MARKETING_MODAL_ID) {
        const queryStringAsString = queryString.stringify(
          merge({}, req.query, { "m-id": MARKETING_MODAL_ID })
        )

        return res.redirect(`/${SLUG}?${queryStringAsString}`)
      }

      const data = await this.jsonPage.get()
      const layout = await stitch({
        basePath: __dirname,
        blocks: {
          body: FairWeekPageScaffold,
          head: FairWeekMeta,
        },
        config: {
          styledComponents: true,
        },
        data: {
          ...res.locals,
          ...data,
          data,
          displayStickyFooter: !req.user,
        },
        layout: "../../components/main_layout/templates/react_index.jade",
        locals: {
          assetPackage: "banner_pop_up",
        },
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  }
}

export const app = new EditableBaselWeekPage({
  name: SLUG,
  paths: { edit: `/${SLUG}/edit`, show: `/${SLUG}` },
}).app
