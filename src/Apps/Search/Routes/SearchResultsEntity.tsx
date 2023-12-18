import * as React from "react"
import { Box, Separator } from "@artsy/palette"
import { SearchResultsEntity_viewer$data } from "__generated__/SearchResultsEntity_viewer.graphql"
import { GenericSearchResultItem } from "Apps/Search/Components/GenericSearchResultItem"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { RouterState, withRouter } from "found"
import qs from "qs"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"

export interface Props extends RouterState {
  viewer: SearchResultsEntity_viewer$data
  relay: RelayRefetchProp
  entities: string[]
}

interface State {
  page: number
  isLoading: boolean
}

const PAGE_SIZE = 10

export class SearchResultsEntityRoute extends React.Component<Props, State> {
  state = {
    isLoading: false,
    page: 1,
  }

  constructor(props) {
    super(props)
    const {
      match: { location },
    } = this.props
    const { page } = location.query

    this.state = { isLoading: false, page: (page && parseInt(page, 10)) || 1 }
  }

  toggleLoading = (isLoading: boolean) => {
    this.setState({ isLoading })
  }

  loadNext = () => {
    const { viewer } = this.props
    const { searchConnection } = viewer

    const {
      pageInfo: { hasNextPage, endCursor },
    } = searchConnection!

    if (hasNextPage) {
      this.loadAfter(endCursor!, this.state.page + 1)
    }
  }

  loadAfter = (cursor: string, page: number) => {
    this.toggleLoading(true)
    const {
      match: { location },
    } = this.props
    const { query } = location
    const { term } = query

    this.props.relay.refetch(
      {
        after: cursor,
        before: null,
        first: PAGE_SIZE,
        last: null,
        page: null,
        term: String(term),
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

        const { term } = location.query
        const urlParams = qs.stringify({
          page,
          term,
        })
        // TODO: use silentPush from useRouter if this class component is
        // converted to a function component
        window.history.pushState({}, "", `${location.pathname}?${urlParams}`)
      }
    )
  }

  renderItems() {
    const {
      viewer,
      match: { location },
    } = this.props
    const { term } = location.query
    const { searchConnection } = viewer

    const items = (viewer.searchConnection?.edges ?? []).map(e => e?.node)

    return (
      <>
        {items.map((searchableItem, index) => {
          const {
            displayLabel: name,
            description,
            href,
            imageUrl,
            displayType: entityType,
            internalID,
          } = searchableItem || {}

          if (!name || !href || !entityType || !internalID) {
            return null
          }

          return (
            <Box key={index}>
              <GenericSearchResultItem
                name={name}
                description={description ?? ""}
                href={href}
                imageUrl={imageUrl ?? ""}
                entityType={entityType}
                index={index}
                term={term}
                id={internalID}
              />
              {index < items.length - 1 && <Separator />}
            </Box>
          )
        })}

        {searchConnection && (
          <Pagination
            pageCursors={searchConnection.pageCursors}
            onClick={this.loadAfter}
            onNext={this.loadNext}
            scrollTo="searchResultTabs"
            hasNextPage={searchConnection.pageInfo.hasNextPage}
          />
        )}
      </>
    )
  }

  render() {
    const {
      viewer,
      match: { location },
    } = this.props

    const { term } = location.query
    const items = (viewer.searchConnection?.edges ?? []).map(e => e?.node)
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
