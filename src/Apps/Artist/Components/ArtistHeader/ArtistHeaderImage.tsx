import { BoxProps, FullBleed, Image, ResponsiveBox } from "@artsy/palette"
import { FC } from "react"
import { cropped, maxDimensionsByArea, resized } from "Utils/resized"
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
  const mobile = cropped(image.src, { width: 430, height: 430 })

  return (
    <>
      <Media at="xs">
        <FullBleed
          // FIXME: Remove this negative margin once the `diamond_revised-artist-header` feature flag is removed
          mt={-6}
        >
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth="100%"
            bg="black5"
            {...rest}
          >
            <Image
              src={mobile.src}
              srcSet={mobile.srcSet}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
          </ResponsiveBox>
        </FullBleed>
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
