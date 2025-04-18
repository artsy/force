import {
  Box,
  FullBleed,
  HorizontalOverflow,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "Apps/Search/Components/SearchMeta"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { Sticky } from "Components/Sticky"
import { useRouter } from "System/Hooks/useRouter"
import type { SearchApp_viewer$data } from "__generated__/SearchApp_viewer.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ZeroState } from "./Components/ZeroState"

import { Jump } from "Utils/Hooks/useJump"

export interface SearchAppProps {
  viewer: SearchApp_viewer$data
}

const TotalResults: React.FC<
  React.PropsWithChildren<{ count: number; term: string }>
> = ({ count, term }) => {
  return (
    <>
      <Text variant={["lg-display", "xl"]}>
        {count === 1 ? "1 result for" : `${count} results for`}

        <Box as="span" color="blue100">
          {" "}
          “{term}”
        </Box>
      </Text>
    </>
  )
}

export const SearchApp: React.FC<React.PropsWithChildren<SearchAppProps>> = ({
  viewer,
  children,
}) => {
  const {
    match: { location },
  } = useRouter()
  const { searchConnection, artworksConnection } = viewer
  const { query } = location
  const { aggregations } = searchConnection ?? {}

  const term = query.term
  const typeAggregation = aggregations?.find(
    agg => agg?.slice === "TYPE",
  )?.counts

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
    <>
      <SearchMeta term={term} />

      <Spacer y={4} />

      {hasResults ? (
        <>
          <TotalResults count={totalCount} term={term} />

          <Spacer y={4} />

          {searchConnection && (
            <>
              {/* Negative offset for positive sticky padding */}
              <Spacer y={-1} />

              <Sticky bottomBoundary="#Sticky__SearchApp">
                <FullBleed backgroundColor="mono0" pt={1}>
                  <AppContainer>
                    <HorizontalOverflow pl={[2, 4]}>
                      <NavigationTabs
                        artworkCount={artworkCount}
                        term={term}
                        searchableConnection={searchConnection}
                      />
                    </HorizontalOverflow>
                  </AppContainer>
                </FullBleed>
              </Sticky>
            </>
          )}

          <Spacer y={4} />

          <Jump id="searchResultTabs" />

          <Box minHeight="30vh">{children}</Box>
        </>
      ) : (
        <>
          <ZeroState term={term} />

          <Separator mt={4} />
        </>
      )}

      <Spacer y={4} />

      <div id="Sticky__SearchApp" />

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
