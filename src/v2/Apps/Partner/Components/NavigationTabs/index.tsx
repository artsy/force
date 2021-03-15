import React from "react"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"

interface NavigationTabsProps {
  partnerId: string
}

export class NavigationTabs extends React.Component<NavigationTabsProps> {
  renderTabs = () => {
    const { partnerId } = this.props
    const route = (path?: string) =>
      `/novo/partner/${partnerId}${path ? path : ""}`

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
