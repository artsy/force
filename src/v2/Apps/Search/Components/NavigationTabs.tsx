import { Text } from "@artsy/palette"
import { NavigationTabs_searchableConnection } from "v2/__generated__/NavigationTabs_searchableConnection.graphql"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { SystemContextProps, withSystemContext } from "v2/System"

export interface Props extends SystemContextProps {
  searchableConnection: NavigationTabs_searchableConnection
  term: string
  artworkCount: number
}

const MORE_TABS = ["tag", "city", "feature", "page"]

const TAB_NAME_MAP = {
  PartnerGallery: "Galleries",
  PartnerInstitution: "Institutions",
  PartnerInstitutionalSeller: "Institutions",
  article: "Articles",
  artist: "Artists",
  artist_series: "Artist Series",
  fair: "Fairs",
  gene: "Categories",
  marketing_collection: "Collections",
  partner_show: "Shows",
  sale: "Auctions",
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
      <RouteTab
        to={to}
        exact={exact}
        onClick={event => {
          event.preventDefault()
          // @ts-expect-error STRICT_NULL_CHECK
          this.props.router.push(to)
          this.trackClick(tabName, to)
        }}
        key={to}
      >
        {text}
        {count != null && (
          <Text variant="text" display="inline">
            &nbsp;({count})
          </Text>
        )}
      </RouteTab>
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
      <RouteTabs key={`tab-carousel-${this.props.term}`}>
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
