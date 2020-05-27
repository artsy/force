import { Box, Separator } from "@artsy/palette"
import { SearchResultsArtists_viewer } from "v2/__generated__/SearchResultsArtists_viewer.graphql"
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
  viewer: SearchResultsArtists_viewer
  relay: RelayRefetchProp
}

interface State extends LoadingAreaState {
  page: number
}

const PAGE_SIZE = 10

export class SearchResultsArtistsRoute extends React.Component<Props, State> {
  state: State = {
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
        } = this.props
        const { term } = get(location, l => l.query)
        const urlParams = qs.stringify({
          term,
          page,
        })
        // TODO: Look into using router push w/ query params.
        // this.props.router.replace(`/search/artists?${urlParams}`)
        window.history.pushState({}, null, `/search/artists?${urlParams}`)
      }
    )
  }

  renderArtists() {
    const {
      viewer,
      match: { location },
    } = this.props
    const { term } = get(location, l => l.query)
    const { searchConnection } = viewer

    const artists = get(viewer, v => v.searchConnection.edges, []).map(
      e => e.node
    )

    return (
      <>
        {artists.map((artist, index) => {
          const worksForSaleHref = artist.href + "/works-for-sale"
          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={artist.name}
                description={artist.bio}
                imageUrl={artist.imageUrl}
                entityType="Artist"
                href={worksForSaleHref}
                index={index}
                term={term}
                id={artist.internalID}
              />
              {index < artists.length - 1 && <Separator />}
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

    const artists = get(viewer, v => v.searchConnection.edges, []).map(
      e => e.node
    )
    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {artists.length === 0 ? (
          <Box mt={3}>
            <ZeroState term={term} />
          </Box>
        ) : (
          this.renderArtists()
        )}
      </LoadingArea>
    )
  }
}

export const SearchResultsArtistsRouteFragmentContainer = createRefetchContainer(
  withRouter(SearchResultsArtistsRoute) as React.ComponentType<Props>,
  {
    viewer: graphql`
      fragment SearchResultsArtists_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          page: { type: "Int" }
        ) {
        searchConnection(
          query: $term
          first: $first
          after: $after
          before: $before
          last: $last
          page: $page
          entities: [ARTIST]
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
              ... on Artist {
                name
                internalID
                href
                imageUrl
                bio
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsArtistsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $term: String!
      $page: Int
    ) {
      viewer {
        ...SearchResultsArtists_viewer
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            term: $term
            page: $page
          )
      }
    }
  `
)

// Top-level route needs to be exported for bundle splitting in the router
export default SearchResultsArtistsRouteFragmentContainer
