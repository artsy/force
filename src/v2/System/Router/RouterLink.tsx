import { Link, LinkPropsSimple, RouterContext } from "found"
import React, { useContext } from "react"
import { BoxProps, boxMixin } from "@artsy/palette"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { useMemo } from "react"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { prefetchQuery, usePrefetchContext } from "./Prefetch"
import { findCurrentRoute } from "./Utils/findCurrentRoute"
import { useSystemContext } from "@artsy/reaction/dist/Artsy"

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
    to: string | null
    textDecoration?: ResponsiveValue<string>
    /** @deprecated Use `textDecoration` */
    noUnderline?: boolean
  }

export const RouterLink: React.ForwardRefExoticComponent<RouterLinkProps> = React.forwardRef(
  ({ to, noUnderline, ...rest }, forwardedRef) => {
    const { relayEnvironment } = useSystemContext()
    const { prefetch } = usePrefetchContext()
    const { isEnteredView, Waypoint } = useLazyLoadComponent()
    const routerContext = useContext(RouterContext)
    const routes = routerContext?.router?.matcher?.routeConfig ?? []
    const matcher = routerContext?.router?.matcher
    const { isSupportedInRouter, route } = useMemo(() => {
      const route = matcher?.matchRoutes(routes, to)
      return {
        route,
        isSupportedInRouter: !!route,
      }
    }, [matcher, routes, to])

    // TODO: Bulk replace
    const deprecated = noUnderline ? { textDecoration: "none" } : {}

    if (prefetch && isEnteredView) {
      const routePayload = matcher.makePayload(matcher.matchRoutes(routes, to))
      const routeDefinition = findCurrentRoute({ ...routePayload, routes })

      debugger
      console.log("*** ENTERED", to, routeDefinition)
    }

    if (isSupportedInRouter) {
      return (
        <>
          {prefetch && <Waypoint />}
          <RouterAwareLink
            ref={forwardedRef as any}
            to={to ?? ""}
            {...deprecated}
            {...rest}
          />
        </>
      )
    }

    return (
      <RouterUnawareLink
        ref={forwardedRef as any}
        href={to ?? ""}
        {...deprecated}
        {...rest}
      />
    )
  }
)

RouterLink.displayName = "RouterLink"

const textDecoration = system({ textDecoration: true })
const routerLinkMixin = compose(boxMixin, textDecoration)

const RouterAwareLink = styled(Link)`
  ${routerLinkMixin}
`

const RouterUnawareLink = styled.a`
  ${routerLinkMixin}
`
