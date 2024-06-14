import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { RouteProps } from "System/Router/Route"
import { matchingMediaQueriesForUserAgent } from "System/Router/Utils/matchingMediaQueriesForUserAgent"
import { renderStates } from "System/Router/RenderStates"
import { RouterConfig } from "System/Router/clientRouter"
import { MatchingMediaQueries, createMediaStyle } from "Utils/Responsive"
import { getUser } from "Utils/user"
import { NextFunction } from "express"
import { createQueryMiddleware } from "farce"
import { createRender } from "found"
import { Resolver } from "found-relay"
import {
  FarceElementResult,
  FarceRedirectResult,
  getFarceResult,
} from "found/server"
import qs from "qs"
import { Environment } from "react-relay"
import React from "react"
import { executeRouteHooks } from "System/Router/Utils/executeRouteHooks"
import { Boot } from "System/Boot"
import { collectAssets } from "System/Router/Utils/collectAssets"
import { getServerAppContext } from "System/Router/Utils/serverAppContext"
import { queryStringParsing } from "System/Router/Utils/queryStringParsing"

export interface ServerAppResults {
  html?: string
  redirect?: {
    url: string
  }
  status?: number
  scripts?: string
  headTags?: any[]
  styleTags?: string
}

export interface ServerRouterConfig extends RouterConfig {
  req: ArtsyRequest
  res: ArtsyResponse
  next: NextFunction
  routes: RouteProps[]
  context?: {
    injectedData?: any
    relayEnvironment: Environment
  }
}

export const setupServerRouter = async ({
  req,
  res,
  next,
  routes,
  context,
  ...config
}: ServerRouterConfig): Promise<ServerAppResults> => {
  await executeRouteHooks(req, res, next)

  const matchContext = getServerAppContext(req, res, context)

  const userAgent = req.header("User-Agent") ?? ""

  const user = getUser(matchContext.user)

  const relayEnvironment = createRelaySSREnvironment({ user, userAgent })

  const historyMiddlewares = [
    createQueryMiddleware({
      parse: queryStringParsing,
      stringify: qs.stringify,
    }),
  ]

  const resolver = new Resolver(relayEnvironment)

  const render = createRender(renderStates)

  const routeConfig = routes

  const farceResult = (await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver,
    matchContext,
    render,
  })) as FarceElementResult | FarceRedirectResult

  const redirectResult = farceResult as FarceRedirectResult
  const elementResult = farceResult as FarceElementResult
  const redirect = redirectResult?.redirect

  if (isRedirect(farceResult)) {
    return farceResult
  }

  const status = elementResult.status

  const headTags = [
    <style key="fresnel" type="text/css">
      {createMediaStyle()}
    </style>,
  ]

  const matchingMediaQueries = matchingMediaQueriesForUserAgent(userAgent)

  const ServerRouter: React.FC = () => {
    return (
      <Boot
        context={matchContext}
        headTags={headTags}
        relayEnvironment={relayEnvironment}
        routes={routes}
        user={user}
        onlyMatchMediaQueries={matchingMediaQueries as MatchingMediaQueries}
      >
        {elementResult.element}
      </Boot>
    )
  }

  const { html, scripts, styleTags } = await collectAssets({
    ServerRouter,
    relayEnvironment,
  })

  const result = {
    headTags,
    html,
    redirect,
    scripts,
    status,
    styleTags,
  }

  if (__TEST_INTERNAL_SERVER_APP__) {
    Object.defineProperty(result, __TEST_INTERNAL_SERVER_APP__, {
      value: ServerRouter,
    })
  }

  return result
}

const isRedirect = (
  farceResult: FarceElementResult | FarceRedirectResult
): farceResult is FarceRedirectResult => {
  return farceResult.hasOwnProperty("redirect")
}

export const __TEST_INTERNAL_SERVER_APP__ =
  typeof jest !== "undefined" ? Symbol() : null
