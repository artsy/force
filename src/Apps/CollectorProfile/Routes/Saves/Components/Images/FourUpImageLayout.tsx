import { Box, Flex, Image, Spacer } from "@artsy/palette"
import { ArtworkListNoImage } from "./ArtworkListNoImage"
import { prepareImageURLs } from "Apps/CollectorProfile/Routes/Saves/Utils/prepareImageURLs"
import { FC } from "react"
import { cropped } from "Utils/resized"
import { ArtworkListImageBorder } from "Apps/CollectorProfile/Routes/Saves/Components/Images/ArtworkListImageBorder"

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
    return <ArtworkListNoImage width={SIZE} height={SIZE} />
  }

  const image = cropped(url, {
    width: LARGE_IMAGE_SIZE,
    height: LARGE_IMAGE_SIZE,
  })

  return (
    <ArtworkListImageBorder width={SIZE} height={SIZE}>
      <Image
        src={image.src}
        srcSet={image.srcSet}
        width="100%"
        height="100%"
        alt=""
      />
    </ArtworkListImageBorder>
  )
}
