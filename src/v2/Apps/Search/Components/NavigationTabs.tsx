import React from "react"
import { BoxProps, Text } from "@artsy/palette"
import { NavigationTabs_searchableConnection } from "v2/__generated__/NavigationTabs_searchableConnection.graphql"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { SystemContextProps, withSystemContext } from "v2/System"
import { RouterLinkProps } from "v2/System/Router/RouterLink"
import { useIsRouteActive } from "v2/System/Router/useRouter"
import { Media } from "v2/Utils/Responsive"

export interface Props extends SystemContextProps {
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
    <RouteTab
      height="auto"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="20px / 50%"
      borderColor={isActive ? "black60" : "black10"}
      px={[1, 2]}
      py={[0.5, 1]}
      mr={1}
      {...rest}
    >
      <Text variant="md" color={isActive ? "black100" : "black60"}>
        {text}
      </Text>
      <Media greaterThan="xs">
        {count && (
          <Text
            variant="xs"
            color={isActive ? "blue100" : "black60"}
            display="inline"
          >
            {count}
          </Text>
        )}
      </Media>
    </RouteTab>
  )
}

@track({
  context_module: Schema.ContextModule.NavigationTabs,
})
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    destination_path,
    subject: tab,
  }))
  trackClick(tab: string, destination_path: string) {
    // noop
  }

  shouldComponentUpdate = prevProps => {
    return this.props.term !== prevProps.term
  }

  renderTab = (
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
        exact={exact}
        onClick={event => {
          event.preventDefault()
          // @ts-expect-error STRICT_NULL_CHECK
          this.props.router.push(to)
          this.trackClick(tabName, to)
        }}
        key={to}
        text={tabName}
        count={count}
      />
    )
  }

  tabs() {
    const { term, artworkCount } = this.props

    const route = tab =>
      `/search${tab.replace(/\s/g, "_")}?term=${encodeURIComponent(term)}`

    let restAggregationCount: number = 0
    MORE_TABS.forEach(
      key =>
        // @ts-expect-error STRICT_NULL_CHECK
        (restAggregationCount += get(
          aggregationFor(this.props, key),
          // @ts-expect-error STRICT_NULL_CHECK
          agg => agg.count,
          0
        ))
    )

    const tabs = []

    !!artworkCount &&
      tabs.push(
        // @ts-expect-error STRICT_NULL_CHECK
        this.renderTab("Artworks", route(""), {
          count: artworkCount,
          exact: true,
        })
      )

    Object.entries(tabCountMap(this.props)).map(
      ([key, value]: [string, number]) => {
        tabs.push(
          // @ts-expect-error STRICT_NULL_CHECK
          this.renderTab(key, route(`/${key.toLowerCase()}`), {
            count: value,
          })
        )
      }
    )

    !!restAggregationCount &&
      tabs.push(
        // @ts-expect-error STRICT_NULL_CHECK
        this.renderTab("More", route("/more"), {
          count: restAggregationCount,
        })
      )

    return tabs
  }

  render() {
    return (
      <RouteTabs pb={4} key={`tab-carousel-${this.props.term}`}>
        {this.tabs()}
      </RouteTabs>
    )
  }
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  withSystemContext(NavigationTabs),
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

export const tabCountMap: (props: Props) => TabCounts = props => {
  return Object.entries(TAB_NAME_MAP).reduce((acc, [key, val]) => {
    // @ts-expect-error STRICT_NULL_CHECK
    let count = get(aggregationFor(props, key), agg => agg.count, 0)
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

const aggregationFor = (props: Props, type: string) => {
  const { searchableConnection } = props
  const { aggregations } = searchableConnection

  // @ts-expect-error STRICT_NULL_CHECK
  const typeAggregation = aggregations.find(agg => agg.slice === "TYPE").counts

  // @ts-expect-error STRICT_NULL_CHECK
  return typeAggregation.find(agg => agg.name === type)
}
