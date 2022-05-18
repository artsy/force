import { Box, Button, Spacer } from "@artsy/palette"
import React, { FC, Fragment } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGridItemFragmentContainer from "v2/Components/Artwork/GridItem"
import { Masonry } from "v2/Components/Masonry"
import { extractNodes } from "v2/Utils/extractNodes"
import { NewForYouArtworksGrid_viewer } from "v2/__generated__/NewForYouArtworksGrid_viewer.graphql"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer
  relay: RelayPaginationProp
}

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
  relay,
}) => {
  const [loading, setLoading] = React.useState(false)
  const artworks = extractNodes(viewer.artworksForUser)

  const loadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(25, err => {
      if (err) console.error(err)

      setTimeout(() => {
        setLoading(false)
      }, 2500)
    })
  }

  return (
    <>
      <Masonry columnCount={[2, 3, 4]}>
        {artworks?.length > 0 &&
          artworks.map(artwork => {
            return (
              <Fragment key={artwork.internalID}>
                <ArtworkGridItemFragmentContainer artwork={artwork} />
                <Spacer mt={4} />
              </Fragment>
            )
          })}
      </Masonry>
      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={loadMore} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

export const NewForYouArtworksGridFragmentContainer = createPaginationContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
        ) {
        artworksForUser(first: $count, after: $cursor)
          @connection(key: "NewForYouArtworksGrid_artworksForUser") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              internalID
              ...GridItem_artwork
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query NewForYouArtworksGridQuery($count: Int!, $cursor: String) {
        viewer {
          ...NewForYouArtworksGrid_viewer
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
