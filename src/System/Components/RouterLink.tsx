import { Link, LinkPropsSimple } from "found"
import * as React from "react"
import { BoxProps, boxMixin } from "@artsy/palette"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { useMemo } from "react"
import { themeGet } from "@styled-system/theme-get"
import { useRouter } from "System/Hooks/useRouter"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

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
  ({ inline, to, ...rest }, _ref) => {
    const systemContext = useSystemContext()
    const { router } = useRouter()

    // Right now, prefetching on viewport enter is only enabled for logged-out users
    // TODO: Remove feature flag
    const isPrefetchOnEnterEnabled =
      useFeatureFlag("diamond_prefetch-on-enter") && !systemContext?.user

    const { prefetch } = usePrefetchRoute(to as string)

    const routes = router?.matcher?.routeConfig ?? []
    const matcher = router?.matcher

    const isSupportedInRouter = useMemo(
      () => !!matcher?.matchRoutes(routes, to),
      [matcher, routes, to]
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
        if (isPrefetchOnEnterEnabled) {
          prefetch()
        }
      },
    })

    const handleMouseOver = () => {
      prefetch()
    }

    if (isRouterAware) {
      return (
        <RouterAwareLink
          inline={inline}
          to={to ?? ""}
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
