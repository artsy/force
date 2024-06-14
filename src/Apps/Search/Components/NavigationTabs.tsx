import { Pill, Stack } from "@artsy/palette"
import { NavigationTabs_searchableConnection$data } from "__generated__/NavigationTabs_searchableConnection.graphql"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { useIsRouteActive } from "System/Hooks/useRouter"
import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { FC, useMemo } from "react"
import { compact } from "lodash"

export interface NavigationTabsProps {
  searchableConnection: NavigationTabs_searchableConnection$data
  term: string
  /** TODO: Leave comment explaining why we accept an explicit count for this instead of using the count from the aggregation */
  artworkCount: number
}

/**
 * Keyed by aggregation 'name' value, with the exception of "more" which is
 * a special case.
 */
const TABS = {
  article: {
    label: "Articles",
    path: "/articles",
    name: "article",
  },
  artist_series: {
    label: "Artist Series",
    path: "/artist_series",
    name: "artist_series",
  },
  artist: {
    label: "Artists",
    path: "/artists",
    name: "artist",
  },
  artwork: {
    label: "Artworks",
    path: "",
    name: "artwork",
  },
  fair: {
    label: "Fairs",
    path: "/fairs",
    name: "fair",
  },
  gene: {
    label: "Categories",
    path: "/categories",
    name: "gene",
  },
  marketing_collection: {
    label: "Collections",
    path: "/collections",
    name: "marketing_collection",
  },
  partner_show: {
    label: "Shows",
    path: "/shows",
    name: "partner_show",
  },
  PartnerGallery: {
    label: "Galleries",
    path: "/galleries",
    name: "PartnerGallery",
  },
  PartnerInstitution: {
    label: "Institutions",
    path: "/institutions",
    name: "PartnerInstitution",
  },
  sale: {
    label: "Auctions",
    path: "/auctions",
    name: "sale",
  },
  more: {
    label: "More",
    path: "/more",
    name: "more",
  },
} as const

const MORE_TABS = ["tag", "city", "feature", "page"] as const

const TAB_ORDER: Tab[] = [
  "artist",
  "article",
  "sale",
  "artist_series",
  "marketing_collection",
  "fair",
  "partner_show",
  "PartnerInstitution",
  "PartnerGallery",
  "gene",
]

const isTab = (key: string): key is keyof typeof TABS => {
  return key in TABS
}

type Tab = keyof typeof TABS

interface NavigationTabProps {
  term: string
  tab: Tab
  count: number
}

const NavigationTab: FC<NavigationTabProps> = ({ count, term, tab: _tab }) => {
  const tab = TABS[_tab]
  const to = `/search${tab.path}?term=${encodeURIComponent(term)}`
  const selected = useIsRouteActive(to)

  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  return (
    <Pill
      variant="search"
      count={count}
      selected={selected}
      as={RouterLink}
      onClick={() => {
        const trackingData: ClickedNavigationTab = {
          action: ActionType.clickedNavigationTab,
          destination_path: to,
          context_module: "SearchResults" as ContextModule,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          context_page_owner_type: contextPageOwnerType,
          subject: tab.label,
        }

        trackEvent(trackingData)
      }}
      // @ts-ignore
      to={to}
    >
      {tab.label}
    </Pill>
  )
}

export const NavigationTabs: FC<NavigationTabsProps> = ({
  term,
  artworkCount,
  searchableConnection,
}) => {
  const counts = useMemo(() => {
    return compact(
      searchableConnection.aggregations?.find(agg => agg?.slice === "TYPE")
        ?.counts
    )
  }, [searchableConnection.aggregations])

  const tabs = useMemo(() => {
    return compact(
      TAB_ORDER.map(tab => {
        return counts.find(count => count.name === tab && count.count > 0)
      })
    )
  }, [counts])

  const moreCount = useMemo(
    () =>
      MORE_TABS.reduce((prev, key) => {
        const count = counts.find(count => count.name === key)?.count ?? 0
        return count ? (prev += count) : prev
      }, 0),
    [counts]
  )

  return (
    <Stack flexDirection="row" gap={1} mr={2}>
      {artworkCount > 0 && (
        <NavigationTab count={artworkCount} tab="artwork" term={term} />
      )}

      {tabs.map(({ name: key, count }) => {
        if (key === "artwork" || !isTab(key)) return null
        return <NavigationTab key={key} tab={key} count={count} term={term} />
      })}

      {moreCount > 0 && (
        <NavigationTab count={moreCount} tab="more" term={term} />
      )}
    </Stack>
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
