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
import { NODE_ENV, VERBOSE_LOGGING } from "../../config"
import { renderServerApp } from "v2/System/Router/renderServerApp"
import { ErrorPage } from "v2/Components/ErrorPage"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { renderToString } from "react-dom/server"
import { ServerStyleSheet } from "styled-components"
import {
  ArtsyLogoBlackIcon,
  injectGlobalStyles,
  ThemeProviderV3,
} from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles()

export const errorHandlerMiddleware = async (
  err: any,
  req: ArtsyRequest,
  res: ArtsyResponse,
  _next: NextFunction
) => {
  // If we are in development mode, we want to display the message & stack trace
  const enableLogging =
    NODE_ENV === "development" || argv.verbose || VERBOSE_LOGGING

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
    console.log(detail)
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
                message={enableLogging ? message : undefined}
                detail={enableLogging ? detail : undefined}
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
    console.error(err)
    res.status(code).send(enableLogging ? message : "")
  }
}
