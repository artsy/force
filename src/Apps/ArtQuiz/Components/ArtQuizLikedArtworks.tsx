import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtQuizLikedArtworks_me$data } from "__generated__/ArtQuizLikedArtworks_me.graphql"
import { ArtQuizLikedArtworksQuery } from "__generated__/ArtQuizLikedArtworksQuery.graphql"
import { Masonry } from "Components/Masonry"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Spacer } from "@artsy/palette"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"

interface ArtQuizLikedArtworksProps {
  me: ArtQuizLikedArtworks_me$data
}

const ArtQuizLikedArtworks: FC<ArtQuizLikedArtworksProps> = ({ me }) => {
  return (
    <Masonry columnCount={[2, 3, 4]}>
      {me.quiz.savedArtworks.map(artwork => {
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

const ArtQuizLikedArtworksFragmentContainer = createFragmentContainer(
  ArtQuizLikedArtworks,
  {
    me: graphql`
      fragment ArtQuizLikedArtworks_me on Me {
        quiz {
          savedArtworks {
            ...GridItem_artwork
            internalID
          }
        }
      }
    `,
  }
)

const ArtQuizLikedArtworksPlaceholder: FC = () => {
  return <ArtworkGridPlaceholder columnCount={[2, 3, 4]} amount={6} />
}

export const ArtQuizLikedArtworksQueryRenderer = () => {
  return (
    <SystemQueryRenderer<ArtQuizLikedArtworksQuery>
      placeholder={<ArtQuizLikedArtworksPlaceholder />}
      query={graphql`
        query ArtQuizLikedArtworksQuery {
          me {
            ...ArtQuizLikedArtworks_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <ArtQuizLikedArtworksPlaceholder />
        }

        return <ArtQuizLikedArtworksFragmentContainer me={props.me} />
      }}
    />
  )
}
