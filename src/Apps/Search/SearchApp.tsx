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
import { Sticky } from "Components/Sticky"
import { AppContainer } from "Apps/Components/AppContainer"
import { useTranslation } from "react-i18next"
import { Jump } from "Utils/Hooks/useJump"

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
      <Text variant={["lg-display", "xl"]}>
        {t(`searchApp.resultsCount`, { count: count })}

        <Box as="span" color="blue100">
          {" "}
          “{term}”
        </Box>
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
    <>
      <SearchMeta term={term} />

      <Spacer y={4} />

      {hasResults ? (
        <>
          <TotalResults count={totalCount} term={term} />

          <Spacer y={4} />

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
