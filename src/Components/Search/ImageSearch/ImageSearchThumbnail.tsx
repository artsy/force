import { Box, type BoxProps } from "@artsy/palette"
import styled from "styled-components"
import { ImageSearchScanLine } from "./ImageSearchScanLine"

interface ImageSearchThumbnailProps extends BoxProps {
  isLoading?: boolean
  src?: string | null
}

export const ImageSearchThumbnail: React.FC<
  React.PropsWithChildren<ImageSearchThumbnailProps>
> = ({ isLoading = false, src, ...rest }) => {
  return (
    <Box
      bg="mono5"
      overflow="hidden"
      position="relative"
      flexShrink={0}
      {...rest}
    >
      {src && <ThumbnailImage src={src} alt="Your search image" />}

      {isLoading && src && <ImageSearchScanLine />}
    </Box>
  )
}

const ThumbnailImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`
