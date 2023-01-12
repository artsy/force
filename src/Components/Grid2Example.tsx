import { graphql } from "react-relay"

import { Spacer } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Grid2 } from "Components/Grid2"
import { Fragment } from "react"
import { RootQueryRenderer } from "System/Relay/RootQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { Grid2ExampleQuery } from "__generated__/Grid2ExampleQuery.graphql"

export function Grid2Example(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer<Grid2ExampleQuery>
      query={graphql`
        query Grid2ExampleQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworksConnection(first: 10) {
              edges {
                node {
                  internalID
                  image {
                    aspectRatio
                  }
                  ...GridItem_artwork
                }
              }
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        if (!readyState.props) return null

        const artworks = extractNodes(readyState.props.artist?.artworks) as any

        const handleLoadMore = () => {
          console.log("Load more")
        }

        return (
          <Grid2
            data={artworks}
            renderItem={artwork => {
              return (
                <Fragment key={artwork.internalID}>
                  <ArtworkGridItemFragmentContainer artwork={artwork} />

                  <Spacer y={4} />
                </Fragment>
              )
            }}
            onLoadMore={handleLoadMore}
          />
        )
      }}
    />
  )
}
