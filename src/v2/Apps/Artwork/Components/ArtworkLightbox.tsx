import { Clickable, ClickableProps, Image, ResponsiveBox } from "@artsy/palette"
import { Link } from "react-head"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkLightbox_artwork } from "v2/__generated__/ArtworkLightbox_artwork.graphql"
import { useSystemContext } from "v2/System"
import { userIsTeam } from "v2/Utils/user"
import { ArtworkLightboxPlaceholder } from "./ArtworkLightboxPlaceholder"

interface ArtworkLightboxProps extends ClickableProps {
  artwork: ArtworkLightbox_artwork
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
  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.resized?.width

  const { resized, fallback, placeholder, isDefault } = images[activeIndex]
  const image = hasGeometry ? resized : fallback

  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)

  if (!image) {
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
          bg="black10"
          mx={[0, 2]}
          // @ts-ignore
          maxWidth={image.width ?? "100%"}
          aspectWidth={image.width ?? 1}
          aspectHeight={image.height ?? 1}
        >
          <ArtworkLightboxPlaceholder
            key={placeholder!}
            src={placeholder!}
            preload={!!isDefault}
            lazyLoad={!!lazyLoad}
          />

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
      fragment ArtworkLightbox_artwork on Artwork {
        formattedMetadata
        images {
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
        }
      }
    `,
  }
)
