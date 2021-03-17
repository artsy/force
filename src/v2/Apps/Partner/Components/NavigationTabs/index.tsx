import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { NavigationTabs_partner } from "v2/__generated__/NavigationTabs_partner.graphql"

interface NavigationTabsProps {
  partner: NavigationTabs_partner
}

export class NavigationTabs extends React.Component<NavigationTabsProps> {
  renderTabs = () => {
    const {
      partner: { slug },
    } = this.props

    const route = (path?: string) => `/novo/partner/${slug}${path ? path : ""}`

    const routes = [
      {
        name: "Overview",
        href: route(),
        exact: true,
      },
      {
        name: "Articles",
        href: route("/articles"),
        exact: false,
      },
      {
        name: "Shows",
        href: route("/shows"),
        exact: false,
      },
      {
        name: "Works",
        href: route("/works"),
        exact: false,
      },
      {
        name: "Artists",
        href: route("/artists"),
        exact: false,
      },
      {
        name: "Contact",
        href: route("/contact"),
        exact: false,
      },
    ]

    return routes.map(route => (
      <RouteTab to={route.href} exact={route.exact} key={route.href}>
        {route.name}
      </RouteTab>
    ))
  }

  render() {
    return <RouteTabs fill>{this.renderTabs()}</RouteTabs>
  }
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
