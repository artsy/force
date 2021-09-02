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
    page: 1,
  }

  constructor(props) {
    super(props)

    const page = this.getQueryParam("page")
    this.state = { isLoading: false, page: (page && parseInt(page, 10)) || 1 }
  }

  toggleLoading = (isLoading): void => {
    this.setState(
      {
        isLoading,
      },
      () => window.scrollTo(0, 0)
    )
  }

  loadNext = (): void => {
    const { viewer } = this.props
    const { searchConnection } = viewer

    const {
      pageInfo: { hasNextPage },
    } = searchConnection!

    if (hasNextPage) {
      this.loadPage(this.state.page + 1)
    }
  }

  getQueryParam = (paramName: string): string => {
    const {
      match: { location },
    } = this.props
    const param = get(location, l => l.query)?.[paramName]
    return param ?? ""
  }

  getArtists = () => {
    const { viewer } = this.props
    const artists = get(viewer, v => v?.searchConnection?.edges, [])?.map(
      e => e!.node
    )
    return artists
  }

  loadPage = (page: number): void => {
    this.toggleLoading(true)

    const term = this.getQueryParam("term")

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        page,
        term,
      },
      null,
      error => {
        this.toggleLoading(false)
        this.setState({ page })
        if (error) {
          console.error(error)
        }

        const urlParams = qs.stringify({
          page,
          term,
        })
        // TODO: Look into using router push w/ query params.
        // this.props.router.replace(`/search/artists?${urlParams}`)
        // @ts-expect-error STRICT_NULL_CHECK
        window.history.pushState({}, null, `/search/artists?${urlParams}`)
      }
    )
  }

  renderArtists() {
    const { viewer } = this.props
    const { searchConnection } = viewer
    const term = this.getQueryParam("term")
    const artists = this.getArtists()

    return (
      <>
        {artists?.map((artist, index) => {
          const worksForSaleHref = artist!.href + "/works-for-sale"
          return (
            <Box key={index}>
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              <GenericSearchResultItem
                name={artist!.name}
                description={artist!.bio}
                imageUrl={artist!.imageUrl}
                entityType="Artist"
                href={worksForSaleHref}
                index={index}
                term={term}
                id={artist!.internalID}
              />
              {index < artists.length - 1 && <Separator />}
            </Box>
          )
        })}
        <Pagination
          pageCursors={searchConnection!.pageCursors}
          onClick={(_cursor, page) => this.loadPage(page)}
          onNext={this.loadNext}
          scrollTo="#jumpto--searchResultTabs"
          hasNextPage={searchConnection!.pageInfo.hasNextPage}
        />
      </>
    )
  }

  render() {
    const artists = this.getArtists()
    const term = this.getQueryParam("term")

    return (
      <LoadingArea isLoading={this.state.isLoading}>
        {artists!.length === 0 ? (
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
          page: { type: "Int" }
        ) {
        searchConnection(
          query: $term
          first: $first
          page: $page
          entities: [ARTIST]
        ) @principalField {
          pageInfo {
            hasNextPage
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
    query SearchResultsArtistsQuery($first: Int, $term: String!, $page: Int) {
      viewer {
        ...SearchResultsArtists_viewer
          @arguments(first: $first, term: $term, page: $page)
      }
    }
  `
)
