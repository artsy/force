import React from "react"
import { Box, Spacer, Text } from "@artsy/palette"
import { SearchApp_viewer } from "v2/__generated__/SearchApp_viewer.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "v2/Apps/Search/Components/SearchMeta"
import { RecentlyViewed } from "v2/Components/RecentlyViewed"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { ZeroState } from "./Components/ZeroState"
import { useRouter } from "v2/System/Router/useRouter"

export interface SearchAppProps {
  viewer: SearchApp_viewer
}

const TotalResults: React.FC<{ count: number; term: string }> = ({
  count,
  term,
}) => {
  return (
    <>
      <Text variant={["lg", "xl"]} display="inline">
        {count.toLocaleString()} result{count > 1 ? "s" : ""} for&nbsp;
      </Text>
      <Text variant={["lg", "xl"]} color="blue100" display="inline">
        “{term}”
      </Text>
    </>
  )
}

export const SearchApp: React.FC<SearchAppProps> = ({ viewer, children }) => {
  const {
    match: { location },
  } = useRouter()
  const { searchConnection, artworksConnection } = viewer
  const {
    query: { term },
  } = location
  const { aggregations } = searchConnection!

  const typeAggregation = aggregations?.find(agg => agg?.slice === "TYPE")
    ?.counts

  const artworkCount = get(artworksConnection, f => f?.counts?.total, 0) ?? 0
  const countWithoutArtworks =
    typeAggregation?.reduce((total = 0, aggregation) => {
      if (!aggregation) {
        return total
      }
      const { count, name } = aggregation
      if (name !== "artwork") {
        return total + count
      }
    }, 0) ?? 0

  const hasResults = !!(countWithoutArtworks || artworkCount)
  const totalCount = countWithoutArtworks + artworkCount

  return (
    <>
      <SearchMeta term={term} />
      <Spacer mb={4} />
      {hasResults ? (
        <>
          <TotalResults count={totalCount} term={term} />
          <Spacer mb={4} />
          <NavigationTabs
            artworkCount={artworkCount}
            term={term}
            searchableConnection={searchConnection}
          />
          <Box minHeight="30vh">{children}</Box>
        </>
      ) : (
        <ZeroState term={term} />
      )}
      <Spacer mb={4} />
      <RecentlyViewed />
    </>
  )
}

export const SearchAppFragmentContainer = createFragmentContainer(SearchApp, {
  viewer: graphql`
    fragment SearchApp_viewer on Viewer
      @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
      searchConnection(query: $term, first: 1, aggregations: [TYPE]) {
        aggregations {
          slice
          counts {
            count
            name
          }
        }
        ...NavigationTabs_searchableConnection
        edges {
          node {
            ... on SearchableItem {
              slug
              displayLabel
              displayType
            }
          }
        }
      }
      artworksConnection(keyword: $term, size: 0, aggregations: [TOTAL]) {
        counts {
          total
        }
      }
    }
  `,
})
