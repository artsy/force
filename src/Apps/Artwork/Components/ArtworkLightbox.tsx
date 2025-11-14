import { useFlag } from "System/FeatureFlags/useFlag"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { useLocalImage } from "Utils/localImageHelpers"
import { userIsTeam } from "Utils/user"
import {
  Clickable,
  type ClickableProps,
  Image,
  ResponsiveBox,
} from "@artsy/palette"
import type { ArtworkLightbox_artwork$data } from "__generated__/ArtworkLightbox_artwork.graphql"
import { compact } from "lodash"
import { scale } from "proportional-scale"
import type * as React from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkLightboxPlaceholder } from "./ArtworkLightboxPlaceholder"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork$data
  activeIndex: number
  maxHeight: number
  lazyLoad?: boolean
}

const MAX_SIZE = 800

const ArtworkLightbox: React.FC<
  React.PropsWithChildren<ArtworkLightboxProps>
> = ({ artwork, activeIndex, maxHeight, onClick, ...rest }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.resized?.width

  const localImage = useLocalImage(images[activeIndex])

  const isArtworkCaptionEnabled = useFlag("diamond_artwork-captions")

  const resizedLocalImage = localImage && {
    src: localImage.data,
    srcSet: undefined,
    ...scale({ ...localImage, maxWidth: MAX_SIZE, maxHeight: MAX_SIZE }),
  }

  if (!images?.[activeIndex]) return null

  const {
    fallback,
    internalID,
    isDefault,
    placeholder,
    resized,
    mobileLightboxSource,
  } = images[activeIndex]

  const artworkCaption =
    isArtworkCaptionEnabled && isDefault
      ? (artwork.caption ?? artwork.formattedMetadata)
      : artwork.formattedMetadata

  const image = resizedLocalImage ?? (hasGeometry ? resized : fallback)

  if (!image) return null

  let lightboxImage = image

  if (getENV("IS_MOBILE") && mobileLightboxSource) {
    lightboxImage = mobileLightboxSource
  }

  // Always preload the 2x image for mobile lightbox if available
  const preloadImage = mobileLightboxSource?.srcSet?.match(/ ([^ ]+) 2x/)?.[1]

  return (
    <>
      {isDefault && (
        <Link
          rel="preload"
          as="image"
          href={preloadImage}
          imageSrcSet={lightboxImage.srcSet}
          fetchPriority="high"
        />
      )}

      <Clickable
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={[null, null, maxHeight]}
        width="100%"
        cursor={onClick ? "zoom-in" : "default"}
        tabIndex={onClick ? undefined : -1}
        onClick={onClick}
        overflow="hidden"
        {...rest}
      >
        <ResponsiveBox
          data-testid="artwork-lightbox-box"
          bg="mono10"
          mx={[0, 2]}
          maxWidth={image.width || ("100%" as any)}
          aspectWidth={image.width || 1}
          aspectHeight={image.height || 1}
        >
          {placeholder && (
            <ArtworkLightboxPlaceholder
              key={placeholder}
              src={placeholder}
              preload={!!isDefault}
              // Deliberate, to improve LCP
              lazyLoad={false}
            />
          )}

          <Image
            data-testid="artwork-lightbox-image"
            key={`${internalID}`}
            {...(isDefault
              ? {
                  id: "transitionFrom--ViewInRoom",
                  fetchPriority: "high",
                }
              : {})}
            width="100%"
            height="100%"
            src={lightboxImage.src}
            srcSet={lightboxImage.srcSet}
            alt={artworkCaption ?? ""}
            position="relative"
            preventRightClick={!isTeam}
            style={{
              objectFit: "cover",
            }}
          />
        </ResponsiveBox>
      </Clickable>
    </>
  )
}

export const ArtworkLightboxFragmentContainer = createFragmentContainer(
  ArtworkLightbox,
  {
    artwork: graphql`
      fragment ArtworkLightbox_artwork on Artwork
      @argumentDefinitions(
        includeAllImages: { type: "Boolean", defaultValue: false }
      ) {
        caption
        formattedMetadata
        images(includeAll: $includeAllImages) {
          internalID
          isDefault
          placeholder: url(version: ["small", "medium"])
          fallback: cropped(
            quality: 80
            width: 800
            height: 800
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
            srcSet
          }
          resized(
            quality: 80
            width: 800
            height: 800
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
            srcSet
          }
          mobileLightboxSource: resized(
            quality: 50
            width: 800
            height: 800
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
            srcSet
          }
          versions
        }
      }
    `,
  },
)
