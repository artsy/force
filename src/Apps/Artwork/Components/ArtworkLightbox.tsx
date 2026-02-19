import {
  Clickable,
  type ClickableProps,
  Image,
  ResponsiveBox,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useLocalImage } from "Utils/localImageHelpers"
import { userIsTeam } from "Utils/user"
import type { ArtworkLightbox_artwork$data } from "__generated__/ArtworkLightbox_artwork.graphql"
import { compact } from "es-toolkit"
import { scale } from "proportional-scale"
import type * as React from "react"
import { useMemo } from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkLightboxPlaceholder } from "./ArtworkLightboxPlaceholder"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork$data
  activeIndex: number
  maxHeight: number
  lazyLoad?: boolean
  shouldRenderFullImage?: boolean
  shouldRenderPlaceholder?: boolean
}

const MAX_SIZE = 800

const ArtworkLightbox: React.FC<
  React.PropsWithChildren<ArtworkLightboxProps>
> = ({
  artwork,
  activeIndex,
  lazyLoad,
  maxHeight,
  shouldRenderFullImage = true,
  shouldRenderPlaceholder = true,
  onClick,
  ...rest
}) => {
  const { user } = useSystemContext()

  const isTeam = userIsTeam(user)

  const images = compact(artwork.images ?? [])

  const activeImage = images[activeIndex]

  const localImage = useLocalImage(activeImage)

  const isArtworkCaptionEnabled = useFlag("diamond_artwork-captions")

  if (!activeImage) return null

  const { fallback, internalID, isDefault, placeholder, resized } = activeImage

  const hasGeometry = !!images[0]?.resized?.width

  const image = useMemo(() => {
    if (localImage) {
      return {
        src: localImage.data,
        srcSet: undefined,
        ...scale({ ...localImage, maxWidth: MAX_SIZE, maxHeight: MAX_SIZE }),
      }
    }

    if (hasGeometry) return resized

    return fallback
  }, [localImage, hasGeometry, resized, fallback])

  if (!image) return null

  const artworkCaption =
    isArtworkCaptionEnabled && isDefault
      ? (artwork.caption ?? artwork.formattedMetadata)
      : artwork.formattedMetadata

  return (
    <>
      {isDefault && (
        <Link
          rel="preload"
          as="image"
          href={image.src}
          imageSrcSet={image.srcSet}
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
          {shouldRenderPlaceholder && placeholder && (
            <ArtworkLightboxPlaceholder
              key={placeholder}
              src={placeholder}
              lazyLoad={false}
            />
          )}

          {shouldRenderFullImage && (
            <Image
              data-testid="artwork-lightbox-image"
              key={`${internalID}`}
              id={isDefault ? "transitionFrom--ViewInRoom" : undefined}
              width="100%"
              height="100%"
              src={image.src}
              srcSet={image.srcSet}
              alt={artworkCaption ?? ""}
              {...(isDefault
                ? { loading: "eager", fetchPriority: "high" }
                : {})}
              lazyLoad={lazyLoad}
              position="relative"
              preventRightClick={!isTeam}
              style={{ objectFit: "cover" }}
            />
          )}
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
          versions
        }
      }
    `,
  },
)
