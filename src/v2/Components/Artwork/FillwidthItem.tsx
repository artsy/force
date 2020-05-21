import { AuthContextModule } from "@artsy/cohesion"
import { Image } from "@artsy/palette"
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

const logger = createLogger("FillwidthItem.tsx")

const IMAGE_QUALITY = 80

const ImageLink = styled.a`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  position: relative;
  width: 100%;
`

export interface FillwidthItemContainerProps
  extends SystemContextProps,
  React.HTMLProps<FillwidthItemContainer> {
  artwork: FillwidthItem_artwork
  contextModule: AuthContextModule
  imageHeight?: number
  margin?: number
  showExtended?: boolean
  showMetadata?: boolean
  mediator?: Mediator
  onClick?: () => void
  targetHeight?: number
  width?: number
  lazyLoad?: boolean
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

    const imageWidth = Math.floor(this.imageHeight * aspect_ratio)
    return imageWidth
  }

  get imageHeight() {
    // During the SSR render pass we don't have access to window pixel data so
    // default to high density screen.
    const devicePixelRatio =
      typeof window === "undefined" ? 2 : window.devicePixelRatio

    return this.props.imageHeight * devicePixelRatio
  }

  getImageUrl() {
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

    // tslint:disable-next-line:max-line-length
    return `${getENV("GEMINI_CLOUDFRONT_URL")}/?resize_to=${type}&width=${
      this.imageWidth
      }&height=${
      this.imageHeight
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
        <Placeholder style={{ height: targetHeight }}>
          <ImageLink
            href={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
          >
            <Image
              src={this.getImageUrl()}
              width="100%"
              height={imageHeight}
              lazyLoad={lazyLoad}
              preventRightClick={!isAdmin}
            />
          </ImageLink>

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
        {showMetadata && <Metadata artwork={artwork} extended={showExtended} />}
      </div>
    )
  }
}

export const FillwidthItem = styled(FillwidthItemContainer).attrs<
  FillwidthItemContainerProps
>({})`
  display: inline-block;
  width: ${props => props.width}px;
  vertical-align: top;
  margin-right: ${props => props.margin || 0}px;

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
      href
      ...Metadata_artwork
      ...Save_artwork
      ...Badge_artwork
    }
  `,
})
