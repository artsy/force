import { Clickable, ClickableProps, Image, ResponsiveBox } from "@artsy/palette"
import { resized as resizer } from "Utils/resized"
import { compact } from "lodash"
import { scale } from "proportional-scale"
import * as React from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useLocalImage } from "Utils/localImageHelpers"
import { userIsTeam } from "Utils/user"
import { ArtworkLightbox_artwork$data } from "__generated__/ArtworkLightbox_artwork.graphql"
import { ArtworkLightboxPlaceholder } from "./ArtworkLightboxPlaceholder"
import { getENV } from "Utils/getENV"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork$data
  activeIndex: number
  maxHeight: number
  lazyLoad?: boolean
}

const MAX_SIZE = 800

const ArtworkLightbox: React.FC<React.PropsWithChildren<
  ArtworkLightboxProps
>> = ({ artwork, activeIndex, lazyLoad, maxHeight, onClick, ...rest }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.resized?.width

  const localImage = useLocalImage(images[activeIndex])

  const resizedLocalImage = localImage && {
    src: localImage.data,
    srcSet: undefined,
    ...scale({ ...localImage, maxWidth: MAX_SIZE, maxHeight: MAX_SIZE }),
  }

  if (!images?.[activeIndex]) return null

  const { fallback, internalID, isDefault, placeholder, resized } = images[
    activeIndex
  ]

  const image = resizedLocalImage ?? (hasGeometry ? resized : fallback)

  if (!image) return null

  let lightboxImage = image

  if (getENV("IS_MOBILE")) {
    lightboxImage = resizer(image?.src, {
      width: image.width as number,
      height: image.height as number,
      quality: 50,
    }) as typeof image
  }

  return (
    <>
      {isDefault && (
        <Link
          rel="preload"
          as="image"
          href={lightboxImage.src}
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
        {...rest}
      >
        <ResponsiveBox
          data-testid="artwork-lightbox-box"
          bg="black10"
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
            height={"100%"}
            src={lightboxImage.src}
            srcSet={lightboxImage.srcSet}
            alt={artwork.formattedMetadata ?? ""}
            // Deliberate, to improve LCP
            lazyLoad={false}
            preventRightClick={!isTeam}
            style={{ position: "relative" }}
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
  }
)
