import { Link, LinkProps, LinkPropsSimple, RouterContext } from "found"
import { omit, pick } from "lodash"
import React, { useContext } from "react"
import { get } from "v2/Utils/get"

/**
 * Wrapper component around found's <Link> component with a fallback to a normal
 * <a> tag if ouside of a routing context.
 *
 * NOTE: If using styled-components, <RouterLink> can be easily styled like so:
 *
 * const StyledLink = styled(RouterLink)`
 *   ...
 * `
 */

export type RouterLinkProps = LinkProps &
  React.HTMLAttributes<HTMLAnchorElement>

export const RouterLink: React.FC<RouterLinkProps> = ({
  to,
  children,
  ...props
}) => {
  const context = useContext(RouterContext)
  const routes = get(context, c => c.router.matcher.routeConfig, [])
  const isSupportedInRouter = !!get(context, c =>
    c.router.matcher.matchRoutes(routes, to)
  )

  /**
   * Only pass found-router specific props across, props that conform to the
   * link API found here: https://github.com/4Catalyzer/found#links
   */
  const handlers = Object.keys(props).reduce((acc, prop) => {
    if (prop.startsWith("on")) {
      acc.push(prop)
    }
    return acc
  }, [])

  if (isSupportedInRouter) {
    const allowedProps = pick(props, [
      "aria-label",
      "Component",
      "activeClassName",
      "className",
      "data-test",
      "exact",
      "replace",
      "style",
      ...handlers,
    ])

    return (
      <Link to={to} {...allowedProps}>
        {children}
      </Link>
    )
  } else {
    return (
      <a
        href={to as string}
        className={(props as LinkPropsSimple).className}
        style={(props as LinkPropsSimple).style}
        {...omit(props, ["activeClassName", "hasLighterTextColor"])}
      >
        {children}
      </a>
    )
  }
}
