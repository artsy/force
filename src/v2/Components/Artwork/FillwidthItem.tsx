import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image } from "@artsy/palette"
import { FillwidthItem_artwork } from "v2/__generated__/FillwidthItem_artwork.graphql"
import { SystemContextProps } from "v2/Artsy"
import { Mediator } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { getENV } from "v2/Utils/getENV"
import createLogger from "v2/Utils/logger"
import { userIsAdmin } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import SaveButton from "./Save"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

const logger = createLogger("FillwidthItem.tsx")

const IMAGE_QUALITY = 80

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
  // TODO: probably should be required or have a sensible default
  imageHeight?: number
  lazyLoad?: boolean
  marginLeft?: number
  marginRight?: number
  mediator?: Mediator
  onClick?: () => void
  showExtended?: boolean
  showMetadata?: boolean
  targetHeight?: number
  width?: number
}

export class FillwidthItemContainer extends React.Component<
  FillwidthItemContainerProps
> {
  static defaultProps = {
    showMetadata: true,
  }

  get imageWidth() {
    const {
      artwork: {
        image: { aspect_ratio },
      },
    } = this.props

    const imageWidth = Math.floor(this.props.imageHeight * aspect_ratio)
    return imageWidth
  }

  get imageHeight() {
    return this.props.imageHeight
  }

  getImageUrl(pixelRatio = 1) {
    const imageURL = this.props.artwork.image.url

    if (!imageURL) {
      return null
    }

    const {
      artwork: {
        image: { aspect_ratio },
      },
    } = this.props

    // Either scale or crop, based on if an aspect ratio is available.
    const type = aspect_ratio ? "fit" : "fill"

    return `${getENV("GEMINI_CLOUDFRONT_URL")}/?resize_to=${type}&width=${
      this.imageWidth * pixelRatio
    }&height=${
      this.imageHeight * pixelRatio
    }&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(imageURL)}`
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
      targetHeight,
      user,
      hidePartnerName,
      hideArtistName,
    } = this.props

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }
    const isAdmin = userIsAdmin(user)

    const image = get(this.props, p => p.artwork.image)
    if (!image) {
      const href = get(this.props, p => p.artwork.href, "(unknown href)")
      logger.error(`Artwork at ${href} does not have an image!`)
      return null
    }

    return (
      <div className={className}>
        <Placeholder style={{ height: targetHeight, width: this.imageWidth }}>
          <RouterLink
            to={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
          >
            <Image
              src={this.getImageUrl(1)}
              srcSet={`${this.getImageUrl(1)} 1x, ${this.getImageUrl(2)} 2x`}
              width="100%"
              height={imageHeight}
              lazyLoad={lazyLoad}
              preventRightClick={!isAdmin}
              alt={artwork?.imageTitle}
            />
          </RouterLink>

          {showExtended && <Badge artwork={artwork} width={this.imageWidth} />}

          <SaveButton
            {...userSpread}
            mediator={mediator}
            contextModule={contextModule}
            className="artwork-save"
            artwork={artwork}
            style={{ position: "absolute", right: "5px", bottom: "5px" }}
          />
        </Placeholder>

        {showMetadata && (
          <Metadata
            artwork={artwork}
            extended={showExtended}
            hidePartnerName={hidePartnerName}
            hideArtistName={hideArtistName}
          />
        )}
      </div>
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

  .artwork-save {
    opacity: 0;
  }

  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(FillwidthItem, {
  artwork: graphql`
    fragment FillwidthItem_artwork on Artwork {
      image {
        url(version: "large")
        aspect_ratio: aspectRatio
      }
      imageTitle
      title
      href
      ...Metadata_artwork
      ...Save_artwork
      ...Badge_artwork
    }
  `,
})
