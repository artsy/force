import { Box, EntityHeader, Separator, Spacer, Spinner } from "@artsy/palette"
import { WorksForYouFeed_viewer } from "v2/__generated__/WorksForYouFeed_viewer.graphql"
import { SystemContextProps } from "v2/System"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { Component } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { get } from "v2/Utils/get"

import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"

interface Props extends SystemContextProps {
  relay: RelayPaginationProp
  user?: User
  viewer: WorksForYouFeed_viewer
}

interface State {
  loading: boolean
  interval: any
}

const PageSize = 10
const RefreshInterval = 150 // ms

export class WorksForYouFeed extends Component<Props, State> {
  state = {
    loading: false,
    interval: null,
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.maybeLoadMore()
    }, RefreshInterval)

    this.setState({
      interval,
    })
  }

  componentWillUnmount() {
    if (this.state.interval) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      clearInterval(this.state.interval)
    }
  }

  maybeLoadMore() {
    const threshold = window.innerHeight + window.scrollY
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const el = ReactDOM.findDOMNode(this).parentElement as Element
    if (threshold >= el.clientHeight + el.scrollTop) {
      this.loadMoreArtworks()
    }
  }

  loadMoreArtworks() {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const hasMore = this.props.viewer.me.followsAndSaves.notifications.pageInfo
      .hasNextPage

    if (!hasMore && this.state.interval) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      clearInterval(this.state.interval)
    }
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
    return (
      <>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        {this.props.viewer.me.followsAndSaves.notifications.edges.map(
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ({ node }, index) => {
            const avatarImageUrl = get(node, p => p.image.resized.url)
            const meta = `${node.summary}, ${node.published_at}`
            const worksForSaleHref = node.href + "/works-for-sale"

            return (
              <Box key={index}>
                <EntityHeader
                  name={node.artists}
                  meta={meta}
                  imageUrl={avatarImageUrl}
                  href={worksForSaleHref}
                />

                <Spacer mb={3} />

                <ArtworkGrid
                  artworks={node.artworksConnection}
                  columnCount={3}
                  itemMargin={40}
                  user={this.props.user}
                />

                <Box mt={4} mb={3}>
                  <Separator />
                </Box>
              </Box>
            )
          }
        )}

        <SpinnerContainer>
          {this.state.loading ? <Spinner /> : ""}
        </SpinnerContainer>
      </>
    )
  }
}

export const WorksForYouFeedPaginationContainer = createPaginationContainer(
  WorksForYouFeed,
  {
    viewer: graphql`
      fragment WorksForYouFeed_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          forSale: { type: "Boolean", defaultValue: true }
        ) {
        me {
          followsAndSaves {
            notifications: bundledArtworksByArtistConnection(
              sort: PUBLISHED_AT_DESC
              first: $count
              after: $cursor
              forSale: $forSale
            ) @connection(key: "WorksForYou_notifications") {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  href
                  summary
                  artists
                  published_at: publishedAt(format: "MMM DD")
                  artworksConnection {
                    ...ArtworkGrid_artworks
                  }
                  image {
                    resized(height: 80, width: 80) {
                      url
                    }
                  }
                }
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
      return props.viewer.me.followsAndSaves.notifications
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
      query WorksForYouFeedPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...WorksForYouFeed_viewer @arguments(count: $count, cursor: $cursor)
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
