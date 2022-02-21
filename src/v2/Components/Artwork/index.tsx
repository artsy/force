import { Artwork_artwork$data } from "v2/__generated__/Artwork_artwork.graphql"
import * as React from "react"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import theme from "../../Assets/Theme"
import Metadata from "./Metadata"

const Container = styled.div`
  width: 100%;
`

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & .overlay-container {
    transition: opacity 0.25s;

    &.hovered {
      opacity: 0;
      visibility: hidden;
    }

    &.selected {
      opacity: 1;
      visibility: visible;
    }
  }

  &:hover {
    & .overlay-container.hovered {
      ${css`
        @media (min-width: ${theme.flexboxgrid.breakpoints.sm + 1}px) {
          opacity: 1;
          visibility: visible;
        }
      `};
    }
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`

export interface OverlayProps {
  selected: boolean
}

export interface ArtworkProps {
  extended?: boolean
  Overlay?: React.SFC<OverlayProps>
  artwork: Artwork_artwork$data
  onSelect?: (selected: boolean) => void
  showOverlayOnHover?: boolean
}

export interface ArtworkState {
  isSelected: boolean
}

export class Artwork extends React.Component<ArtworkProps, ArtworkState> {
  static defaultProps = {
    extended: true,
    overlay: null,
    showOverlayOnHover: false,
  }

  state = {
    isSelected: false,
  }

  onSelected = () => {
    if (!this.props.Overlay) {
      return
    }

    this.setState({
      isSelected: !this.state.isSelected,
    })

    if (this.props.onSelect) {
      this.props.onSelect(!this.state.isSelected)
    }
  }

  render() {
    const { artwork, Overlay, showOverlayOnHover } = this.props
    let overlayClasses = "overlay-container"

    overlayClasses += showOverlayOnHover ? " hovered" : ""
    overlayClasses += this.state.isSelected ? " selected" : ""

    return (
      <Container onClick={this.onSelected}>
        <ImageContainer>
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <Image src={artwork.image.url} />
          <div className={overlayClasses}>
            {Overlay && <Overlay selected={this.state.isSelected} />}
          </div>
        </ImageContainer>
        <Metadata extended={this.props.extended} artwork={artwork} />
      </Container>
    )
  }
}

export default createFragmentContainer(Artwork, {
  artwork: graphql`
    fragment Artwork_artwork on Artwork {
      slug
      image {
        url(version: "large")
        aspect_ratio: aspectRatio
      }
      ...Metadata_artwork
    }
  `,
})
