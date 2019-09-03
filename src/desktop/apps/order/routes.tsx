import { buildServerApp } from "reaction/Artsy/Router/server"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import { routes } from "reaction/Apps/Order/routes"
import { stitch } from "@artsy/stitch"
const metaphysics = require("lib/metaphysics.coffee")

export const checkoutFlow = async (req, res, next) => {
  if (!res.locals.sd.CURRENT_USER) {
    return res.redirect(
      `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
    )
  }
  try {
    const {
      bodyHTML,
      redirect,
      status,
      headTags,
      scripts,
      styleTags,
    } = await buildServerApp({
      routes,
      url: req.url,
      userAgent: req.header("User-Agent"),
      context: buildServerAppContext(req, res),
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    const headerLogoHref = await getArtworkHref(req)

    // Render layout
    const layout = await stitch({
      basePath: __dirname,
      layout:
        "../../components/main_layout/templates/react_minimal_header.jade",
      blocks: {
        head: () => headTags,
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "order",
        // header logo should link back to originating artwork
        headerLogoHref,
        hideHeaderOnEigen: res.locals.sd.EIGEN,
        options: {
          stripev3: true,
        },
        scripts,
        styleTags,
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    next(error)
  }
}

async function getArtworkHref(req) {
  try {
    const { order } = await metaphysics({
      query: OrderHeaderQuery(req.params.orderID),
      req,
    })
    return order.lineItems.edges[0].node.artwork.href
  } catch (e) {
    console.error(e)
    return "/"
  }
}

function OrderHeaderQuery(orderId) {
  return `
  query OrderHeaderQuery {
    order(id: "${orderId}") {
      id
      lineItems {
        edges {
          node {
            artwork {
              href
            }
          }
        }
      }
    }
  }`
}
