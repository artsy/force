import { Spacer } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { EmptyState } from "Components/EmptyState"
import { Masonry } from "Components/Masonry"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useStableShuffle } from "Utils/Hooks/useStableShuffle"
import type { ArtQuizResultsRecommendedArtworksQuery } from "__generated__/ArtQuizResultsRecommendedArtworksQuery.graphql"
import type { ArtQuizResultsRecommendedArtworks_me$data } from "__generated__/ArtQuizResultsRecommendedArtworks_me.graphql"
import { type FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizResultsRecommendedArtworksProps {
  me: ArtQuizResultsRecommendedArtworks_me$data
}

const ArtQuizResultsRecommendedArtworks: FC<
  React.PropsWithChildren<ArtQuizResultsRecommendedArtworksProps>
> = ({ me }) => {
  const artworks = useStableShuffle({ items: [...me.quiz.recommendedArtworks] })

  if (artworks.shuffled.length === 0) {
    return (
      <EmptyState title="We don't have any recommendations for you at this time." />
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

export const ArtQuizResultsRecommendedArtworksFragmentContainer =
  createFragmentContainer(ArtQuizResultsRecommendedArtworks, {
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
  })

const ArtQuizResultsRecommendedArtworksPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <ArtworkGridPlaceholder columnCount={[2, 3, 4]} amount={16} />
}

export const ArtQuizResultsRecommendedArtworksQueryRenderer: FC<
  React.PropsWithChildren<unknown>
> = () => {
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
