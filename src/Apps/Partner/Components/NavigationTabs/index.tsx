import { FullBleed, useTheme } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { Sticky } from "Components/Sticky"
import { NavigationTabs_partner$data } from "__generated__/NavigationTabs_partner.graphql"
import { useJump } from "Utils/Hooks/useJump"

interface NavigationTabsProps {
  partner: NavigationTabs_partner$data
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ partner }) => {
  const {
    slug,
    locations,
    articles,
    counts,
    partnerType,
    displayWorksSection,
    displayArtistsSection,
    representedArtists,
    notRepresentedArtists,
    viewingRooms,
  } = partner

  const { theme } = useTheme()

  const route = (path?: string) => `/partner/${slug}${path ? path : ""}`

  const routes = [
    {
      name: "Overview",
      href: route(),
      exact: true,
    },
    {
      name: "Events",
      href: route("/shows"),
      exact: true,
      hidden: !counts?.displayableShows,
    },
    {
      name: "Viewing Rooms",
      href: route("/viewing-rooms"),
      exact: true,
      hidden: !viewingRooms || !viewingRooms?.totalCount,
    },
    {
      name: partnerType === "Brand" ? "Shop" : "Works",
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

  const { jumpTo } = useJump()

  const handleClick = () => {
    jumpTo("PartnerHeader")
  }

  const tabs = routes
    .filter(route => !route.hidden)
    .map(route => (
      <RouteTab
        to={route.href}
        exact={route.exact}
        onClick={handleClick}
        key={route.name}
      >
        {route.name}
      </RouteTab>
    ))

  return (
    <Sticky>
      {({ stuck }) => {
        return (
          <FullBleed
            py={2}
            backgroundColor="white100"
            style={stuck ? { boxShadow: theme.effects.dropShadow } : undefined}
          >
            <HorizontalPadding>
              <RouteTabs fill>{tabs}</RouteTabs>
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
        partnerType
        displayArtistsSection
        displayWorksSection
        counts {
          eligibleArtworks
          displayableShows
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
        viewingRooms: viewingRoomsConnection(
          statuses: [live, closed, scheduled]
        ) {
          totalCount
        }
      }
    `,
  }
)
