import { type BoxProps, FullBleed, Image, ResponsiveBox } from "@artsy/palette"
import type { FC } from "react"
import { maxDimensionsByArea, resized } from "Utils/resized"
import { Link } from "react-head"
import { getENV } from "Utils/getENV"

const MOBILE_SIZE = {
  width: 350,
  height: 220,
}

interface ArtistHeaderImageProps
  extends Omit<BoxProps, "maxHeight" | "maxWidth"> {
  image: ValidImage
}

export const ArtistHeaderImage: FC<
  React.PropsWithChildren<ArtistHeaderImageProps>
> = ({ image, ...rest }) => {
  const max = maxDimensionsByArea({
    width: image.width,
    height: image.height,
    area: 300 * 300,
  })

  const desktop = resized(image.src, { width: max.width, height: max.height })
  const mobile = resized(image.src, {
    width: MOBILE_SIZE.width,
    height: MOBILE_SIZE.height,
    quality: 50,
  })

  const isMobile = getENV("IS_MOBILE")

  return (
    <>
      {isMobile ? (
        <>
          <Link
            rel="preload"
            href={mobile.src}
            as="image"
            imagesrcset={mobile.srcSet}
            fetchPriority="high"
          />

          <FullBleed>
            <ResponsiveBox
              aspectWidth={MOBILE_SIZE.width}
              aspectHeight={MOBILE_SIZE.height}
              maxWidth={1000}
              minHeight={MOBILE_SIZE.height}
            >
              <Image
                key={mobile.src}
                width="100%"
                height="100%"
                src={mobile.src}
                srcSet={mobile.srcSet}
                fetchPriority="high"
                // LCP optimization
                lazyLoad={false}
                style={{
                  objectFit: "cover",
                }}
              />
            </ResponsiveBox>
          </FullBleed>
        </>
      ) : (
        // Desktop
        <>
          <Link
            rel="preload"
            href={desktop.src}
            as="image"
            imagesrcset={desktop.srcSet}
            fetchPriority="high"
          />

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
              fetchPriority="high"
            />
          </ResponsiveBox>
        </>
      )}
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
