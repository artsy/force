import { Box, Separator } from "@artsy/palette"
import { SearchResultsEntity_viewer } from "v2/__generated__/SearchResultsEntity_viewer.graphql"
import { GenericSearchResultItem } from "v2/Apps/Search/Components/GenericSearchResultItem"
import { ZeroState } from "v2/Apps/Search/Components/ZeroState"
import { LoadingArea, LoadingAreaState } from "v2/Components/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { RouterState, withRouter } from "found"
import qs from "qs"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

export interface Props extends RouterState {
  viewer: SearchResultsEntity_viewer
  relay: RelayRefetchProp
  entities: string[]
  tab: string
}

interface State extends LoadingAreaState {
  page: number
}

const PAGE_SIZE = 10

export class SearchResultsEntityRoute extends React.Component<Props, State> {
  state = {
    isLoading: false,
    page: null,
  }

  constructor(props) {
    super(props)
    const {
      match: { location },
    } = this.props
    const { page } = get(location, l => l.query)

    this.state = { isLoading: false, page: (page && parseInt(page, 10)) || 1 }
  }

  toggleLoading = isLoading => {
    this.setState(
      {
        isLoading,
      },
      () => window.scrollTo(0, 0)
    )
  }

  loadNext = () => {
    const { viewer } = this.props
    const { searchConnection } = viewer

    const {
      pageInfo: { hasNextPage, endCursor },
    } = searchConnection

    if (hasNextPage) {
      this.loadAfter(endCursor, this.state.page + 1)
    }
  }

  loadAfter = (cursor: string, page: number) => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        before: null,
        last: null,
        page: null,
      },
      null,
      error => {
        this.toggleLoading(false)
        this.setState({ page })
        if (error) {
          console.error(error)
        }

        const {
          match: { location },
          tab,
        } = this.props
        const { term } = get(location, l => l.query)
        const urlParams = qs.stringify({
          term,
          page,
        })
        // TODO: Look into using router push w/ query params.
        // this.props.router.replace(`/search/${tab}?${urlParams}`)
        window.history.pushState({}, null, `/search/${tab}?${urlParams}`)
      }
    )
  }

  renderItems() {
    const {
      viewer,
      match: { location },
    } = this.props
    const { term } = get(location, l => l.query)
    const { searchConnection } = viewer

    const items = get(viewer, v => v.searchConnection.edges, []).map(
      e => e.node
    )

    return (
      <>
        {items.map((searchableItem, index) => {
          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={searchableItem.displayLabel}
                description={searchableItem.description}
                href={searchableItem.href}
                imageUrl={searchableItem.imageUrl}
                entityType={searchableItem.displayType}
                index={index}
                term={term}
                id={searchableItem.internalID}
              />
              {index < items.length - 1 && <Separator />}
            </Box>
          )
        })}
        <Pagination
          pageCursors={searchConnection.pageCursors}
          onClick={this.loadAfter}
          onNext={this.loadNext}
          scrollTo="#jumpto--searchResultTabs"
          hasNextPage={searchConnection.pageInfo.hasNextPage}
        />
      </>
    )
  }

  render() {
    const {
      viewer,
      match: { location },
    } = this.props

    const { term } = get(location, l => l.query)

    const items = get(viewer, v => v.searchConnection.edges, []).map(
      e => e.node
    )
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {items.length === 0 ? (
          <Box mt={3}>
            <ZeroState term={term} />
          </Box>
        ) : (
          this.renderItems()
        )}
      </LoadingArea>
    )
  }
}

export const SearchResultsEntityRouteFragmentContainer = createRefetchContainer(
  withRouter(SearchResultsEntityRoute) as React.ComponentType<Props>,
  {
    viewer: graphql`
      fragment SearchResultsEntity_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          page: { type: "Int" }
          entities: { type: "[SearchEntity]" }
        ) {
        searchConnection(
          query: $term
          first: $first
          after: $after
          before: $before
          last: $last
          page: $page
          entities: $entities
        ) @principalField {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              ... on SearchableItem {
                description
                displayLabel
                href
                internalID
                imageUrl
                displayType
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsEntityQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
      $page: Int
      $entities: [SearchEntity]
    ) {
      viewer {
        ...SearchResultsEntity_viewer
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            term: $term
            page: $page
            entities: $entities
          )
      }
    }
  `
)

// Top-level route needs to be exported for bundle splitting in the router
export default SearchResultsEntityRouteFragmentContainer
