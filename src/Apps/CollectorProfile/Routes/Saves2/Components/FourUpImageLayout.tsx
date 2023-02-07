import { Box, Flex, Image, NoArtworkIcon, Spacer } from "@artsy/palette"
import { prepareImageURLs } from "Apps/CollectorProfile/Routes/Saves2/Utils/prepareImageURLs"
import { FC } from "react"
import { cropped } from "Utils/resized"

interface FourUpImageLayoutProps {
  imageURLs: (string | null)[]
}

interface RowImageProps {
  url: string | null
}

const LARGE_IMAGE_SIZE = 100
const SMALL_IMAGE_SIZE = 58
const IMAGE_OFFSET = "2px"

export const FourUpImageLayout: FC<FourUpImageLayoutProps> = ({
  imageURLs,
}) => {
  const preparedImageURLs = prepareImageURLs(imageURLs)

  return (
    <Box>
      <Flex flexDirection="row">
        <RowImage url={preparedImageURLs[0]} />
        <Spacer x={IMAGE_OFFSET} />
        <RowImage url={preparedImageURLs[1]} />
      </Flex>

      <Spacer y={IMAGE_OFFSET} />

      <Flex flexDirection="row">
        <RowImage url={preparedImageURLs[2]} />
        <Spacer x={IMAGE_OFFSET} />
        <RowImage url={preparedImageURLs[3]} />
      </Flex>
    </Box>
  )
}

const RowImage: FC<RowImageProps> = ({ url }) => {
  const SIZE = [SMALL_IMAGE_SIZE, LARGE_IMAGE_SIZE]

  if (url === null) {
    return (
      <Flex
        width={SIZE}
        height={SIZE}
        bg="black5"
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
    <Image
      width={SIZE}
      height={SIZE}
      src={image.src}
      srcSet={image.srcSet}
      alt=""
    />
  )
}
