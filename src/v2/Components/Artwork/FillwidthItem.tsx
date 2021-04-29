import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image } from "@artsy/palette"
import { FillwidthItem_artwork } from "v2/__generated__/FillwidthItem_artwork.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { userIsTeam } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import {
  ClickContainer,
  SaveButtonFragmentContainer as SaveButton,
} from "./SaveButton"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Mediator } from "lib/mediator"
import { cropped, resized } from "v2/Utils/resized"

const logger = createLogger("FillwidthItem.tsx")

const Placeholder = styled(Box).attrs({ bg: "gray10" })`
  position: relative;
  width: 100%;
`

export interface FillwidthItemContainerProps
  extends SystemContextProps,
    React.HTMLProps<FillwidthItemContainer> {
  artwork: FillwidthItem_artwork
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

export class FillwidthItemContainer extends React.Component<
  FillwidthItemContainerProps
> {
  static defaultProps = {
    showMetadata: true,
  }

  get imageWidth() {
    let {
      artwork: {
        image: { aspectRatio },
      },
    } = this.props

    // Our relay testing layer often mocks props with strings; this makes it a
    // little safer and less confusing when that happens.
    if (typeof aspectRatio !== "number") {
      aspectRatio = 1
    }

    // NOTE: `aspectRatio` will default to `1` if image geometry is missing.
    // Given that `imageHeight` is required, this means that any missing geometry
    // will default to a square thumbnail.
    return Math.floor(this.props.imageHeight * aspectRatio)
  }

  get imageHeight() {
    return this.props.imageHeight
  }

  render() {
    const {
      artwork,
      className,
      contextModule,
      imageHeight,
      lazyLoad,
      mediator,
      showExtended,
      showMetadata,
      user,
      hidePartnerName,
      hideArtistName,
      hideSaleInfo,
    } = this.props

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }
    const isTeam = userIsTeam(user)

    const image = get(this.props, p => p.artwork.image)

    if (!image) {
      const href = get(this.props, p => p.artwork.href, "(unknown href)")
      logger.error(`Artwork at ${href} does not have an image!`)
      return null
    }

    let scaledImage
    switch (artwork.image.aspectRatio === 1 ? "fill" : "fit") {
      case "fit":
        scaledImage = resized(artwork.image.url, {
          width: this.imageWidth,
          height: this.imageHeight,
        })
        break
      case "fill":
      default:
        scaledImage = cropped(artwork.image.url, {
          width: this.imageWidth,
          height: this.imageHeight,
        })
    }

    return (
      <Box className={className} width={this.imageWidth}>
        <Placeholder style={{ height: imageHeight, width: this.imageWidth }}>
          <RouterLink
            to={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
          >
            <Image
              src={scaledImage.src}
              srcSet={scaledImage.srcSet}
              width="100%"
              height={imageHeight}
              lazyLoad={lazyLoad}
              preventRightClick={!isTeam}
              alt={artwork?.imageTitle}
            />
          </RouterLink>

          {showExtended && <Badge artwork={artwork} width={this.imageWidth} />}

          <SaveButton
            {...userSpread}
            mediator={mediator}
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
}

export const FillwidthItem = styled(FillwidthItemContainer)<
  FillwidthItemContainerProps
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

export default createFragmentContainer(withSystemContext(FillwidthItem), {
  artwork: graphql`
    fragment FillwidthItem_artwork on Artwork {
      image {
        url(version: "larger")
        aspectRatio
      }
      imageTitle
      title
      href
      ...Metadata_artwork
      ...SaveButton_artwork
      ...Badge_artwork
    }
  `,
})
