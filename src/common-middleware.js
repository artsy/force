// Setup sharify
// TODO: Export a function instead of loading on import.
import "./lib/setup_sharify"

import addRequestId from "express-request-id"
import compression from "compression"
import cookieParser from "cookie-parser"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import helmet from "helmet"
import path from "path"
import sharify from "sharify"
import siteAssociation from "artsy-eigen-web-association"
import timeout from "connect-timeout"
import ensureSSL from "./lib/middleware/ensure_ssl"
import hstsMiddleware from "./lib/middleware/hsts"
import ipFilterMiddleware from "./lib/middleware/ipFilter"
import sessionMiddleware from "./lib/middleware/sessionMiddleware"
import config from "./config"

const { APP_TIMEOUT, IP_DENYLIST, NODE_ENV } = config

function securityMiddleware(app) {
  // Denied IPs
  if (IP_DENYLIST && IP_DENYLIST.length > 0) {
    app.use(ipFilter(IP_DENYLIST))
  }

  // Timeout middleware
  if (process.env.NODE_ENV === "production") {
    app.use(timeout(APP_TIMEOUT || "29s"))
  }

  // Make sure we're using SSL and prevent clickjacking
  app.use(ensureSSL)

  // Use HSTS to prevent downgrade attacks.
  app.use(hstsMiddleware)

  // Prevent frame nesting in development and production.
  if (!NODE_ENV === "test") {
    app.use(helmet.frameguard())
  }

  // Inject UUID for each request into the X-Request-Id header
  app.use(addRequestId())

  // Cookie parser
  app.use(cookieParser())

  // Session cookie
  app.use(sessionMiddleware())
}

function staticAssetMiddlewares(app) {
  // Mount static assets from root public folder
  app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  glob
    .sync(`${__dirname}/{public,{desktop,mobile}/**/public}`)
    .forEach(folder => {
      app.use(express.static(folder))
    })

  app.use(favicon(path.resolve(__dirname, "mobile/public/images/favicon.ico")))
  app.use("/(.well-known/)?apple-app-site-association", siteAssociation)
}

export default function commonMiddlewareSetup(app) {
  // Ensure basic security settings
  securityMiddleware(app)

  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.
  app.use(sharify)

  // Ensure all responses are gzip compressed
  app.use(compression())

  // Static assets
  staticAssetMiddlewares(app)
}
