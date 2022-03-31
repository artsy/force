import { Image as BaseImage, ImageProps } from "@artsy/palette"
import styled from "styled-components"
import { MagnifyImage } from "../MagnifyImage"

interface ArtworkImageProps extends ImageProps {
  shouldZoomOnHover?: boolean
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  shouldZoomOnHover,
  ...rest
}) => {
  if (shouldZoomOnHover) {
    return <MagnifyImage {...rest} />
  }

  return <Image {...rest} />
}

const Image = styled(BaseImage)`
  display: block;
  width: 100%;
  height: 100%;
`
