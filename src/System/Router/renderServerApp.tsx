import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { getServerParam } from "Utils/getServerParam"
import { renderToStaticMarkup, renderToString } from "react-dom/server"
import loadAssetManifest from "Server/manifest"
import path from "path"
import { ENABLE_SSR_STREAMING } from "Server/config"
import { getENV } from "Utils/getENV"
import { ServerAppResults } from "System/Router/serverRouter"
import { getWebpackEarlyHints } from "Server/getWebpackEarlyHints"
import { RenderToStreamResult } from "System/Router/Utils/renderToStream"
import { HtmlTemplate } from "HtmlTemplate"

// TODO: Use the same variables as the asset middleware. Both config and sharify
// have a default CDN_URL while this does not.
const { CDN_URL, NODE_ENV, GEMINI_CLOUDFRONT_URL } = process.env

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

  const { linkPreloadTags } = getWebpackEarlyHints()

  const options = {
    cdnUrl: NODE_ENV === "production" ? CDN_URL : "",
    content: {
      body: html,
      data: sharify.script(),
      head: headTagsString,
      linkPreloadTags,
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
      favicon: res.locals.asset("/images/favicon.ico"),
      faviconSVG: res.locals.asset("/images/favicon.svg"),
      appleTouchIcon: res.locals.asset("/images/apple-touch-icon.png"),
    },
    manifest: {
      browserConfig: MANIFEST.lookup("/images/browserconfig.xml"),
      openSearch: MANIFEST.lookup("/images/opensearch.xml"),
      webmanifest: MANIFEST.lookup("/images/manifest.webmanifest"),
    },
    sd: sharify.data,
  }

  const statusCode = getENV("statusCode") ?? code

  const htmlShell = renderToStaticMarkup(<HtmlTemplate {...options} />)

  res.status(statusCode).send(htmlShell)

  return

  res
    .status(statusCode)
    .render(`${PUBLIC_DIR}/html.ejs`, options, async (error, html) => {
      if (error) {
        console.error(error)

        res
          .status(500)
          .send("Internal Server Error: Error rendering server app")
      } else {
        if (ENABLE_SSR_STREAMING && stream) {
          res.write(html.split('<div id="react-root">')[0])

          // React mount point
          res.write('<div id="react-root">')
          const { passThroughStream, transform } = stream.initStream()

          // Start streaming HTML response
          passThroughStream.pipe(res)

          // Stream transform is the last one to close, so end here
          transform.on("close", () => {
            res.write("</div></body></html>")
            res.end()
          })
        } else {
          res.send(html)
        }
      }
    })
}
