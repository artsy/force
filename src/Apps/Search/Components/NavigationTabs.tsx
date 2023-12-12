import * as React from "react"
import { HorizontalOverflow, Pill } from "@artsy/palette"
import { NavigationTabs_searchableConnection$data } from "__generated__/NavigationTabs_searchableConnection.graphql"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useIsRouteActive } from "System/Router/useRouter"
import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
  PageOwnerType,
} from "@artsy/cohesion"
import { useRouter } from "System/Router/useRouter"
import { AppContainer } from "Apps/Components/AppContainer"
import { useTracking } from "react-tracking"

export interface NavigationTabsProps {
  searchableConnection: NavigationTabs_searchableConnection$data
  term: string
  artworkCount: number
}

const MORE_TABS = ["tag", "city", "feature", "page"]

const TAB_NAME_MAP = {
  artist: "Artists",
  article: "Articles",
  sale: "Auctions",
  artist_series: "Artist Series",
  marketing_collection: "Collections",
  fair: "Fairs",
  partner_show: "Shows",
  PartnerInstitution: "Institutions",
  PartnerInstitutionalSeller: "Institutions",
  PartnerGallery: "Galleries",
  gene: "Categories",
}

interface TabProps {
  text: string
  to: string
  exact?: boolean
  count?: number
}

const Tab: React.FC<TabProps> = ({ text, to, exact, count }) => {
  const router = useRouter()
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const tabName = text.replace(/[0-9]/g, "").trim()
  const isSelected = useIsRouteActive(to, { exact: exact ?? true })

  const trackClick = (destinationPath: string, subject: string) => () => {
    const trackingData: ClickedNavigationTab = {
      action: ActionType.clickedNavigationTab,
      destination_path: destinationPath,
      context_module: "SearchResults" as ContextModule,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      subject,
    }

    tracking.trackEvent(trackingData)
  }

  return (
    // @ts-ignore
    <Pill
      variant="search"
      count={count}
      as={RouterLink}
      my={1}
      mr={1}
      selected={isSelected}
      key={tabName}
      onClick={event => {
        event.preventDefault()
        router.router.push(to)
        trackClick(tabName, to)
      }}
    >
      {text}
    </Pill>
  )
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  term,
  artworkCount,
  searchableConnection,
}) => {
  const route = (tab: string) => {
    const encodedTerm = encodeURIComponent(term)
    const formattedTab = tab.replace(/\s/g, "_")

    return `/search${formattedTab}?term=${encodedTerm}`
  }

  const restAggregationCount = MORE_TABS.reduce((prev, key) => {
    const tabAggregation = aggregationFor(searchableConnection, key)?.count ?? 0

    return tabAggregation ? (prev += tabAggregation) : prev
  }, 0)

  return (
    <AppContainer>
      <HorizontalOverflow pl={[2, 4]}>
        {artworkCount > 0 ?? (
          <Tab text="Artworks" to={route("")} exact count={artworkCount} />
        )}

        {Object.entries(tabCountMap(searchableConnection)).map(
          ([key, value]: [string, number]) => {
            return (
              <Tab
                key={`pill-${key}`}
                text={key}
                to={route(`/${key.toLowerCase()}`)}
                count={value}
              />
            )
          }
        )}

        {restAggregationCount > 0 && (
          <Tab text="More" to={route("/more")} count={restAggregationCount} />
        )}
      </HorizontalOverflow>
    </AppContainer>
  )
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  {
    searchableConnection: graphql`
      fragment NavigationTabs_searchableConnection on SearchableConnection {
        aggregations {
          slice
          counts {
            count
            name
          }
        }
      }
    `,
  }
)

export interface TabCounts {
  Artists?: number
  Collections?: number
  Galleries?: number
  Shows?: number
  Fairs?: number
  Institutions?: number
  Categories?: number
  Articles?: number
  Auctions?: number
  "Artist Series"?: number
}

export const tabCountMap: (
  searchableConnection: NavigationTabs_searchableConnection$data
) => TabCounts = props => {
  return Object.entries(TAB_NAME_MAP).reduce((acc, [key, val]) => {
    let count = aggregationFor(props, key)?.count ?? 0
    if (!count) {
      return acc
    }
    if (acc[val]) {
      count += acc[val]
    }
    return {
      ...acc,
      [val]: count,
    }
  }, {})
}

const aggregationFor = (
  searchableConnection: NavigationTabs_searchableConnection$data,
  type: string
) => {
  const { aggregations } = searchableConnection

  const typeAggregation = aggregations?.find(agg => agg?.slice === "TYPE")
    ?.counts

  return typeAggregation?.find(agg => agg?.name === type)
}
