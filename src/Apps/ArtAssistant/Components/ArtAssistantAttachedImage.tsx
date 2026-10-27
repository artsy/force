import PhotographIcon from "@artsy/icons/PhotographIcon"
import { Flex, Image } from "@artsy/palette"
import type { ArtAssistantImage } from "Apps/ArtAssistant/types"
import type { FC } from "react"

const SIZE = 120

interface ArtAssistantAttachedImageProps {
  image: ArtAssistantImage
}

export const ArtAssistantAttachedImage: FC<ArtAssistantAttachedImageProps> = ({
  image,
}) => {
  if (!image.thumbnailURL) {
    return (
      <Flex
        width={SIZE}
        height={SIZE}
        bg="mono5"
        borderRadius={10}
        alignItems="center"
        justifyContent="center"
        role="img"
        aria-label="Attached image"
      >
        <PhotographIcon width={32} height={32} fill="mono60" aria-hidden />
      </Flex>
    )
  }
  return (
    <Image
      src={image.thumbnailURL}
      alt="Attached image"
      width={SIZE}
      height={SIZE}
      style={{ objectFit: "cover", borderRadius: 10 }}
    />
  )
}
