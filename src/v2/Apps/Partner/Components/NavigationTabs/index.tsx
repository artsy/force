import { breakpoints, DROP_SHADOW } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { FullBleed } from "v2/Components/FullBleed"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { StickyContainer } from "v2/Components/StickyContainer"
import { NavigationTabs_partner } from "v2/__generated__/NavigationTabs_partner.graphql"

// TODO: Update value in component heigth changed
export const PARTHER_NAV_BAR_HEIGHT = 78

interface NavigationTabsProps {
  partner: NavigationTabs_partner
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ partner }) => {
  const renderTabs = () => {
    const { slug, locations, articles, profile, artists } = partner

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
        exact: false,
        hidden: !(
          profile.displayArtistsSection &&
          artists &&
          artists.totalCount
        ),
      },
      {
        name: "Articles",
        href: route("/articles"),
        exact: true,
        hidden: !articles || !articles.totalCount,
      },
      {
        name: "Contact",
        href: route("/contact"),
        exact: true,
        hidden: !locations || !locations.totalCount,
      },
    ]

    return routes
      .filter(route => !route.hidden)
      .map(route => (
        <RouteTab to={route.href} exact={route.exact} key={route.href}>
          {route.name}
        </RouteTab>
      ))
  }

  return (
    <StickyContainer>
      {({ stuck }) => {
        return (
          <FullBleed
            py={2}
            style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
          >
            <HorizontalPadding maxWidth={breakpoints.xl}>
              <RouteTabs fill>{renderTabs()}</RouteTabs>
            </HorizontalPadding>
          </FullBleed>
        )
      }}
    </StickyContainer>
  )
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  {
    partner: graphql`
      fragment NavigationTabs_partner on Partner {
        slug
        profile {
          displayArtistsSection
        }
        locations: locationsConnection(first: 20) {
          totalCount
        }
        articles: articlesConnection(first: 20) {
          totalCount
        }
        artists: artistsConnection(first: 20) {
          totalCount
        }
      }
    `,
  }
)
