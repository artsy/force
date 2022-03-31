import { Image as BaseImage, ImageProps, Box } from "@artsy/palette"
import styled from "styled-components"

interface ArtworkImageProps extends ImageProps {
  shouldZoomOnHover?: boolean
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  shouldZoomOnHover,
  ...rest
}) => {
  if (shouldZoomOnHover) {
    return (
      <Box overflow="hidden">
        <ZoomImage {...rest} />
      </Box>
    )
  }

  return <Image {...rest} />
}

const Image = styled(BaseImage)`
  display: block;
  width: 100%;
  height: 100%;
`

const ZoomImage = styled(Image)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`
