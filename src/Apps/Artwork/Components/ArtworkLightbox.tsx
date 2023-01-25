import { Clickable, ClickableProps, Image, ResponsiveBox } from "@artsy/palette"
import { compact } from "lodash"
import * as React from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import { useLocalImage } from "Utils/localImagesHelpers"
import { userIsTeam } from "Utils/user"
import { ArtworkLightbox_artwork$data } from "__generated__/ArtworkLightbox_artwork.graphql"
import { ArtworkLightboxPlaceholder } from "./ArtworkLightboxPlaceholder"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork$data
  activeIndex: number
  maxHeight: number
  lazyLoad?: boolean
}

const MAX_WIDTH = 800

const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artwork,
  activeIndex,
  lazyLoad,
  maxHeight,
  onClick,
  ...rest
}) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.resized?.width

  const { fallback, internalID, isDefault, placeholder, resized } = images[
    activeIndex
  ]
  const image = hasGeometry ? resized : fallback

  const localImage = useLocalImage(images[activeIndex])

  console.log({ localImage })

  if (!images?.[activeIndex] || !image) {
    return null
  }

  return (
    <>
      {isDefault && (
        <Link
          rel="preload"
          as="image"
          href={image.src}
          imagesrcset={image.srcSet}
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
          // @ts-ignore
          maxWidth={
            localImage
              ? Math.min(localImage?.aspectRatio || 1, 1) * MAX_WIDTH
              : image.width || "100%"
          }
          aspectWidth={localImage?.width || image.width || 1}
          aspectHeight={localImage?.height || image.height || 1}
        >
          <ArtworkLightboxPlaceholder
            key={placeholder!}
            src={placeholder!}
            preload={!!isDefault}
            lazyLoad={!!lazyLoad}
          />
          <Image
            data-testid="artwork-lightbox-image"
            id={isDefault ? "transitionFrom--ViewInRoom" : undefined}
            key={`${internalID}`}
            width="100%"
            height={localImage ? maxHeight : "100%"}
            src={localImage?.data || image.src}
            srcSet={localImage ? undefined : image.srcSet}
            alt={artwork.formattedMetadata ?? ""}
            lazyLoad={lazyLoad}
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
            width: 800
            height: 800
            version: ["normalized", "larger", "large"]
          ) {
            width
            height
            src
            srcSet
          }
          resized(
            width: 800
            height: 800
            version: ["normalized", "larger", "large"]
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
