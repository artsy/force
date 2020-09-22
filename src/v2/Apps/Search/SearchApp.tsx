import { Box, Col, Row, Separator, Spacer, Text } from "@artsy/palette"
import { SearchApp_viewer } from "v2/__generated__/SearchApp_viewer.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Search/Components/NavigationTabs"
import { SearchMeta } from "v2/Apps/Search/Components/SearchMeta"
import { withSystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"

import { Footer } from "v2/Components/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"

import { RouterState, withRouter } from "found"
import React, { useCallback, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import { get } from "v2/Utils/get"
import { ZeroState } from "./Components/ZeroState"

export interface Props extends RouterState {
  viewer: SearchApp_viewer
  tracking: TrackingProp
}

const TotalResults: React.SFC<{ count: number; term: string }> = ({
  count,
  term,
}) => {
  const formatResults = useCallback(
    () =>
      `${count.toLocaleString()} result${
        count > 1 ? "s" : ""
      } for \u201C${term}\u201D`,
    [count, term]
  )

  const [results, setResults] = useState(formatResults())

  useEffect(() => {
    setResults(formatResults())
  }, [count, formatResults])

  return <Text variant="subtitle">{results}</Text>
}

@track({
  context_page: Schema.PageName.SearchPage,
})
export class SearchApp extends React.Component<Props> {
  renderResults(count: number, artworkCount: number) {
    const {
      viewer,
      match: { location },
    } = this.props
    const { searchConnection } = viewer
    const {
      query: { term },
    } = location

    return (
      <>
        <Spacer mb={4} />
        <Row>
          <Col>
            <TotalResults count={count} term={term} />
            <Spacer mb={4} />
            <span id="jumpto--searchResultTabs" />
            <NavigationTabs
              artworkCount={artworkCount}
              term={term}
              searchableConnection={searchConnection}
            />
            <Box minHeight="30vh">{this.props.children}</Box>
          </Col>
        </Row>

        {this.renderFooter()}
      </>
    )
  }

  renderFooter() {
    return (
      <>
        <Row>
          <Col>
            <RecentlyViewed />
          </Col>
        </Row>

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </>
    )
  }

  render() {
    const {
      viewer,
      match: { location },
    } = this.props
    const { searchConnection, artworksConnection } = viewer
    const { query } = location
    const { term } = query

    const { aggregations } = searchConnection
    const artworkCount = get(artworksConnection, f => f.counts.total, 0)

    let countWithoutArtworks: number = 0
    const typeAggregation = aggregations.find(agg => agg.slice === "TYPE")
      .counts

    typeAggregation.forEach(({ count, name }) => {
      if (name !== "artwork") {
        countWithoutArtworks += count
      }
    })

    const hasResults = !!(countWithoutArtworks || artworkCount)

    return (
      <AppContainer>
        <HorizontalPadding>
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <SearchMeta term={term} />
          {hasResults ? (
            this.renderResults(
              countWithoutArtworks + artworkCount,
              artworkCount
            )
          ) : (
            <Box mt={3}>
              <ZeroState term={term} />
              {this.renderFooter()}
            </Box>
          )}
          <Spacer mb={3} />
        </HorizontalPadding>
      </AppContainer>
    )
  }
}

export const SearchAppFragmentContainer = createFragmentContainer(
  withSystemContext(withRouter(SearchApp)),
  {
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
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default SearchAppFragmentContainer
