import { Clickable, ClickableProps, Image, ResponsiveBox } from "@artsy/palette"
import { Link } from "react-head"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkLightbox_artwork } from "v2/__generated__/ArtworkLightbox_artwork.graphql"
import { useSystemContext } from "v2/System"
import { userIsTeam } from "v2/Utils/user"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork
  activeIndex: number
  lazyLoad?: boolean
}

const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artwork,
  activeIndex,
  lazyLoad,
  onClick,
  ...rest
}) => {
  const images = compact(artwork.images)
  const hasGeometry = !!images[0].resized?.width
  const maxHeight = Math.max(
    ...images.map(image =>
      hasGeometry ? image.resized!.height! : image.fallback!.height!
    )
  )
  const { resized, fallback, isDefault } = images[activeIndex]
  const image = hasGeometry ? resized : fallback

  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)

  if (!image) {
    return null
  }

  return (
    <>
      {isDefault && <Link rel="preload" as="image" href={image.src} />}

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
          bg="black10"
          mx={[0, 2]}
          // @ts-ignore
          maxWidth={image.width ?? "100%"}
          aspectWidth={image.width ?? 1}
          aspectHeight={image.height ?? 1}
        >
          <Image
            id={isDefault ? "transitionFrom--ViewInRoom" : undefined}
            key={image.src}
            width="100%"
            height="100%"
            src={image.src}
            srcSet={image.srcSet}
            alt={artwork.formattedMetadata ?? ""}
            lazyLoad={lazyLoad}
            preventRightClick={!isTeam}
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
      fragment ArtworkLightbox_artwork on Artwork {
        formattedMetadata
        images {
          isDefault
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
        }
      }
    `,
  }
)
