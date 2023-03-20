import { Box, Image } from "@artsy/palette"

const PREVIEW_IMAGE_SIZE = 50

interface SuggestionItemPreviewProps {
  imageUrl?: string
  label: string
}

export const SuggestionItemPreview = ({
  imageUrl,
  label,
}: SuggestionItemPreviewProps) => {
  const isArtistLabel = label === "Artist"
  const borderRadius = isArtistLabel ? 50 : 0

  if (imageUrl) {
    return (
      <Image
        lazyLoad
        width={PREVIEW_IMAGE_SIZE}
        height={PREVIEW_IMAGE_SIZE}
        src={imageUrl}
        borderRadius={borderRadius}
      />
    )
  }

  return (
    <Box
      width={PREVIEW_IMAGE_SIZE}
      height={PREVIEW_IMAGE_SIZE}
      bg="black5"
      borderRadius={borderRadius}
    />
  )
}
