import { ENABLE_SSR_STREAMING } from "Server/config"
import { getEarlyHints } from "Server/getEarlyHints"
import { loadAssetManifest } from "Server/manifest"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { RenderToStreamResult } from "System/Router/Utils/renderToStream"
import type { ServerAppResults } from "System/Router/serverRouter"
import { getENV } from "Utils/getENV"
import { getServerParam } from "Utils/getServerParam"
import { type HTMLProps, buildHtmlTemplate } from "html"
import { renderToString } from "react-dom/server"

// TODO: Use the same variables as the asset middleware. Both config and sharify
// have a default CDN_URL while this does not.
const { CDN_URL, NODE_ENV, GEMINI_CLOUDFRONT_URL, WEBFONT_URL } = process.env

const MANIFEST = loadAssetManifest("dist/manifest.json")

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
  stream?: RenderToStreamResult
}

export const renderServerApp = ({
  html,
  code = 200,
  headTags,
  mount = true,
  req,
  res,
  extractScriptTags,
  stream,
  styleTags,
}: RenderServerAppProps) => {
  const headTagsString = renderToString(headTags as any)

  const sharify = res.locals.sharify

  const { WEBFONT_URL } = sharify.data

  const scripts = extractScriptTags?.()

  const { linkHeaders, linkPreloadTags } = getEarlyHints(headTags ?? [])

  const theme = res.locals.sd.X_THEME_HEADER === "dark" ? "dark" : "light"

  const options: HTMLProps = {
    cdnUrl: NODE_ENV === "production" ? (CDN_URL as string) : "",
    content: {
      body: html,
      sharifyData: sharify.script(),
      head: headTagsString,
      linkPreloadTags,
      scripts,
      style: styleTags,
    },
    disable: {
      analytics: getServerParam(req, "disableAnalytics") === "true",
      segment:
        getServerParam(req, "disableSegment") === "true" ||
        !getENV("SEGMENT_WRITE_KEY"),
      stripe: getServerParam(req, "disableStripe") === "true",
      scripts: !mount,
      thirdParties: getENV("THIRD_PARTIES_DISABLED") === "true",
    },
    env: NODE_ENV as string,
    fontUrl: WEBFONT_URL,
    imageCdnUrl: GEMINI_CLOUDFRONT_URL as string,
    icons: {
      favicon: res.locals.asset("/images/favicon.ico"),
      faviconSVG: res.locals.asset("/images/favicon.svg"),
      appleTouchIcon: res.locals.asset("/images/apple-touch-icon.png"),
    },
    manifest: {
      browserconfig: MANIFEST.lookup("/images/browserconfig.xml"),
      openSearch: MANIFEST.lookup("/images/opensearch.xml"),
      webmanifest: MANIFEST.lookup("/images/manifest.webmanifest"),
    },
    theme,
  }

  setLinkHeaders(linkHeaders, res)

  const statusCode = getENV("statusCode") ?? code

  const htmlShell = buildHtmlTemplate(options)

  if (ENABLE_SSR_STREAMING && stream) {
    res.status(statusCode).write(htmlShell.split('<div id="root">')[0])

    // React mount point
    res.write('<div id="root">')
    const { passThroughStream, transform } = stream.initStream()

    // Start streaming HTML response
    passThroughStream.pipe(res)

    // Stream transform is the last one to close, so end here
    transform.on("close", () => {
      res.write("</div></body></html>")
      res.end()
    })
  } else {
    res.status(statusCode).send(htmlShell)
  }
}

const setLinkHeaders = (linkHeaders: string[], res: ArtsyResponse) => {
  if (!res.headersSent) {
    res.header("Link", [
      `<${CDN_URL}>; rel=preconnect; crossorigin`,
      `<${GEMINI_CLOUDFRONT_URL}>; rel=preconnect;`,
      `<${WEBFONT_URL}>; rel=preconnect; crossorigin`,
      `<${WEBFONT_URL}/all-webfonts.css>; rel=preload; as=style`,
      `<${WEBFONT_URL}/ll-unica77_regular.woff2>; rel=preload; as=font; crossorigin`,
      `<${WEBFONT_URL}/ll-unica77_medium.woff2>; rel=preload; as=font; crossorigin`,
      `<${WEBFONT_URL}/ll-unica77_italic.woff2>; rel=preload; as=font; crossorigin`,
      ...linkHeaders,
    ])
  }
}
