import React, { useMemo } from "react"
import { Box, DROP_SHADOW, FullBleed, Spacer, Text } from "@artsy/palette"
import { SearchApp_viewer } from "v2/__generated__/SearchApp_viewer.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "v2/Apps/Search/Components/SearchMeta"
import { RecentlyViewed } from "v2/Components/RecentlyViewed"
import { createFragmentContainer, graphql } from "react-relay"
import { ZeroState } from "./Components/ZeroState"
import { useRouter } from "v2/System/Router/useRouter"
import { Sticky, StickyProvider } from "v2/Components/Sticky"
import { AppContainer } from "../Components/AppContainer"

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
        {count.toLocaleString()} result{count > 1 ? "s" : ""} for
      </Text>
      <Text variant={["lg", "xl"]} color="blue100" display="inline">
        {` \u201C${term}\u201D`}
      </Text>
    </>
  )
}

export const SearchApp: React.FC<SearchAppProps> = ({ viewer, children }) => {
  const {
    match: { location },
  } = useRouter()
  const { searchConnection, artworksConnection } = viewer
  const { query } = location
  const { aggregations } = searchConnection!

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const term = useMemo(() => query.term ?? "", [])
  const typeAggregation = aggregations?.find(agg => agg?.slice === "TYPE")
    ?.counts

  const artworkCount = artworksConnection?.counts?.total ?? 0
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
    <StickyProvider>
      <SearchMeta term={term} />
      <Spacer mb={4} />
      {hasResults ? (
        <>
          <TotalResults count={totalCount} term={term} />
          <Spacer mb={4} />
          <Sticky>
            {({ stuck }) => {
              return (
                <FullBleed
                  backgroundColor="white100"
                  style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
                >
                  <AppContainer>
                    <NavigationTabs
                      artworkCount={artworkCount}
                      term={term}
                      searchableConnection={searchConnection!}
                    />
                  </AppContainer>
                </FullBleed>
              )
            }}
          </Sticky>
          <Spacer mb={4} />
          <Box minHeight="30vh">{children}</Box>
        </>
      ) : (
        <ZeroState term={term} />
      )}
      <Spacer mb={4} />
      <RecentlyViewed />
    </StickyProvider>
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
