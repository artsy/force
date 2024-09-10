import { Link, LinkPropsSimple } from "found"
import * as React from "react"
import { Box, BoxProps, boxMixin } from "@artsy/palette"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { useMemo } from "react"
import { themeGet } from "@styled-system/theme-get"
import { useRouter } from "System/Hooks/useRouter"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { fetchQuery, GraphQLTaggedNode } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { OperationType } from "relay-runtime"

/**
 * Wrapper component around found's <Link> component with a fallback to a normal
 * <a> tag if ouside of a routing context.
 */
export type RouterLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<LinkPropsSimple, "to"> &
  BoxProps & {
    /**
     * Simplifies `LinkProps#to` to just be a string and handle nulls, which are common
     */
    to: string | null | undefined
    textDecoration?: ResponsiveValue<string>
    inline?: boolean
  }

export const RouterLink: React.FC<RouterLinkProps> = React.forwardRef(
  ({ inline, to, ...rest }, ref) => {
    const [isPrefetched, setIsPrefetched] = React.useState(false)
    const { relayEnvironment } = useSystemContext()
    const context = useRouter()
    const routes = context?.router?.matcher?.routeConfig ?? []
    const matcher = context?.router?.matcher
    const isSupportedInRouter = useMemo(
      () => !!matcher?.matchRoutes(routes, to),
      [matcher, routes, to]
    )

    const { target } = rest
    // If displaying the linked URL in the same browsing context, e.g. browser tab.
    const isSameBrowsingContext = !target || target === "_self"
    const isRouterAware = isSupportedInRouter && isSameBrowsingContext

    const handleEnterView = () => {
      if (rest.debug) {
        console.log("entering view", to)
      }

      if (isPrefetched) {
        return
      }

      const foundRoute = findRoutesByPath({ path: to as string })[0]

      if (!foundRoute) {
        console.log("No route found for path:", to)
        return
      }

      // prefetch

      const prefetch = route => {
        const query = route?.query as GraphQLTaggedNode
        const variables = (() => {
          if (route?.prepareVariables) {
            return route?.prepareVariables?.(
              foundRoute.match.params,
              context.match
            ) as OperationType["variables"]
          } else {
            return foundRoute.match.params
          }
        })()

        if (query && variables) {
          // console.log("*****************")
          // console.log("PREFETCHING", to, variables)
          // console.log("*****************")

          fetchQuery(relayEnvironment, query, variables)
            .toPromise()
            .then(response => {
              console.log("[Prefetched]", to)
              setIsPrefetched(true)
            })
            .catch(error => {
              {
                console.error("[Prefetch Error]", error)
              }
            })
        }
      }

      prefetch(foundRoute.route)

      if (foundRoute.route.children) {
        if (foundRoute.route.children[0].path === "") {
          prefetch(foundRoute.route.children[0])
        }
      }
    }

    const handleExitView = () => {
      // console.log("exiting view")
    }

    const { ref: intersectionRef } = useIntersectionObserver({
      once: false,
      options: {
        threshold: 0.2,
      },
      onIntersection: handleEnterView,
      onOffIntersection: handleExitView,
    })

    if (rest.debug) {
      console.log("RouterLink", {
        isRouterAware,
        isPrefetched,
        isSupportedInRouter,
        isSameBrowsingContext,
        to,
        target,
      })
    }

    if (isRouterAware) {
      return (
        <>
          <RouterAwareLink
            inline={inline}
            to={to ?? ""}
            {...rest}
            ref={intersectionRef as any}
          />
          {isPrefetched && (
            <Box
              position="relative"
              bottom={0}
              right={0}
              backgroundColor="green"
              width="15px"
              height="15px"
              zIndex={1000}
              top="-15px"
              right="-15px"
            />
          )}
        </>
      )
    }

    return (
      <RouterUnawareLink
        inline={inline}
        href={to ?? ""}
        ref={intersectionRef as any}
        {...rest}
      />
    )
  }
)

RouterLink.displayName = "RouterLink"

const textDecoration = system({ textDecoration: true })
const routerLinkMixin = compose(boxMixin, textDecoration)

type RouterLinkMixinProps = BoxProps & {
  textDecoration?: ResponsiveValue<string>
  inline?: boolean
}

const VALID_ROUTER_LINK_PROPS = [
  "activeClassName",
  "activeStyle",
  "exact",
  "target",
  "to",
]

const routerLinkValidator = (prop: string) => {
  return VALID_ROUTER_LINK_PROPS.includes(prop)
}

export const RouterAwareLink: React.FC<LinkPropsSimple & RouterLinkMixinProps> =
  // TODO: Update styled-components types
  // @ts-ignore
  styled(Link).withConfig({
    shouldForwardProp: (
      prop: string,
      defaultValidatorFn: (prop: string) => boolean
    ) => {
      return defaultValidatorFn(prop) || routerLinkValidator(prop)
    },
  })`
    :hover {
      color: ${props => props.inline && themeGet("colors.blue100")};
    }
    :visited {
      color: ${props => props.inline && themeGet("colors.blue150")};
    }
    ${routerLinkMixin}
  `

export const RouterUnawareLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & RouterLinkMixinProps
> =
  // TODO: Update styled-components types
  // @ts-ignore
  styled.a.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) => defaultValidatorFn(prop),
  })`
    :hover {
      color: ${props => props.inline && themeGet("colors.blue100")};
    }
    :visited {
      color: ${props => props.inline && themeGet("colors.blue150")};
    }
    ${routerLinkMixin}
  `
