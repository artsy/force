import { graphql } from "react-relay"

import { Spacer } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Grid } from "Components/Grid"
import { Fragment } from "react"
import { RootQueryRenderer } from "System/Relay/RootQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { GridExampleQuery } from "__generated__/GridExampleQuery.graphql"

export function GridExample(props: { artistID: string; columnCount?: number }) {
  return (
    <RootQueryRenderer<GridExampleQuery>
      query={graphql`
        query GridExampleQuery($artistID: String!) {
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
          <Grid
            aspectRatios={artworks.map(artwork => artwork.image?.aspectRatio)}
            onLoadMore={handleLoadMore}
          >
            {artworks.map(artwork => {
              return (
                <Fragment key={artwork.internalID}>
                  <ArtworkGridItemFragmentContainer artwork={artwork} />

                  <Spacer y={4} />
                </Fragment>
              )
            })}
          </Grid>
        )
      }}
    />
  )
}
