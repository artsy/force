import { Box, Flex, Image, NoArtworkIcon } from "@artsy/palette"
import { prepareImageURLs } from "Apps/CollectorProfile/Routes/Saves2/Utils/prepareImageURLs"
import { FC } from "react"
import { cropped } from "Utils/resized"

interface StackedImageLayoutProps {
  imageURLs: (string | null)[]
}

interface StackImageProps {
  url: string | null
  index: number
}

const LARGE_IMAGE_SIZE = 190
const SMALL_IMAGE_SIZE = 112
const LARGE_IMAGE_OFFSET = 4
const SMALL_IMAGE_OFFSET = 2

export const StackedImageLayout: FC<StackedImageLayoutProps> = ({
  imageURLs,
}) => {
  const preparedImageURLs = prepareImageURLs(imageURLs)
  const reversedImageURLs = preparedImageURLs.reverse()

  return (
    <Box position="relative">
      {reversedImageURLs.map((imageURL, index) => (
        <StackImage
          key={`stacked-image-${index}`}
          url={imageURL}
          index={index}
        />
      ))}
    </Box>
  )
}

const StackImage: FC<StackImageProps> = ({ url, index }) => {
  const SIZE = [SMALL_IMAGE_SIZE, LARGE_IMAGE_SIZE]
  const OFFSET_BY_INDEX = [
    `${SMALL_IMAGE_OFFSET * index}px`,
    `${LARGE_IMAGE_OFFSET * index}px`,
  ]

  if (url === null) {
    return (
      <Flex
        width={SIZE}
        height={SIZE}
        bg="black5"
        position="absolute"
        top={OFFSET_BY_INDEX}
        left={OFFSET_BY_INDEX}
        border="1px solid"
        borderColor="black15"
        aria-label="Image placeholder"
        justifyContent="center"
        alignItems="center"
        flexShrink={0}
      >
        <NoArtworkIcon width="18px" height="18px" fill="black60" />
      </Flex>
    )
  }

  const image = cropped(url, {
    width: LARGE_IMAGE_SIZE,
    height: LARGE_IMAGE_SIZE,
  })

  return (
    <Box position="absolute" top={OFFSET_BY_INDEX} left={OFFSET_BY_INDEX}>
      <Image
        width={SIZE}
        height={SIZE}
        src={image.src}
        srcSet={image.srcSet}
        alt=""
      />
    </Box>
  )
}
