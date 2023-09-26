import { BoxProps, Image, ResponsiveBox } from "@artsy/palette"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { FC } from "react"
import { maxDimensionsByArea, resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

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

  const desktop = resized(image.src, { width: max.width, height: max.height })

  return (
    <>
      <Media at="xs">
        <FullBleedHeader src={image.src} />
      </Media>

      <Media greaterThan="xs">
        <ResponsiveBox
          aspectWidth={image.width}
          aspectHeight={image.height}
          maxWidth={max.width}
          maxHeight={max.height}
          bg="black5"
          {...rest}
        >
          <Image
            src={desktop.src}
            srcSet={desktop.srcSet}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </ResponsiveBox>
      </Media>
    </>
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
