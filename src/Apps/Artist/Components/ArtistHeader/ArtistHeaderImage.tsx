import { type BoxProps, FullBleed, Image, ResponsiveBox } from "@artsy/palette"
import { getENV } from "Utils/getENV"
import { maxDimensionsByArea, resized } from "Utils/resized"
import type { ArtistHeaderImage_artwork$data } from "__generated__/ArtistHeaderImage_artwork.graphql"
import type { FC } from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

const MOBILE_SIZE = {
  width: 350,
  height: 220,
}

interface ArtistHeaderImageProps
  extends Omit<BoxProps, "maxHeight" | "maxWidth"> {
  artwork: ArtistHeaderImage_artwork$data
}

export const ArtistHeaderImage: FC<
  React.PropsWithChildren<ArtistHeaderImageProps>
> = ({ artwork, ...rest }) => {
  if (!isValidImage(artwork.image)) {
    return null
  }

  const alt = artwork.imageTitle || `Artwork by ${artwork.artist?.name!}`
  const { image } = artwork

  const max = maxDimensionsByArea({
    width: image?.width,
    height: image?.height,
    area: 300 * 300,
  })

  const desktop = resized(image.src, {
    width: max.width,
    height: max.height,
  })

  const mobile = resized(image.src, {
    width: MOBILE_SIZE.width,
    height: MOBILE_SIZE.height,
    quality: 50,
  })

  const isMobile = getENV("IS_MOBILE")

  return (
    <>
      <Link
        rel="preload"
        // always hint at mobile 2x image, to inform Link: headers
        href={mobile.quality2x}
        as="image"
        imageSrcSet={isMobile ? mobile.srcSet : desktop.srcSet}
        fetchPriority="high"
      />

      {isMobile ? (
        <>
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
                alt={alt}
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
          <ResponsiveBox
            aspectWidth={artwork.image.width}
            aspectHeight={artwork.image.height}
            maxWidth={max.width}
            maxHeight={max.height}
            bg="mono5"
            {...rest}
          >
            <Image
              key={desktop.src}
              src={desktop.src}
              srcSet={desktop.srcSet}
              alt={alt}
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
  image?: MaybeValidImage | null,
): image is ValidImage => {
  return Boolean(image && image.src && image.width && image.height)
}

export const ArtistHeaderImageFragmentContainer = createFragmentContainer(
  ArtistHeaderImage,
  {
    artwork: graphql`
      fragment ArtistHeaderImage_artwork on Artwork {
        imageTitle
        image {
          src: url(version: ["larger", "larger"])
          width
          height
        }
        artist {
          name
        }
      }
    `,
  },
)
