import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { getServerParam } from "Utils/getServerParam"
import { renderToString } from "react-dom/server"
import loadAssetManifest from "Server/manifest"
import path from "path"
import { getENV } from "Utils/getENV"
import { ServerAppResults } from "System/Router/serverRouter"
import { getScriptEarlyHints, getImageEarlyHints } from "Server/earlyHints"

// TODO: Use the same variables as the asset middleware. Both config and sharify
// have a default CDN_URL while this does not.
const { CDN_URL, NODE_ENV, GEMINI_CLOUDFRONT_URL, WEBFONT_URL } = process.env

const PUBLIC_DIR = path.resolve(process.cwd(), "public")

const MANIFEST = loadAssetManifest("manifest.json")

if (!MANIFEST) {
  throw new Error("manifest.json not found")
}

interface RenderServerAppProps extends ServerAppResults {
  /** HTTP status code */
  code?: number
  /** Should we mount the client? Defaults to `true`. */
  mount?: boolean
  req: ArtsyRequest
  res: ArtsyResponse
}

export const renderServerApp = ({
  html,
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

  const { WEBFONT_URL } = sharify.data

  const { imageLinkHeaders, imageLinkPreloadTags } = getImageEarlyHints(
    html ?? ""
  )
  const { scriptLinkHeaders, scriptLinkPreloadTags } = getScriptEarlyHints()

  const options = {
    cdnUrl: NODE_ENV === "production" ? CDN_URL : "",
    content: {
      body: html,
      data: sharify.script(),
      head: headTagsString,
      imageLinkPreloadTags,
      scriptLinkPreloadTags,
      scripts,
      style: styleTags,
    },
    disable: {
      analytics: getServerParam(req, "disableAnalytics") === "true",
      segment: getServerParam(req, "disableSegment") === "true",
      stripe: getServerParam(req, "disableStripe") === "true",
      scripts: !mount,
    },
    env: NODE_ENV,
    fontUrl: WEBFONT_URL,
    imageCdnUrl: GEMINI_CLOUDFRONT_URL,
    icons: {
      // TODO: Move to new assset pipeline, this adds the CDN for images.
      favicon: res.locals.asset("/images/favicon.ico"),
      faviconSVG: res.locals.asset("/images/favicon.svg"),
      appleTouchIcon: res.locals.asset("/images/apple-touch-icon.png"),
    },
    manifest: {
      browserConfig: MANIFEST.lookup("/images/browserconfig.xml"),
      openSearch: MANIFEST.lookup("/images/opensearch.xml"),
      webmanifest: MANIFEST.lookup("/images/manifest.webmanifest"),
    },
    // TODO: Post-release review that sharify is still used in the template.
    sd: sharify.data,
  }

  // Preconnect or preload associated links
  setEarlyHintsResponseHeaders({
    imageLinkHeaders,
    scriptLinkHeaders,
    req,
    res,
  })

  const statusCode = getENV("statusCode") ?? code

  res.status(statusCode).render(`${PUBLIC_DIR}/html.ejs`, options)
}

/**
 * Link headers allow 103: Early Hints to be sent to the client (by Cloudflare).
 * These should correspond to preconnect and preload items from html.ejs.
 * See: https://developers.cloudflare.com/cache/advanced-configuration/early-hints/
 */
interface SetEarlyHintsResponseHeadersProps {
  imageLinkHeaders: string[]
  scriptLinkHeaders: string[]
  req: ArtsyRequest
  res: ArtsyResponse
}

const setEarlyHintsResponseHeaders = ({
  imageLinkHeaders,
  scriptLinkHeaders,
  res,
}: SetEarlyHintsResponseHeadersProps) => {
  try {
    if (!res.headersSent) {
      res.header("Link", [
        `<${CDN_URL}>; rel=preconnect; crossorigin`,
        `<${GEMINI_CLOUDFRONT_URL}>; rel=preconnect; crossorigin`,
        `<${WEBFONT_URL}>; rel=preconnect; crossorigin`,
        `<${WEBFONT_URL}/all-webfonts.css>; rel=preload; as=style`,
        `<${WEBFONT_URL}/ll-unica77_regular.woff2>; rel=preload; as=font; crossorigin`,
        `<${WEBFONT_URL}/ll-unica77_medium.woff2>; rel=preload; as=font; crossorigin`,
        `<${WEBFONT_URL}/ll-unica77_italic.woff2>; rel=preload; as=font; crossorigin`,
        ...imageLinkHeaders,
        ...scriptLinkHeaders,
      ])
    }
  } catch (error) {
    console.log(["[renderServerApp] Error setting early hints", error])
  }
}
