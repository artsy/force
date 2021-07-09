import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Image as BaseImage, color } from "@artsy/palette"
import { GridItem_artwork } from "v2/__generated__/GridItem_artwork.graphql"
import { withSystemContext } from "v2/System"
import { isFunction } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { userIsTeam } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import {
  SaveButtonFragmentContainer as SaveButton,
  Container,
} from "./SaveButton"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Mediator } from "lib/mediator"

let IMAGE_LAZY_LOADING = true

const Placeholder = styled.div`
  background-color: ${color("black10")};
  position: relative;
  width: 100%;
`

const Link = styled(RouterLink)`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Image = styled(BaseImage)`
  display: block;
  width: 100%;
  height: 100%;
`

interface Props extends React.HTMLProps<ArtworkGridItemContainer> {
  artwork: GridItem_artwork
  contextModule?: AuthContextModule
  lazyLoad?: boolean
  mediator?: Mediator
  onClick?: () => void
  style?: any
  user?: User
}

interface State {
  isMounted: boolean
}

const IMAGE_QUALITY = 80

class ArtworkGridItemContainer extends React.Component<Props, State> {
  state = {
    isMounted: false,
  }

  canHover: boolean

  componentDidMount() {
    this.setState({
      isMounted: true,
    })

    // Satisfy test runner. See https://github.com/artsy/reaction/blob/master/src/setup_jest.ts#L28
    if (isFunction(window.matchMedia)) {
      this.canHover = !window.matchMedia("(hover: none)").matches
    }
    IMAGE_LAZY_LOADING =
      sd.IMAGE_LAZY_LOADING || process.env.IMAGE_LAZY_LOADING === "true"
  }

  getImageUrl() {
    // @ts-expect-error STRICT_NULL_CHECK
    const imageURL = this.props.artwork.image.url
    if (!imageURL) {
      return null
    }

    const width = 400
    // @ts-expect-error STRICT_NULL_CHECK
    const height = Math.floor(width / this.props.artwork.image.aspect_ratio)
    // @ts-expect-error STRICT_NULL_CHECK
    const type = this.props.artwork.image.aspect_ratio ? "fit" : "fill" // Either scale or crop, based on if an aspect ratio is available.
    const geminiUrl =
      sd.GEMINI_CLOUDFRONT_URL || process.env.GEMINI_CLOUDFRONT_URL // fallback, useful if we're yarn linking

    const url = `${geminiUrl}/?resize_to=${type}&width=${width}&height=${height}&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(imageURL)}` // prettier-ignore
    return url
  }

  get shouldTrackArtworkImpressions() {
    let track = false
    if (this.state.isMounted) {
      track = window.location.pathname.includes("/collect")
    }
    return track
  }

  render() {
    const { style, className, artwork, user, lazyLoad = true } = this.props
    const isTeam = userIsTeam(user)

    // the 'artwork-item' className and data-id={artwork._id} are required to
    // track Artwork impressions
    const trackableClassName = this.shouldTrackArtworkImpressions
      ? "artwork-item"
      : ""

    return (
      <div
        className={`${className} ${trackableClassName}`}
        data-id={artwork.internalID}
        data-test="artworkGridItem"
        style={style}
      >
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
          <Link
            to={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
            aria-label={`${artwork.title} by ${artwork.artistNames}`}
          >
            <Image
              // @ts-expect-error STRICT_NULL_CHECK
              title={artwork.title}
              // @ts-expect-error STRICT_NULL_CHECK
              alt={artwork.image_title}
              // @ts-expect-error STRICT_NULL_CHECK
              src={this.getImageUrl()}
              lazyLoad={IMAGE_LAZY_LOADING && lazyLoad}
              preventRightClick={!isTeam}
            />
          </Link>

          <Badge artwork={artwork} />

          {this.canHover && (
            <SaveButton
              contextModule={
                this.props.contextModule || ContextModule.artworkGrid
              }
              artwork={artwork}
            />
          )}
        </Placeholder>

        <Metadata artwork={artwork} />
      </div>
    )
  }
}

export const ArtworkGridItem = styled(ArtworkGridItemContainer)`
  &:hover {
    ${Container} {
      opacity: 1;
    }
  }
`

export default createFragmentContainer(withSystemContext(ArtworkGridItem), {
  artwork: graphql`
    fragment GridItem_artwork on Artwork {
      internalID
      title
      image_title: imageTitle
      image {
        placeholder
        url(version: "large")
        aspect_ratio: aspectRatio
      }
      artistNames
      href
      ...Metadata_artwork
      ...SaveButton_artwork
      ...Badge_artwork
    }
  `,
})
