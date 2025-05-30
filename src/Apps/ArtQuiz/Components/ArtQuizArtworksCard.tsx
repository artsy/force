import { Image } from "@artsy/palette"
import { ArtQuizArtworksCardMetadataFragmentContainer } from "Apps/ArtQuiz/Components/ArtQuizArtworksCardMetadata"
import { ArtQuizCard, type Mode } from "Apps/ArtQuiz/Components/ArtQuizCard"
import { FullscreenBox } from "Components/FullscreenBox"
import type { ArtQuizArtworksCard_artwork$data } from "__generated__/ArtQuizArtworksCard_artwork.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizArtworksCardProps {
  mode: Mode
  artwork: ArtQuizArtworksCard_artwork$data
}

const ArtQuizArtworksCard: FC<
  React.PropsWithChildren<ArtQuizArtworksCardProps>
> = ({ mode, artwork }) => {
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
        bg="mono10"
        position="relative"
      >
        <Image
          width="100%"
          height="100%"
          src={image.src}
          srcSet={image.srcSet}
          lazyLoad
        />

        <ArtQuizArtworksCardMetadataFragmentContainer
          artwork={artwork}
          position="absolute"
          bottom={0}
          left={0}
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
        ...ArtQuizArtworksCardMetadata_artwork
        image {
          resized(
            width: 900
            height: 900
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  },
)
