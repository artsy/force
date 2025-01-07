import { type BoxProps, boxMixin } from "@artsy/palette"
import isPropValid from "@emotion/is-prop-valid"
import { themeGet } from "@styled-system/theme-get"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Link, type LinkPropsSimple } from "found"
import * as React from "react"
import { useMemo } from "react"
import styled from "styled-components"
import { type ResponsiveValue, compose, system } from "styled-system"

/**
 * Wrapper component around found's <Link> component with a fallback to a normal
 * <a> tag if ouside of a routing context.
 *
 * NOTE! The VALID_ROUTER_LINK_PROPS array below *must* be kept in mind if adding
 * new props.
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
    enablePrefetch?: boolean
  }

export const RouterLink: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<RouterLinkProps>>
> = React.forwardRef(({ inline, to, enablePrefetch = true, ...rest }, _ref) => {
  const systemContext = useSystemContext()
  const { router } = useRouter()

  const isPrefetchOnEnterEnabledLoggedIn =
    useFeatureFlag("diamond_prefetch-on-enter") && !!systemContext.user

  const isPrefetchOnEnterEnabledLoggedOut =
    useFeatureFlag("diamond_prefetch-on-enter-logged-out") &&
    !systemContext.user

  // TODO: Remove feature flags
  const isPrefetchOnEnterEnabled = true // isPrefetchOnEnterEnabledLoggedIn || isPrefetchOnEnterEnabledLoggedOut

  // When a prefetch is completed, propagate that in the router state.
  const [isPrefetched, setIsPrefetched] = React.useState(false)
  const { prefetch } = usePrefetchRoute({
    initialPath: to as string,
    onComplete: () => setIsPrefetched(true),
  })

  const routes = router?.matcher?.routeConfig ?? []
  const matcher = router?.matcher

  const isSupportedInRouter = useMemo(
    () => !!matcher?.matchRoutes(routes, to),
    [matcher, routes, to],
  )

  // If displaying the linked URL in the same browsing context, e.g. browser tab.
  const isSameBrowsingContext = !rest.target || rest.target === "_self"
  const isRouterAware = isSupportedInRouter && isSameBrowsingContext

  const { ref: intersectionRef } = useIntersectionObserver({
    once: true,
    options: {
      threshold: 0.2,
    },
    onIntersection: () => {
      if (enablePrefetch && isPrefetchOnEnterEnabled) {
        prefetch()
      }
    },
  })

  const handleMouseOver = () => {
    if (enablePrefetch) {
      prefetch()
    }
  }

  const location = router?.createLocation?.((to as string) ?? "") ?? {
    pathname: to,
    query: {},
  }

  if (isRouterAware) {
    return (
      <RouterAwareLink
        inline={inline}
        to={{
          ...location,
          state: { isPrefetched },
        }}
        onMouseOver={handleMouseOver}
        ref={isPrefetchOnEnterEnabled ? (intersectionRef as any) : null}
        {...rest}
      />
    )
  }

  return (
    <RouterUnawareLink
      inline={inline}
      href={to ?? ""}
      onMouseOver={handleMouseOver}
      {...rest}
    />
  )
})

RouterLink.displayName = "RouterLink"

const textDecoration = system({ textDecoration: true })
const routerLinkMixin = compose(boxMixin, textDecoration)

type RouterLinkMixinProps = BoxProps & {
  textDecoration?: ResponsiveValue<string>
  inline?: boolean
}

const VALID_ROUTER_LINK_PROPS = ["activeClassName", "activeStyle", "exact"]

const routerLinkValidator = (prop: string) => {
  return VALID_ROUTER_LINK_PROPS.includes(prop)
}

export const RouterAwareLink: React.FC<
  React.PropsWithChildren<LinkPropsSimple & RouterLinkMixinProps>
> = styled(Link).withConfig({
  shouldForwardProp: (prop: string) => {
    return isPropValid(prop) || routerLinkValidator(prop)
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
  React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & RouterLinkMixinProps
  >
> = styled.a`
  :hover {
    color: ${props => props.inline && themeGet("colors.blue100")};
  }
  :visited {
    color: ${props => props.inline && themeGet("colors.blue150")};
  }
  ${routerLinkMixin}
`
