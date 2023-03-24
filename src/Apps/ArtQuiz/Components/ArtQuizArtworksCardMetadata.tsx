import { Box, BoxProps, Text } from "@artsy/palette"
import { compact } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  getContrastTIQ,
  hexToRgba,
  stringifyRgba,
  adjustAlpha,
} from "Utils/color"
import { ArtQuizArtworksCardMetadata_artwork$data } from "__generated__/ArtQuizArtworksCardMetadata_artwork.graphql"

interface ArtQuizArtworksCardMetadataProps extends BoxProps {
  artwork: ArtQuizArtworksCardMetadata_artwork$data
}

const ArtQuizArtworksCardMetadata: FC<ArtQuizArtworksCardMetadataProps> = ({
  artwork,
  ...rest
}) => {
  const backgroundRgba = hexToRgba(artwork.dominantColors[0] ?? "#ffffff")
  const foregroundRgba = getContrastTIQ(backgroundRgba)
  const textShadowRgba = adjustAlpha(getContrastTIQ(foregroundRgba), 0.5)

  const foregroundColor = stringifyRgba(foregroundRgba)
  const textShadowColor = stringifyRgba(textShadowRgba)
  const gradientColorStart = stringifyRgba(adjustAlpha(textShadowRgba, 0))
  const gradientColorEnd = stringifyRgba(adjustAlpha(textShadowRgba, 0.1))

  const caption = `${compact([
    compact((artwork.artists ?? []).map(artist => artist?.name)).join(", "),
    artwork.culturalMaker,
    artwork.title,
    artwork.partner?.name,
    artwork.date,
  ]).join(", ")}.`

  return (
    <Box
      width="100%"
      px={2}
      pb={1}
      pt={6}
      background={`linear-gradient(${gradientColorStart} 0%, ${gradientColorEnd} 100%);`}
      {...rest}
    >
      <Text
        variant="xs"
        color={foregroundColor}
        style={{ textShadow: `0 0 3px ${textShadowColor}` }}
      >
        {caption}
      </Text>
    </Box>
  )
}

export const ArtQuizArtworksCardMetadataFragmentContainer = createFragmentContainer(
  ArtQuizArtworksCardMetadata,
  {
    artwork: graphql`
      fragment ArtQuizArtworksCardMetadata_artwork on Artwork {
        title
        date
        dominantColors
        culturalMaker
        artists(shallow: true) {
          name
        }
        partner(shallow: true) {
          name
        }
      }
    `,
  }
)
