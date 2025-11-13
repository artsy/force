import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { Masonry } from "Components/Masonry"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Spacer } from "@artsy/palette"
import type { ArtQuizLikedArtworks_me$data } from "__generated__/ArtQuizLikedArtworks_me.graphql"
import type { ArtQuizLikedArtworksQuery } from "__generated__/ArtQuizLikedArtworksQuery.graphql"
import { type FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizLikedArtworksProps {
  me: ArtQuizLikedArtworks_me$data
}

const ArtQuizLikedArtworks: FC<
  React.PropsWithChildren<ArtQuizLikedArtworksProps>
> = ({ me }) => {
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

const ArtQuizLikedArtworksPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
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
