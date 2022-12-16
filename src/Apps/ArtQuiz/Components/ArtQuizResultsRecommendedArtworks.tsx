import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtQuizResultsRecommendedArtworks_me$data } from "__generated__/ArtQuizResultsRecommendedArtworks_me.graphql"
import { ArtQuizResultsRecommendedArtworksQuery } from "__generated__/ArtQuizResultsRecommendedArtworksQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Masonry } from "Components/Masonry"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Spacer } from "@artsy/palette"
import { shuffle, uniqBy } from "lodash"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid"

interface ArtQuizResultsRecommendedArtworksProps {
  me: ArtQuizResultsRecommendedArtworks_me$data
}

const ArtQuizResultsRecommendedArtworks: FC<ArtQuizResultsRecommendedArtworksProps> = ({
  me,
}) => {
  const artworks = shuffle(
    uniqBy(
      me.quiz.savedArtworks.flatMap(artwork => {
        if (!artwork.layer) return []

        return extractNodes(artwork.layer.artworksConnection)
      }),
      "internalID"
    )
  )

  return (
    <Masonry columnCount={[2, 3, 4]}>
      {artworks.map(artwork => {
        return (
          <Fragment key={artwork.internalID}>
            <ArtworkGridItemFragmentContainer artwork={artwork} />

            <Spacer y={4} />
          </Fragment>
        )
      })}
    </Masonry>
  )
}

export const ArtQuizResultsRecommendedArtworksFragmentContainer = createFragmentContainer(
  ArtQuizResultsRecommendedArtworks,
  {
    me: graphql`
      fragment ArtQuizResultsRecommendedArtworks_me on Me {
        quiz {
          savedArtworks {
            layer(id: "main") {
              artworksConnection {
                edges {
                  node {
                    ...GridItem_artwork
                    internalID
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)

const ArtQuizResultsRecommendedArtworksPlaceholder: FC = () => {
  return <ArtworkGridPlaceholder columnCount={[2, 3, 4]} amount={16} />
}

export const ArtQuizResultsRecommendedArtworksQueryRenderer: FC = () => {
  return (
    <SystemQueryRenderer<ArtQuizResultsRecommendedArtworksQuery>
      query={graphql`
        query ArtQuizResultsRecommendedArtworksQuery {
          me {
            ...ArtQuizResultsRecommendedArtworks_me
          }
        }
      `}
      placeholder={<ArtQuizResultsRecommendedArtworksPlaceholder />}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <ArtQuizResultsRecommendedArtworksPlaceholder />
        }

        return (
          <ArtQuizResultsRecommendedArtworksFragmentContainer me={props.me} />
        )
      }}
    />
  )
}
