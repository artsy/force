import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtQuizResultsRecommendedArtworks_me$data } from "__generated__/ArtQuizResultsRecommendedArtworks_me.graphql"
import { ArtQuizResultsRecommendedArtworksQuery } from "__generated__/ArtQuizResultsRecommendedArtworksQuery.graphql"
import { Masonry } from "Components/Masonry"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Message, Spacer } from "@artsy/palette"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { useStableShuffle } from "Utils/Hooks/useStableShuffle"

interface ArtQuizResultsRecommendedArtworksProps {
  me: ArtQuizResultsRecommendedArtworks_me$data
}

const ArtQuizResultsRecommendedArtworks: FC<ArtQuizResultsRecommendedArtworksProps> = ({
  me,
}) => {
  const artworks = useStableShuffle({ items: [...me.quiz.recommendedArtworks] })

  if (artworks.shuffled.length === 0) {
    return (
      <Message>We don't have any recommendations for you at this time.</Message>
    )
  }

  return (
    <Masonry columnCount={[2, 3, 4]}>
      {artworks.shuffled.map(artwork => {
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
          recommendedArtworks {
            internalID
            ...GridItem_artwork
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
