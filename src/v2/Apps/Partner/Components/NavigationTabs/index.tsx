import { breakpoints, DROP_SHADOW, FullBleed } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { Sticky } from "v2/Components/Sticky"
import { ScrollIntoView } from "v2/Utils"
import { Media } from "v2/Utils/Responsive"
import { NavigationTabs_partner } from "v2/__generated__/NavigationTabs_partner.graphql"

// TODO: Update value in component height changed
export const PARTNER_NAV_BAR_HEIGHT = 78

interface NavigationTabsProps {
  partner: NavigationTabs_partner
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ partner }) => {
  const renderTabs = (scrollOffset: number) => {
    const {
      slug,
      locations,
      articles,
      counts,
      displayWorksSection,
      displayArtistsSection,
      representedArtists,
      notRepresentedArtists,
    } = partner

    const route = (path?: string) => `/partner/${slug}${path ? path : ""}`

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
        hidden: !counts?.currentDisplayableShows,
      },
      {
        name: "Works",
        href: route("/works"),
        exact: true,
        hidden: !displayWorksSection || !counts?.eligibleArtworks,
      },
      {
        name: "Artists",
        href: route("/artists"),
        exact: false,
        hidden: !(
          displayArtistsSection &&
          ((representedArtists && representedArtists.totalCount) ||
            (notRepresentedArtists && notRepresentedArtists.totalCount))
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
        <ScrollIntoView
          key={route.href}
          selector="#jumpto--PartnerHeader"
          offset={scrollOffset}
        >
          <RouteTab to={route.href} exact={route.exact}>
            {route.name}
          </RouteTab>
        </ScrollIntoView>
      ))
  }

  return (
    <Sticky>
      {({ stuck }) => {
        return (
          <FullBleed
            py={2}
            style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
          >
            <HorizontalPadding maxWidth={breakpoints.xl}>
              <Media greaterThan="xs">
                <RouteTabs fill>{renderTabs(NAV_BAR_HEIGHT)}</RouteTabs>
              </Media>
              <Media at="xs">
                <RouteTabs fill>{renderTabs(MOBILE_NAV_HEIGHT)}</RouteTabs>
              </Media>
            </HorizontalPadding>
          </FullBleed>
        )
      }}
    </Sticky>
  )
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  {
    partner: graphql`
      fragment NavigationTabs_partner on Partner {
        slug
        displayArtistsSection
        displayWorksSection
        counts {
          eligibleArtworks
          currentDisplayableShows
        }
        locations: locationsConnection(first: 20) {
          totalCount
        }
        articles: articlesConnection {
          totalCount
        }
        representedArtists: artistsConnection(
          representedBy: true
          displayOnPartnerProfile: true
        ) {
          totalCount
        }
        notRepresentedArtists: artistsConnection(
          representedBy: false
          hasPublishedArtworks: true
          displayOnPartnerProfile: true
        ) {
          totalCount
        }
      }
    `,
  }
)
