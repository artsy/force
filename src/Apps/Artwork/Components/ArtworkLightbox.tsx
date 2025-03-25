import {
  Clickable,
  type ClickableProps,
  Image,
  ResponsiveBox,
} from "@artsy/palette"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useLocalImage } from "Utils/localImageHelpers"
import { userIsTeam } from "Utils/user"
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

const MAX_SIZE = 1600

const ArtworkLightbox: React.FC<
  React.PropsWithChildren<ArtworkLightboxProps>
> = ({ artwork, activeIndex, lazyLoad, maxHeight, onClick, ...rest }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.resized?.width

  const isBlurhashEnabled = useFeatureFlag("diamond_artwork-page-blurhash")
  const localImage = useLocalImage(images[activeIndex])

  const resizedLocalImage = localImage && {
    src: localImage.data,
    ...scale({ ...localImage, maxWidth: MAX_SIZE, maxHeight: MAX_SIZE }),
  }

  if (!images?.[activeIndex]) return null

  const {
    fallback,
    internalID,
    isDefault,
    placeholder,
    resized,
    blurhashDataURL,
  } = images[activeIndex]

  const image = resizedLocalImage ?? (hasGeometry ? resized : fallback)

  if (!image) return null

  return (
    <>
      {isDefault && (
        <Link rel="preload" as="image" href={image.src} fetchPriority="high" />
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
          bg="black10"
          mx={[0, 2]}
          maxWidth={image.width ? image.width / 2 : ("100%" as any)}
          aspectWidth={image.width || 1}
          aspectHeight={image.height || 1}
        >
          {placeholder && !isBlurhashEnabled && (
            <ArtworkLightboxPlaceholder
              key={placeholder}
              src={placeholder}
              preload={!!isDefault}
              // Deliberate, to improve LCP
              lazyLoad={false}
            />
          )}

          {blurhashDataURL && isBlurhashEnabled && (
            <Image
              src={blurhashDataURL}
              alt=""
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              zIndex={0}
              style={{
                filter: "blur(10px)",
                transform: "scale(1.1)",
              }}
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
            src={image.src}
            alt={artwork.formattedMetadata ?? ""}
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
        formattedMetadata
        images(includeAll: $includeAllImages) {
          internalID
          isDefault
          placeholder: url(version: ["small", "medium"])
          blurhashDataURL(width: 801)
          fallback: cropped(
            quality: 80
            width: 1600
            height: 1600
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
          }
          resized(
            quality: 80
            width: 1600
            height: 1600
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
          }
          versions
        }
      }
    `,
  },
)
