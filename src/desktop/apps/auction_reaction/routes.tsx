import { buildServerApp } from "v2/System/Router/server"
import { auctionRoutes } from "v2/Apps/Auction/auctionRoutes"
import { stitch } from "@artsy/stitch"

const renderPage = async ({ layoutTemplate }, req, res, next) => {
  try {
    const {
      bodyHTML,
      redirect,
      status,
      headTags,
      scripts,
      styleTags,
    } = await buildServerApp({
      req,
      res,
      next,
      routes: auctionRoutes,
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    // Render layout
    const layout = await stitch({
      basePath: __dirname,
      blocks: {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        body: bodyHTML,
        head: () => headTags,
      },
      layout: `../../components/main_layout/templates/${layoutTemplate}.jade`,
      locals: {
        ...res.locals,
        assetPackage: "auction_reaction",
        options: {
          stripev3: true,
        },
        scripts,
        styleTags,
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.error("(apps/auction_reaction) Error: ", error)
    if (error.message.includes("Received status code 404")) {
      const notFoundError: any = new Error("Sale Not Found")
      notFoundError.status = 404
      next(notFoundError)
    } else {
      next(error)
    }
  }
}

export const bidderRegistration = async (req, res, next) => {
  /* If this request is from a registration modal (trying to create a bidder),
     defer to the auction_support app router
  */
  if (req.query["accepted-conditions"] === "true") {
    next()
  } else if (!res.locals.sd.CURRENT_USER) {
    return res.redirect(
      `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
    )
  } else {
    await renderPage({ layoutTemplate: "react_minimal_header" }, req, res, next)
  }
}

export const auctionFAQRoute = async (req, res, next) => {
  await renderPage({ layoutTemplate: "react_index" }, req, res, next)
}

export const confirmBidRoute = async (req, res, next) => {
  if (!res.locals.sd.CURRENT_USER) {
    return res.redirect(
      `/login?redirectTo=${encodeURIComponent(req.originalUrl)}`
    )
  } else {
    await renderPage({ layoutTemplate: "react_minimal_header" }, req, res, next)
  }
}
