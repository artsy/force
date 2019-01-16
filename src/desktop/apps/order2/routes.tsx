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
      ServerApp,
      redirect,
      status,
      headTags,
      scripts,
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
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => headTags,
        body: ServerApp,
      },
      locals: {
        ...res.locals,
        assetPackage: "order2",
        // header logo should link back to originating artwork
        headerLogoHref,
        hideLogoForEigen: res.locals.sd.EIGEN,
        options: {
          stripev3: true,
        },
        scripts,
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log("(apps/order2) Error: ", error)
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
