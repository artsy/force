import { ArtQuizCard, Mode } from "Apps/ArtQuiz/Components/ArtQuizCard"
import { FullscreenBox } from "Components/FullscreenBox"
import { FC } from "react"
import { Image } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizArtworksCard_artwork$data } from "__generated__/ArtQuizArtworksCard_artwork.graphql"

interface ArtQuizArtworksCardProps {
  mode: Mode
  artwork: ArtQuizArtworksCard_artwork$data
}

const ArtQuizArtworksCard: FC<ArtQuizArtworksCardProps> = ({
  mode,
  artwork,
}) => {
  const image = artwork?.image?.resized

  if (!image) return null

  return (
    <ArtQuizCard
      mode={mode}
      display="flex"
      flexDirection="column"
      position="absolute"
      width="100%"
      height="100%"
    >
      <FullscreenBox
        aspectWidth={image.width ?? 1}
        aspectHeight={image.height ?? 1}
        bg="black10"
      >
        <Image
          width="100%"
          height="100%"
          src={image.src}
          srcSet={image.srcSet}
          lazyLoad
        />
      </FullscreenBox>
    </ArtQuizCard>
  )
}

export const ArtQuizArtworksCardFragmentContainer = createFragmentContainer(
  ArtQuizArtworksCard,
  {
    artwork: graphql`
      fragment ArtQuizArtworksCard_artwork on Artwork {
        image {
          resized(
            width: 900
            height: 900
            version: ["normalized", "larger", "large"]
          ) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)
