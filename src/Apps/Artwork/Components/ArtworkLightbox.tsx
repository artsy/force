import { Clickable, ClickableProps, Image, ResponsiveBox } from "@artsy/palette"
import { compact } from "lodash"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import {
  getLocalImage,
  isImageVersionAvailable,
  LocalImage,
} from "Utils/localImagesHelpers"
import { userIsTeam } from "Utils/user"
import { ArtworkLightbox_artwork$data } from "__generated__/ArtworkLightbox_artwork.graphql"
import { ArtworkLightboxPlaceholder } from "./ArtworkLightboxPlaceholder"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork$data
  activeIndex: number
  maxHeight: number
  lazyLoad?: boolean
}

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

  const [localImage, setLocalImage] = useState<LocalImage | null>(null)

  const fetchLocalImage = useCallback(() => getLocalImage(internalID!), [
    internalID,
  ])

  const changeLocalImage = async () => {
    if (isImageVersionAvailable(images[activeIndex], "large") || !internalID) {
      setLocalImage(null)

      return
    }

    try {
      const image = await fetchLocalImage()

      setLocalImage(image)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    changeLocalImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalID])

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
            800 * (localImage?.aspectRatio ?? 1) || image.width || "100%"
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
          {localImage ? (
            <Image
              data-testid="artwork-lightbox-image"
              id={isDefault ? "transitionFrom--ViewInRoom" : undefined}
              key={`${internalID}`}
              width="100%"
              height={maxHeight}
              src={localImage.data}
              alt={artwork.formattedMetadata ?? ""}
              lazyLoad={lazyLoad}
              preventRightClick={!isTeam}
              style={{ position: "relative", border: "1px solid red" }}
            />
          ) : (
            <Image
              data-testid="artwork-lightbox-image"
              id={isDefault ? "transitionFrom--ViewInRoom" : undefined}
              key={image.src}
              width="100%"
              height="100%"
              src={image.src}
              srcSet={image.srcSet}
              alt={artwork.formattedMetadata ?? ""}
              lazyLoad={lazyLoad}
              preventRightClick={!isTeam}
              style={{ position: "relative" }}
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
