import { Router } from "express"
import { getENV } from "v2/Utils/getENV"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { ErrorWithStatus } from "v2/Utils/errors"

const shortcutsServerRoutes = Router()

shortcutsServerRoutes.get(
  "/:short",
  async (req: ArtsyRequest, res: ArtsyResponse, next) => {
    const short = req.params.short.toLowerCase()

    try {
      const response = await fetch(
        `${getENV("API_URL")}/api/v1/shortcut/${short}`,
        { headers: { "X-XAPP-TOKEN": getENV("ARTSY_XAPP_TOKEN") } }
      )

      if (!response.ok) {
        throw new ErrorWithStatus(response.statusText, 404)
      }

      const data = await response.json()

      res.redirect(301, data.long)
    } catch (err) {
      next(err)
    }
  }
)

export { shortcutsServerRoutes }
