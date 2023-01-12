import { graphql } from "react-relay"

import { Spacer } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Masonry2 } from "Components/Masonry2"
import { Fragment } from "react"
import { RootQueryRenderer } from "System/Relay/RootQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { Masonry2ExampleQuery } from "__generated__/Masonry2ExampleQuery.graphql"

export function Masonry2Example(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer<Masonry2ExampleQuery>
      query={graphql`
        query Masonry2ExampleQuery($artistID: String!) {
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
          <Masonry2
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
          </Masonry2>
        )
      }}
    />
  )
}
