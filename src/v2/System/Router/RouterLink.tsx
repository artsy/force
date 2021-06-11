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
  React.HTMLAttributes<HTMLAnchorElement> & {
    noUnderline?: boolean
  }

export const RouterLink: React.ForwardRefExoticComponent<RouterLinkProps> = React.forwardRef(
  ({ to, children, ...props }, ref) => {
    const styleProps = props.noUnderline ? { textDecoration: "none" } : {}
    const context = useContext(RouterContext)
    const routes = get(context, c => c?.router?.matcher?.routeConfig, [])
    const isSupportedInRouter = !!get(context, c =>
      c?.router?.matcher?.matchRoutes(routes, to)
    )

    /**
     * Only pass found-router specific props across, props that conform to the
     * link API found here: https://github.com/4Catalyzer/found#links
     */
    const handlers = Object.keys(props).reduce((acc, prop) => {
      if (prop.startsWith("on")) {
        // @ts-expect-error STRICT_NULL_CHECK
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
        "role",
        "style",
        "tabIndex",
        ...handlers,
      ])

      return (
        <Link
          ref={ref as any}
          to={to}
          {...allowedProps}
          // @ts-expect-error STRICT_NULL_CHECK
          style={{ ...styleProps, ...(props as LinkPropsSimple).style }}
        >
          {children}
        </Link>
      )
    } else {
      return (
        <a
          ref={ref}
          href={to as string}
          className={(props as LinkPropsSimple).className}
          style={{ ...styleProps, ...(props as LinkPropsSimple).style }}
          {...omit(props, [
            "active",
            "activeClassName",
            "alignItems",
            "hasLighterTextColor",
            "justifyContent",
            "noUnderline",
            "textAlign",
            "underlineBehavior",
          ])}
        >
          {children}
        </a>
      )
    }
  }
)

RouterLink.displayName = "RouterLink"
