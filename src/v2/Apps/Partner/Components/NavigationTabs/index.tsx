import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { NavigationTabs_partner } from "v2/__generated__/NavigationTabs_partner.graphql"

interface NavigationTabsProps {
  partner: NavigationTabs_partner
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ partner }) => {
  const renderTabs = () => {
    const { slug } = partner

    const route = (path?: string) => `/partner2/${slug}${path ? path : ""}`

    const routes = [
      {
        name: "Overview",
        href: route(),
        exact: true,
      },
      {
        name: "Shows",
        href: route("/shows"),
        exact: true,
      },
      {
        name: "Works",
        href: route("/works"),
        exact: true,
      },
      {
        name: "Artists",
        href: route("/artists"),
        exact: true,
      },
      {
        name: "Articles",
        href: route("/articles"),
        exact: true,
      },
      {
        name: "Contact",
        href: route("/contact"),
        exact: true,
      },
    ]

    return routes.map(route => (
      <RouteTab to={route.href} exact={route.exact} key={route.href}>
        {route.name}
      </RouteTab>
    ))
  }

  return <RouteTabs fill>{renderTabs()}</RouteTabs>
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  {
    partner: graphql`
      fragment NavigationTabs_partner on Partner {
        slug
      }
    `,
  }
)
