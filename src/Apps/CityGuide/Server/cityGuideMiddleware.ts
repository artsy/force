import { renderCityGuideOnApp } from "Apps/CityGuide/Server/cityGuideOnApp"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { DOWNLOAD_APP_URLS, Device } from "Utils/Hooks/useDeviceDetection"
import { Router } from "express"

const CITY_GUIDE_ON_APP_PATH = "/city-guide-on-app/"

// IS_MOBILE and IS_TABLET come from bootstrapSharifyAndContextLocalsMiddleware.
// Android tablets don't say "Mobile", so check Android directly as well.
const getStoreUrl = ({
  req,
  res,
}: {
  req: ArtsyRequest
  res: ArtsyResponse
}): string | null => {
  const userAgent = req.get("user-agent") ?? ""
  const isAndroid = /Android/i.test(userAgent)
  const { IS_MOBILE, IS_TABLET } = res.locals.sd ?? {}

  if (!isAndroid && !IS_MOBILE && !IS_TABLET) {
    return null
  }

  return DOWNLOAD_APP_URLS[isAndroid ? Device.Android : Device.iPhone]
}

const cityGuideMiddleware = Router()

// "/city-guide*" would also match "/city-guide-on-app" and redirect in a loop
cityGuideMiddleware.get(
  ["/city-guide", "/city-guide/*"],
  (req: ArtsyRequest, res: ArtsyResponse) => {
    res.vary("User-Agent")

    const storeUrl = getStoreUrl({ req, res })

    if (storeUrl) {
      res.redirect(302, storeUrl)
      return
    }

    res.redirect(
      302,
      `${CITY_GUIDE_ON_APP_PATH}?from=${encodeURIComponent(req.originalUrl)}`,
    )
  },
)

cityGuideMiddleware.get(
  "/city-guide-on-app",
  (req: ArtsyRequest, res: ArtsyResponse) => {
    res.vary("User-Agent")

    const storeUrl = getStoreUrl({ req, res })

    if (storeUrl) {
      res.redirect(302, storeUrl)
      return
    }

    res.type("html").send(renderCityGuideOnApp())
  },
)

export { cityGuideMiddleware }
