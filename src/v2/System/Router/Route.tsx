import { RouteSpinner } from "v2/System/Relay/renderWithLoadProgress"
import { RouteConfig, HttpError, Match } from "found"
import BaseRoute from "found/Route"
import * as React from "react";
import { CacheConfig, GraphQLTaggedNode } from "relay-runtime";
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress";
import { NextFunction } from "express";



interface RouteConfigProps extends RouteConfig {
  cacheConfig?: CacheConfig
  children?: AppRouteConfig[]
  displayFullPage?: boolean
  fetchIndicator?: FetchIndicator
  hideNav?: boolean
  hideFooter?: boolean
  hideNavigationTabs?: boolean
  ignoreScrollBehavior?: boolean
  ignoreScrollBehaviorBetweenChildren?: boolean
  onClientSideRender?: (props: { match: Match }) => void
  onServerSideRender?: (props: { req: ArtsyRequest, res: ArtsyResponse, next: NextFunction, route: AppRouteConfig }) => void
  prepareVariables?: (params: any, props: any) => object
  query?: GraphQLTaggedNode
  scrollToTop?: boolean
  shouldWarnBeforeLeaving?: boolean
  theme?: 'v2' | 'v3'
}

// Strip the index prop from `found`'s RouteConfig so that we can lock the
// config to the above definition
type RemoveIndex<T> = {
  [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P]
};

export type AppRouteConfig = RemoveIndex<RouteConfigProps>

type FetchIndicator = "spinner" | "overlay"

interface CreateRenderProps {
  fetchIndicator?: FetchIndicator
  render?: (props) => React.ReactNode
}

interface RenderArgProps {
  Component: React.ComponentType
  props?: object
  error?: Error
}

function createRender({
  fetchIndicator = "overlay",
  render,
}: CreateRenderProps) {
  return (renderArgs: RenderArgProps) => {
    const { Component, props, error } = renderArgs
    if (error) {
      if (error instanceof HttpError) {
        throw error
      }
      console.error(
        "[Artsy/Router/Route] Non HttpError rendering route:",
        error
      )
      return null
    }

    if (render) {
      return render(renderArgs)
    }

    if (Component === undefined) {
      return undefined
    }

    // This should only ever show when doing client-side routing.
    if (!props) {
      if (fetchIndicator === "spinner") {
        return <RouteSpinner />
      } else if (fetchIndicator === "overlay") {
        /**
         * Its an odd requirement, but the way in which one triggers RenderStatus
         * component updates is to return undefined.
         */
        return undefined

        // If for some reason something else is passed, fall back to the spinner
      } else {
        return <RouteSpinner />
      }
    }

    return <Component {...props} />
  }
}

export class Route extends BaseRoute {
  constructor(props) {
    if (!(props.query || props.getQuery)) {
      super(props)
      return
    }

    super({
      ...props,
      render: createRender(props),
    })
  }
}
