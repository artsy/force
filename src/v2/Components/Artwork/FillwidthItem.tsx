import { AuthContextModule } from "@artsy/cohesion"
import { Box, BoxProps, Image } from "@artsy/palette"
import { FillwidthItem_artwork$data } from "v2/__generated__/FillwidthItem_artwork.graphql"
import { useSystemContext } from "v2/System"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { userIsTeam } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { SaveButtonFragmentContainer, useSaveButton } from "./SaveButton"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Mediator } from "lib/mediator"
import { cropped, resized } from "v2/Utils/resized"

const logger = createLogger("FillwidthItem.tsx")

export interface FillwidthItemProps extends BoxProps {
  artwork: FillwidthItem_artwork$data
  contextModule: AuthContextModule
  hideArtistName?: boolean
  hidePartnerName?: boolean
  hideSaleInfo?: boolean
  imageHeight: number
  lazyLoad?: boolean
  marginLeft?: number
  marginRight?: number
  mediator?: Mediator
  showExtended?: boolean
  showMetadata?: boolean
  onClick?: () => void
}

export const FillwidthItem: React.FC<FillwidthItemProps> = ({
  artwork,
  contextModule,
  imageHeight,
  lazyLoad,
  showExtended,
  showMetadata = true,
  hidePartnerName,
  hideArtistName,
  hideSaleInfo,
  onClick,
  ...rest
}) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)

  const { containerProps, isSaveButtonVisible } = useSaveButton({
    isSaved: false,
  })

  const aspectRatio = artwork.image?.aspectRatio ?? 1
  const imageWidth = Math.floor(imageHeight * aspectRatio)

  if (!artwork.image) {
    const href = artwork.href
    logger.error(`Artwork at ${href} does not have an image!`)
    return null
  }

  const transform = aspectRatio === 1 ? cropped : resized
  const imageURL = artwork.image?.url
  const { src, srcSet } = imageURL
    ? transform(imageURL, {
        width: imageWidth,
        height: imageHeight,
      })
    : { src: "", srcSet: "" }

  return (
    <Box
      display="inline-block"
      width={imageWidth}
      verticalAlign="top"
      data-test="artworkFillwidthItem"
      {...containerProps}
      {...rest}
    >
      <Box
        position="relative"
        bg="black10"
        // Pass dimensions through style tag to prevent too many classes
        style={{ height: imageHeight, width: imageWidth }}
      >
        <RouterLink to={artwork.href} onClick={onClick}>
          <Image
            src={src}
            srcSet={srcSet}
            width="100%"
            height={imageHeight}
            lazyLoad={lazyLoad}
            preventRightClick={!isTeam}
            alt={artwork?.imageTitle ?? ""}
          />
        </RouterLink>

        {showExtended && <Badge artwork={artwork} width={imageWidth} />}

        {isSaveButtonVisible && (
          <SaveButtonFragmentContainer
            contextModule={contextModule}
            artwork={artwork}
          />
        )}
      </Box>

      {showMetadata && (
        <Metadata
          artwork={artwork}
          extended={showExtended}
          hidePartnerName={hidePartnerName}
          hideArtistName={hideArtistName}
          hideSaleInfo={hideSaleInfo}
        />
      )}
    </Box>
  )
}

export default createFragmentContainer(FillwidthItem, {
  artwork: graphql`
    fragment FillwidthItem_artwork on Artwork {
      image {
        url(version: "larger")
        aspectRatio
      }
      imageTitle
      title
      href
      is_saved: isSaved
      ...Metadata_artwork
      ...SaveButton_artwork
      ...Badge_artwork
    }
  `,
})
