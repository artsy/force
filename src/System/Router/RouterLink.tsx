import { Link, LinkPropsSimple, RouterContext } from "found"
import { useContext } from "react"
import * as React from "react"
import { BoxProps, boxMixin } from "@artsy/palette"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { useMemo } from "react"

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

export const RouterLink: React.FC<RouterLinkProps> = React.forwardRef(
  ({ to, noUnderline, ...rest }, ref) => {
    const context = useContext(RouterContext)
    const routes = context?.router?.matcher?.routeConfig ?? []
    const matcher = context?.router?.matcher
    const isSupportedInRouter = useMemo(
      () => !!matcher?.matchRoutes(routes, to),
      [matcher, routes, to]
    )

    // TODO: Bulk replace
    const deprecated = noUnderline ? { textDecoration: "none" } : {}

    if (isSupportedInRouter) {
      return <RouterAwareLink to={to ?? ""} {...deprecated} {...rest} />
    }

    return <RouterUnawareLink href={to ?? ""} {...deprecated} {...rest} />
  }
)

RouterLink.displayName = "RouterLink"

const textDecoration = system({ textDecoration: true })
const routerLinkMixin = compose(boxMixin, textDecoration)

type RouterLinkMixinProps = BoxProps & {
  textDecoration?: ResponsiveValue<string>
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
    ${routerLinkMixin}
  `
