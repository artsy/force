import { EntityHeader, Spacer, Spinner } from "@artsy/palette"
import { WorksForYouArtistFeed_viewer } from "v2/__generated__/WorksForYouArtistFeed_viewer.graphql"
import { SystemContextProps } from "v2/System"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { Component } from "react"
import styled from "styled-components"
import { get } from "v2/Utils/get"

import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"

interface Props extends SystemContextProps {
  relay: RelayPaginationProp
  viewer: WorksForYouArtistFeed_viewer
  artistID: string
  forSale?: boolean
}

interface State {
  loading: boolean
}

const PageSize = 10

export class WorksForYouArtistFeed extends Component<Props, State> {
  state = {
    loading: false,
  }

  loadMoreArtworks() {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const hasMore = this.props.viewer.artist.artworks_connection.pageInfo
      .hasNextPage

    if (hasMore && !this.state.loading) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          if (error) {
            console.error(error)
          }

          this.setState({ loading: false })
        })
      })
    }
  }

  render() {
    const {
      forSale,
      viewer: { artist },
    } = this.props

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const avatarImageUrl = get(artist, p => p.image.resized.url)
    const meta =
      (forSale
        ? // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          get(artist, p => p.counts.for_sale_artworks.toLocaleString(), "")
        : // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          get(artist, p => p.counts.artworks.toLocaleString(), "")) + " Works"
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const worksForSaleHref = artist.href + "/works-for-sale"

    return (
      <>
        <EntityHeader
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          name={artist.name}
          meta={meta}
          imageUrl={avatarImageUrl}
          href={worksForSaleHref}
        />

        <Spacer mb={3} />

        <ArtworkGrid
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          artworks={artist.artworks_connection}
          columnCount={3}
          itemMargin={40}
          onLoadMore={() => this.loadMoreArtworks()}
          user={this.props.user}
        />

        {this.state.loading && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}
      </>
    )
  }
}

export const WorksForYouArtistFeedPaginationContainer = createPaginationContainer(
  WorksForYouArtistFeed,
  {
    viewer: graphql`
      fragment WorksForYouArtistFeed_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          artistID: { type: "String!", defaultValue: "" }
          filter: {
            type: "[ArtistArtworksFilters]"
            defaultValue: [IS_FOR_SALE]
          }
        ) {
        artist(id: $artistID) {
          name
          href
          counts {
            artworks
            for_sale_artworks: forSaleArtworks
          }
          image {
            resized(height: 80, width: 80) {
              url
            }
          }
          artworks_connection: artworksConnection(
            sort: PUBLISHED_AT_DESC
            first: $count
            after: $cursor
            filter: $filter
          ) @connection(key: "WorksForYouArtistFeed_artworks_connection") {
            pageInfo {
              hasNextPage
              endCursor
            }
            ...ArtworkGrid_artworks
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      return props.viewer.artist.artworks_connection
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query WorksForYouArtistFeedPaginationQuery(
        $artistID: String!
        $count: Int!
        $cursor: String
        $filter: [ArtistArtworksFilters]
      ) {
        viewer {
          ...WorksForYouArtistFeed_viewer
            @arguments(
              artistID: $artistID
              count: $count
              cursor: $cursor
              filter: $filter
            )
        }
      }
    `,
  }
)

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
