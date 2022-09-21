import React, { useMemo } from "react"
import {
  Box,
  DROP_SHADOW,
  FullBleed,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { SearchApp_viewer$data } from "__generated__/SearchApp_viewer.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "Apps/Search/Components/SearchMeta"
import { RecentlyViewed } from "Components/RecentlyViewed"
import { createFragmentContainer, graphql } from "react-relay"
import { ZeroState } from "./Components/ZeroState"
import { useRouter } from "System/Router/useRouter"
import { Sticky, StickyProvider } from "Components/Sticky"
import { AppContainer } from "../Components/AppContainer"
import { useTranslation } from "react-i18next"

export interface SearchAppProps {
  viewer: SearchApp_viewer$data
}

const TotalResults: React.FC<{ count: number; term: string }> = ({
  count,
  term,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Text variant={["lg-display", "xl"]} display="inline">
        {t(`searchApp.resultsCount`, { count: count })}
      </Text>
      <Text variant={["lg-display", "xl"]} color="blue100" display="inline">
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

      <Spacer mt={4} />

      {hasResults ? (
        <>
          <TotalResults count={totalCount} term={term} />

          <Spacer mt={4} />

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
                      // @ts-ignore RELAY UPGRADE 13
                      searchableConnection={searchConnection!}
                    />
                  </AppContainer>
                </FullBleed>
              )
            }}
          </Sticky>

          <Spacer mt={4} />

          <Box minHeight="30vh">{children}</Box>
        </>
      ) : (
        <>
          <ZeroState term={term} />

          <Separator mt={4} />
        </>
      )}

      <Spacer mt={4} />

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
