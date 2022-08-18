/**
 * Types of Errors & handlers
 *
 * Client-side errors
 *
 * - Client-side routing (404-style) error
 *   - Handled by `RenderStatus#RenderError`
 * - Thrown runtime error (500-style) within the React application
 *   - Caught and handled by `ErrorBoundary`
 *
 * Server-side errors
 *
 * - 4xx errors outside of React routes
 *   - Handled by `errorHandlerMiddleware`
 * - 4xx errors within React routes
 *   - Initially caught by `RenderStatus#RenderError`, wherein we throw
 *     a new HTTPError with the status code, which ultimately handled by `errorHandlerMiddleware`
 * - Thrown runtime error within the React application
 *   - Handled by `errorHandlerMiddleware`
 * - Errors raised in a route's `onServerSideRender`
 *   - Handled by `errorHandlerMiddleware`
 */
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import type { NextFunction } from "express"
import { argv } from "yargs"
import { IpDeniedError } from "express-ipfilter"
import { NODE_ENV, VERBOSE_LOGGING } from "Server/config"
import { renderServerApp } from "System/Router/renderServerApp"
import { ErrorPage } from "Components/ErrorPage"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { renderToString } from "react-dom/server"
import { ServerStyleSheet } from "styled-components"
import {
  ArtsyLogoBlackIcon,
  injectGlobalStyles,
  ThemeProviderV3,
} from "@artsy/palette"
import createLogger from "Utils/logger"

const { GlobalStyles } = injectGlobalStyles()
const logger = createLogger("Server/middleware/errorHandlerMiddleware")

export const errorHandlerMiddleware = async (
  err: any,
  req: ArtsyRequest,
  res: ArtsyResponse,
  _next: NextFunction
) => {
  const enableLogging =
    NODE_ENV === "development" || argv.verbose || VERBOSE_LOGGING

  const displayStackTrace = NODE_ENV === "development"

  const code = (() => {
    switch (true) {
      case req.timedout:
        return 504
      case err instanceof IpDeniedError:
        return 401
      case !!err.status:
        return err.status
      default:
        return 500
    }
  })()

  const message = err.message || err.text || "Internal Server Error"
  const detail = err.stack

  if (enableLogging && err.status !== 404) {
    logger.log(detail)
  } else if (code >= 500) {
    // Log server errors (code, stack trace) when in production mode
    logger.error(code, detail)
  }

  try {
    const sheet = new ServerStyleSheet()

    const bodyHTML = renderToString(
      sheet.collectStyles(
        <ThemeProviderV3>
          <GlobalStyles />

          <AppContainer my={4}>
            <HorizontalPadding>
              <a href="/" style={{ display: "block" }}>
                <ArtsyLogoBlackIcon />
              </a>

              <ErrorPage
                mt={4}
                code={code}
                message={displayStackTrace ? message : undefined}
                detail={displayStackTrace ? detail : undefined}
              />
            </HorizontalPadding>
          </AppContainer>
        </ThemeProviderV3>
      )
    )

    const styleTags = sheet.getStyleTags()

    renderServerApp({
      req,
      res,
      code,
      bodyHTML,
      styleTags,
      mount: false, // Does not mount the client-side
    })
  } catch (err) {
    logger.error(err)
    res.status(code).send(enableLogging ? message : "")
  }
}
