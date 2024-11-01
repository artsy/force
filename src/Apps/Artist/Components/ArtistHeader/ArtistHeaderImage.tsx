import { BoxProps, FullBleed, Image, ResponsiveBox } from "@artsy/palette"
import { FC } from "react"
import { cropped, maxDimensionsByArea, resized } from "Utils/resized"
import { BREAKPOINTS, Media } from "Utils/Responsive"
import { Link } from "react-head"

const MOBILE_SIZE = {
  width: 450,
  height: 320,
}

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
  const mobile = cropped(image.src, {
    width: MOBILE_SIZE.width,
    height: MOBILE_SIZE.height,
    quality: 60,
  })

  return (
    <>
      <Link
        rel="preload"
        href={desktop.src}
        as="image"
        imagesrcset={desktop.srcSet}
        media={`(min-width: ${BREAKPOINTS.sm}px)`}
      />

      <Link
        rel="preload"
        href={mobile.src}
        as="image"
        imagesrcset={mobile.srcSet}
        media={`(min-width: ${BREAKPOINTS.sm}px)`}
      />

      <Media at="xs">
        <FullBleed>
          <ResponsiveBox
            aspectWidth={MOBILE_SIZE.width}
            aspectHeight={MOBILE_SIZE.height}
            maxWidth={700}
            minWidth={MOBILE_SIZE.width}
            maxHeight={MOBILE_SIZE.height}
            minHeight={MOBILE_SIZE.height}
          >
            <Image
              width="100%"
              height="100%"
              src={mobile.src}
              srcSet={mobile.srcSet}
              fetchPriority="high"
              style={{
                minWidth: MOBILE_SIZE.width,
                minHeight: MOBILE_SIZE.height,
              }}
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
            key={desktop.src}
            src={desktop.src}
            srcSet={desktop.srcSet}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            // Deliberate, to improve LCP
            lazyLoad={false}
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
