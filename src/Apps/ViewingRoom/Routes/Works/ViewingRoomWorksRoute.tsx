import {
  Box,
  Column,
  GridColumns,
  Image,
  Join,
  ResponsiveBox,
  Shelf,
  Spacer,
  Spinner,
} from "@artsy/palette"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ViewingRoomWorksRoute_viewingRoom$data } from "__generated__/ViewingRoomWorksRoute_viewingRoom.graphql"
import { compact } from "lodash"
import * as React from "react"
import { useState } from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { ViewingRoomArtworkDetailsFragmentContainer as ViewingRoomArtworkDetails } from "./Components/ViewingRoomArtworkDetails"

const PAGE_SIZE = 20

interface WorksRouteProps {
  viewingRoom: ViewingRoomWorksRoute_viewingRoom$data
  relay: RelayPaginationProp
}

const ViewingRoomWorksRoute: React.FC<
  React.PropsWithChildren<WorksRouteProps>
> = ({ viewingRoom, relay }) => {
  const artworks = extractNodes(viewingRoom.artworksConnection)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setIsLoadingNextPage(true)

    relay.loadMore(PAGE_SIZE, error => {
      if (error) {
        console.error(error)
      }

      setIsLoadingNextPage(false)
    })
  }

  return (
    <GridColumns>
      <Column span={6} start={4}>
        <Join separator={<Spacer y={6} />}>
          {artworks.map(artwork => {
            const images = compact(artwork.images ?? [])

            return (
              <Box key={artwork.internalID} id={artwork.internalID}>
                {images.length > 1 ? (
                  <Shelf mb={2}>
                    {images.map(image => {
                      const img = image?.resized

                      if (!img) return <></>

                      return (
                        <React.Fragment key={img.src}>
                          <Media at="xs">
                            <Image
                              src={img.src}
                              srcSet={img.srcSet}
                              width={(img.width ?? 0) * 0.5}
                              height={(img.height ?? 0) * 0.5}
                              lazyLoad
                              alt=""
                              display="block"
                            />
                          </Media>

                          <Media greaterThan="xs">
                            <Image
                              src={img.src}
                              srcSet={img.srcSet}
                              width={img.width}
                              height={img.height}
                              lazyLoad
                              alt=""
                              display="block"
                            />
                          </Media>
                        </React.Fragment>
                      )
                    })}
                  </Shelf>
                ) : (
                  <ResponsiveBox
                    aspectWidth={images[0].solo?.width ?? 1}
                    aspectHeight={images[0].solo?.height ?? 1}
                    maxWidth="100%"
                    mx="auto"
                    mb={1}
                  >
                    <Image
                      src={images[0].solo?.src}
                      srcSet={images[0].solo?.srcSet}
                      width="100%"
                      height="100%"
                      lazyLoad
                      alt=""
                      style={{ display: "block" }}
                    />
                  </ResponsiveBox>
                )}

                <ViewingRoomArtworkDetails artwork={artwork} />
              </Box>
            )
          })}
        </Join>

        {relay.hasMore() && (
          <InfiniteScrollSentinel onNext={handleLoadMore} once={false} />
        )}

        {isLoadingNextPage && (
          <Box position="relative" height={300}>
            <Spinner />
          </Box>
        )}
      </Column>
    </GridColumns>
  )
}

const VIEWING_ROOM_WORKS_PAGINATION_QUERY = graphql`
  query ViewingRoomWorksRoutePaginationQuery(
    $slug: ID!
    $count: Int!
    $after: String
  ) {
    viewingRoom(id: $slug) @principalField {
      ...ViewingRoomWorksRoute_viewingRoom
        @arguments(first: $count, after: $after)
    }
  }
`

export const ViewingRoomWorksRouteFragmentContainer = createPaginationContainer(
  ViewingRoomWorksRoute,
  {
    viewingRoom: graphql`
      fragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 12 }
        after: { type: "String" }
      ) {
        slug
        artworksConnection(first: $first, after: $after)
          @connection(key: "ViewingRoomWorksRoute_artworksConnection") {
          edges {
            node {
              internalID
              title
              images {
                internalID
                solo: resized(width: 600, version: "normalized") {
                  src
                  srcSet
                  width
                  height
                }
                resized(height: 550, version: "normalized") {
                  src
                  srcSet
                  width
                  height
                }
              }
              ...ViewingRoomArtworkDetails_artwork
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewingRoom?.artworksConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        slug: props.viewingRoom.slug,
        count,
        after: cursor,
      }
    },
    query: VIEWING_ROOM_WORKS_PAGINATION_QUERY,
  },
)
