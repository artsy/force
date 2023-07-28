import { BoxProps, Image, ResponsiveBox } from "@artsy/palette"
import { FC } from "react"
import { maxDimensionsByArea, resized } from "Utils/resized"

interface ArtistHeaderImageProps
  extends Omit<BoxProps, "maxHeight" | "maxWidth"> {
  image: ValidImage
}

export const ArtistHeaderImage: FC<ArtistHeaderImageProps> = ({
  image,
  ...rest
}) => {
  const max = maxDimensionsByArea({
    width: image.width,
    height: image.height,
    area: 300 * 300,
  })

  const img = resized(image.src, { width: max.width, height: max.height })

  return (
    <ResponsiveBox
      aspectWidth={image.width}
      aspectHeight={image.height}
      maxWidth={max.width}
      maxHeight={max.height}
      {...rest}
    >
      <Image
        src={img.src}
        srcSet={img.srcSet}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
    </ResponsiveBox>
  )
}

interface ValidImage {
  src: string
  width: number
  height: number
}

interface MaybeValidImage {
  src?: string | null
  width?: number | null
  height?: number | null
}

export const isValidImage = (
  image?: MaybeValidImage | null
): image is ValidImage => {
  return Boolean(image && image.src && image.width && image.height)
}
