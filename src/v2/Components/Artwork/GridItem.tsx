import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Image as BaseImage, color } from "@artsy/palette"
import { GridItem_artwork } from "v2/__generated__/GridItem_artwork.graphql"
import { Mediator } from "v2/Artsy"
import { withSystemContext } from "v2/Artsy"
import { isFunction } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { userIsAdmin } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import SaveButton from "./Save"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

let IMAGE_LAZY_LOADING = true

const Placeholder = styled.div`
  background-color: ${color("black10")};
  position: relative;
  width: 100%;
  overflow: hidden;
`

const Image = styled(BaseImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /**
   * HACK: the border here is to hack around an issue where Chrome doesn't
   * pick up the lazyLoad intersection observer unless there's a border around
   * the element or some modification to the sub-tree occurs. 'box-sizing' is set
   * to 'content-box' so the image appears to be the same dimensions.
   */
  border: 1px solid transparent;
  box-sizing: content-box;
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
    const imageURL = this.props.artwork.image.url
    if (!imageURL) {
      return null
    }

    const width = 400
    const height = Math.floor(width / this.props.artwork.image.aspect_ratio)
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

    let userSpread = {}
    if (user) {
      userSpread = { user }
    }
    const isAdmin = userIsAdmin(user)

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
        <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
          <RouterLink
            to={artwork.href}
            onClick={() => {
              if (this.props.onClick) {
                this.props.onClick()
              }
            }}
          >
            <Image
              title={artwork.title}
              alt={artwork.image_title}
              src={this.getImageUrl()}
              lazyLoad={IMAGE_LAZY_LOADING && lazyLoad}
              preventRightClick={!isAdmin}
            />
          </RouterLink>

          <Badge artwork={artwork} />

          {this.canHover && (
            <SaveButton
              className="artwork-save"
              contextModule={
                this.props.contextModule || ContextModule.artworkGrid
              }
              artwork={artwork}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
              {...userSpread}
              mediator={this.props.mediator}
            />
          )}
        </Placeholder>

        <Metadata artwork={artwork} />
      </div>
    )
  }
}

export const ArtworkGridItem = styled(ArtworkGridItemContainer)`
  .artwork-save {
    opacity: 0;
  }

  &:hover .artwork-save {
    opacity: 1;
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
      href
      ...Metadata_artwork
      ...Save_artwork
      ...Badge_artwork
    }
  `,
})
