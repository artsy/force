import { Box, Flex, Image, Spacer } from "@artsy/palette"
import { FC } from "react"

interface FourUpImageLayoutProps {
  imageURLs: string[]
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
  // Ensure we have an array of exactly 4 images
  const artworkImageURLs = [null, null, null, null].reduce(
    (acc, _, i) => [...acc, imageURLs[i] ?? null],
    [] as string[]
  )

  return (
    <Box>
      <Flex flexDirection="row">
        <RowImage url={artworkImageURLs[0]} />
        <Spacer x={IMAGE_OFFSET} />
        <RowImage url={artworkImageURLs[1]} />
      </Flex>

      <Spacer y={IMAGE_OFFSET} />

      <Flex flexDirection="row">
        <RowImage url={artworkImageURLs[2]} />
        <Spacer x={IMAGE_OFFSET} />
        <RowImage url={artworkImageURLs[3]} />
      </Flex>
    </Box>
  )
}

const RowImage: FC<RowImageProps> = ({ url }) => {
  const SIZE = [SMALL_IMAGE_SIZE, LARGE_IMAGE_SIZE]

  if (url === null) {
    return <Box width={SIZE} height={SIZE} bg="black10" />
  }

  return <Image width={SIZE} height={SIZE} preventRightClick src={url} />
}
