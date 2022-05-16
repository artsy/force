import * as React from "react"
import {
  BoxProps,
  Flex,
  Pill,
  Sup,
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperRail,
  SwiperRailProps,
  Text,
} from "@artsy/palette"
import { NavigationTabs_searchableConnection } from "v2/__generated__/NavigationTabs_searchableConnection.graphql"
import { useAnalyticsContext, useTracking } from "v2/System/Analytics"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "v2/System/Router/RouterLink"
import { useIsRouteActive } from "v2/System/Router/useRouter"
import { Media } from "v2/Utils/Responsive"
import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
  PageOwnerType,
} from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

export interface NavigationTabsProps {
  searchableConnection: NavigationTabs_searchableConnection
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

interface RouteTabProps extends BoxProps, RouterLinkProps {
  text: string
  count?: number
}

const RoundedRouteTab: React.FC<RouteTabProps> = ({ text, count, ...rest }) => {
  const isActive = useIsRouteActive(rest.to, { exact: rest.exact ?? true })

  return (
    // @ts-ignore
    <Pill variant="filter" as={RouterLink} my={0.5} mr={1} {...rest}>
      <Flex alignItems="center">
        <Text variant={["xs", "sm-display"]}>{text}&nbsp;</Text>
        <Media greaterThan="xs">
          {count && (
            <Sup variant="xs" color={isActive ? "brand" : "inherit"}>
              {count}
            </Sup>
          )}
        </Media>
      </Flex>
    </Pill>
  )
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  term,
  artworkCount,
  searchableConnection,
}) => {
  const tracking = useTracking()
  const router = useRouter()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

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

  const route = (tab: string) =>
    `/search${tab.replace(/\s/g, "_")}?term=${term}`

  const renderTab = (
    text: string,
    to: string,
    options: {
      exact?: boolean
      count?: number
    } = {}
  ) => {
    const { exact, count } = options
    const tabName = text.replace(/[0-9]/g, "").trim()

    return (
      <RoundedRouteTab
        to={to}
        text={tabName}
        key={tabName}
        exact={exact}
        count={count}
        onClick={event => {
          event.preventDefault()
          router.router.push(to)
          trackClick(tabName, to)
        }}
      />
    )
  }

  const tabs: JSX.Element[] = []

  artworkCount > 0 &&
    tabs.push(
      renderTab("Artworks", route(""), {
        count: artworkCount,
        exact: true,
      })
    )

  Object.entries(tabCountMap(searchableConnection)).map(
    ([key, value]: [string, number]) => {
      tabs.push(
        renderTab(key, route(`/${key.toLowerCase()}`), {
          count: value,
        })
      )
    }
  )

  const restAggregationCount = MORE_TABS.reduce((prev, key) => {
    const tabAggregation = aggregationFor(searchableConnection, key)?.count ?? 0

    return tabAggregation ? (prev += tabAggregation) : prev
  }, 0)

  restAggregationCount > 0 &&
    tabs.push(
      renderTab("More", route("/more"), {
        count: restAggregationCount,
      })
    )

  return (
    <Swiper Cell={Cell} Rail={Rail}>
      {tabs}
    </Swiper>
  )
}

const Cell: React.ForwardRefExoticComponent<SwiperCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        verticalAlign="top"
        pr={0}
      />
    )
  }
)

const Rail: React.FC<SwiperRailProps> = props => {
  return (
    <AppContainer>
      <HorizontalPadding>
        <SwiperRail {...props} />
      </HorizontalPadding>
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
  searchableConnection: NavigationTabs_searchableConnection
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
  searchableConnection: NavigationTabs_searchableConnection,
  type: string
) => {
  const { aggregations } = searchableConnection

  const typeAggregation = aggregations?.find(agg => agg?.slice === "TYPE")
    ?.counts

  return typeAggregation?.find(agg => agg?.name === type)
}
