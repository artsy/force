import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image } from "@artsy/palette"
import { FillheightItem_artwork } from "v2/__generated__/FillheightItem_artwork.graphql"
import { SystemContextProps } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { getENV } from "v2/Utils/getENV"
import { userIsTeam } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import {
  ClickContainer,
  SaveButtonFragmentContainer as SaveButton,
} from "./SaveButton"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useSystemContext } from "@artsy/reaction/dist/Artsy"
import { Mediator } from "lib/mediator"

const IMAGE_QUALITY = 80

const Placeholder = styled(Box).attrs({ bg: "gray10" })`
  position: relative;
  width: 100%;
`

interface FillheightItemContainerProps
  extends SystemContextProps,
    React.HTMLProps<typeof FillheightItemContainer> {
  artwork: FillheightItem_artwork
  contextModule: AuthContextModule
  hideArtistName?: boolean
  hidePartnerName?: boolean
  hideSaleInfo?: boolean
  imageWidth: number
  imageHeight: number
  lazyLoad?: boolean
  marginLeft?: number
  marginRight?: number
  showExtended?: boolean
  showMetadata?: boolean
  onClick?: () => void
}

const FillheightItemContainer: React.FC<FillheightItemContainerProps> = ({
  showMetadata = true,
  imageWidth = 220,
  artwork,
  className,
  contextModule,
  hideArtistName,
  hidePartnerName,
  hideSaleInfo,
  imageHeight,
  lazyLoad,
  onClick,
  showExtended,
  user,
}) => {
  const { mediator } = useSystemContext()

  if (!artwork.image) {
    return null
  }

  const getAspectRatio = () => {
    let aspectRatio = artwork?.image?.aspectRatio || 1
    // Our relay testing layer often mocks props with strings; this makes it a
    // little safer and less confusing when that happens.
    if (typeof aspectRatio !== "number") {
      aspectRatio = 1
    }
    return aspectRatio
  }

  const getImageHeight = () => {
    // NOTE: `aspectRatio` will default to `1` if image geometry is missing.
    // Given that `imageHeight` is required, this means that any missing geometry
    // will default to a square thumbnail.
    const height = Math.floor(imageWidth * getAspectRatio())
    return height
  }

  const getImageUrl = (pixelRatio = 1) => {
    if (!artwork.image.url) {
      return null
    }

    // Either scale or crop, based on if an aspect ratio is 1. Either the image
    // actually is a square — or the geometry is missing and utilizing fill prevents
    // distortion when it is sized to fit.
    const aspectRatio = getAspectRatio()
    const type = aspectRatio === 1 ? "fill" : "fit"
    const w = imageWidth * pixelRatio
    const h = getImageHeight() * pixelRatio

    const imageUrl = `${getENV(
      "GEMINI_CLOUDFRONT_URL"
    )}/?resize_to=${type}&width=${w}&height=${h}&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(
      artwork.image.url
    )}`

    return imageUrl
  }

  const height = getImageHeight()

  return (
    <Box className={className} width={imageWidth}>
      <Placeholder style={{ height, width: imageWidth }}>
        <RouterLink
          to={artwork.href}
          onClick={() => {
            if (onClick) {
              onClick()
            }
          }}
        >
          <Image
            src={getImageUrl(1)}
            srcSet={`${getImageUrl(1)} 1x, ${getImageUrl(2)} 2x`}
            width={imageWidth}
            height={imageHeight}
            lazyLoad={lazyLoad}
            preventRightClick={!userIsTeam(user)}
            alt={artwork?.imageTitle}
          />
        </RouterLink>

        {showExtended && <Badge artwork={artwork} width={imageWidth} />}

        <SaveButton
          user={user}
          mediator={mediator as Mediator}
          contextModule={contextModule}
          artwork={artwork}
        />
      </Placeholder>

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

const FillheightItem = styled(FillheightItemContainer)<
  FillheightItemContainerProps
>`
  display: inline-block;
  width: ${props => props.width}px;
  vertical-align: top;
  margin-right: ${props => props.marginRight || 0}px;
  margin-left: ${props => props.marginLeft || 0}px;

  &:hover {
    ${ClickContainer} {
      opacity: 1;
    }
  }
`

export const FillheightItemFragmentContainer = createFragmentContainer(
  FillheightItem,
  {
    artwork: graphql`
      fragment FillheightItem_artwork on Artwork {
        image {
          url(version: "large")
          aspectRatio
          height
        }
        imageTitle
        title
        href
        ...Metadata_artwork
        ...SaveButton_artwork
        ...Badge_artwork
      }
    `,
  }
)
