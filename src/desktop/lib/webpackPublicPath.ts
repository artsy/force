/**
 * Set webpack public-path asset lookup to CDN in production, but only on
 * the client, as we use the assetMiddleware helper to map URLs on the server.
 * @see https://github.com/artsy/force/blob/master/src/lib/middleware/asset.ts
 *
 * FIXME: Move this into Circle config and or Docker
 */
if (process.env.NODE_ENV === "production") {
  const { hostname } = window.location
  let cdnUrl

  // Production
  if (hostname === "artsy.net" || hostname === "www.artsy.net") {
    cdnUrl = "https://d1s2w0upia4e9w.cloudfront.net"

    // Localhost
  } else if (hostname === "localhost" || hostname === "local.artsy.net") {
    cdnUrl = ""

    // Everything else, including staging and review apps
  } else {
    cdnUrl = "https://d1rmpw1xlv9rxa.cloudfront.net"
  }

  // TODO: Remove this as its temporary while routes are being converted.
  const convertedRoutes = [
    "/artist/",
    "/artists",
    "/art-fairs",
    "/artist-series",
    "/collect",
    "/collection",
    "/collections",
    "/fair/",
    "/fairs",
    "/feature/",
    "/show/",
    "/user/conversations",
    "/user/purchases",
    "/viewing-rooms",
    "/viewing-room/",
  ]

  function beenConverted() {
    for (const convertedRoute of convertedRoutes) {
      if (window.location.pathname.startsWith(convertedRoute)) {
        return true
      }
    }
    return false
  }

  // TODO: Ugh, this is a mess. Figure out a way to not relying on custom
  // webpack pathing client side.
  if (window.location.pathname.startsWith("/novo") || beenConverted()) {
    __webpack_public_path__ = cdnUrl + "/assets-novo/"
  } else {
    __webpack_public_path__ = cdnUrl + "/assets/"
  }

  // @ts-ignore
  window.__getPublicPath = () => __webpack_public_path__
}
