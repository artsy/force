import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { getServerParam } from "v2/Utils/getServerParam"
import { getV2SharifyScript } from "../Server/sharifyHelpers"
import { renderToString } from "react-dom/server"
import { ServerAppResolve } from "./buildServerApp"
import loadAssetManifest from "lib/manifest"
import path from "path"

// TODO: Use the same variables as the asset middleware. Both config and sharify
// have a default CDN_URL while this does not.
const { CDN_URL, NODE_ENV } = process.env

const PUBLIC_DIR = path.resolve(__dirname, "../../../../public")

const NOVO_MANIFEST = loadAssetManifest("../../manifest-novo.json")

if (!NOVO_MANIFEST) {
  throw new Error("manifest-novo.json not found")
}

interface RenderServerAppProps extends ServerAppResolve {
  /** HTTP status code */
  code?: number
  /** Should we mount the client? Defaults to `true`. */
  mount?: boolean
  req: ArtsyRequest
  res: ArtsyResponse
}

export const renderServerApp = ({
  bodyHTML,
  code = 200,
  headTags,
  mount = true,
  req,
  res,
  scripts,
  styleTags,
}: RenderServerAppProps) => {
  const headTagsString = renderToString(headTags as any)

  const sharify = res.locals.sharify

  const { APP_URL, CURRENT_PATH, WEBFONT_URL } = sharify.data

  const options = {
    cdnUrl: NODE_ENV === "production" ? CDN_URL : "",
    content: {
      body: bodyHTML,
      data: getV2SharifyScript(sharify.data),
      head: headTagsString,
      scripts,
      style: styleTags,
    },
    disable: {
      analytics: getServerParam(req, "disableAnalytics") === "true",
      onetrust: getServerParam(req, "disableOneTrust") === "true",
      segment: getServerParam(req, "disableSegment") === "true",
      stripe: getServerParam(req, "disableStripe") === "true",
      scripts: !mount,
    },
    env: NODE_ENV,
    fontUrl: WEBFONT_URL,
    icons: {
      // TODO: Move to new assset pipeline, this adds the CDN for images.
      favicon: res.locals.asset("/images/favicon.ico"),
      faviconSVG: res.locals.asset("/images/favicon.svg"),
      appleTouchIcon: res.locals.asset("/images/apple-touch-icon.png"),
    },
    manifest: {
      browserConfig: NOVO_MANIFEST.lookup("/images/browserconfig.xml"),
      openSearch: NOVO_MANIFEST.lookup("/images/opensearch.xml"),
      webmanifest: NOVO_MANIFEST.lookup("/images/manifest.webmanifest"),
    },
    meta: {
      appleItunesApp: `${APP_URL}${CURRENT_PATH}`,
    },
    // TODO: Post-release review that sharify is still used in the template.
    sd: sharify.data,
  }

  res.status(code).render(`${PUBLIC_DIR}/index.ejs`, options)
}
