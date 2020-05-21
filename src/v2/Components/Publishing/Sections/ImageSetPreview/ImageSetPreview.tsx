import { color as Color, Flex } from "@artsy/palette"
import { withFullScreen } from "v2/Components/Publishing/Sections/FullscreenViewer/withFullScreen"
import { ImagesData } from "v2/Components/Publishing/Typings"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { ImageSetLabel } from "./ImageSetLabel"

type Layout = "mini" | "full"

export interface ImageSetSection {
  type: string
  images: ImagesData
  layout?: Layout
  title?: string
}

export interface ImageSetPreviewProps {
  color?: string
  section: ImageSetSection
  children?: ReactNode
  onViewFullscreen?: (index: number) => void
  fullscreenImages?: ImagesData
}

@withFullScreen
export class ImageSetPreview extends React.PureComponent<ImageSetPreviewProps> {
  getImageUrl() {
    const { images, layout } = this.props.section
    const image = images[0]
    const src = image.url ? image.url : image.image
    const width = layout === "full" ? 800 : 200

    return resize(src, { width })
  }

  onClick = () => {
    const {
      fullscreenImages,
      section: { images },
    } = this.props
    const slideshowIndex =
      fullscreenImages &&
      fullscreenImages.findIndex(img => {
        return img.type === "artwork"
          ? img.image === images[0].image
          : img.url === images[0].url
      })

    this.props.onViewFullscreen(slideshowIndex)
  }

  render() {
    const {
      children,
      color,
      section: { layout, title },
    } = this.props
    const alt = title || "Open Slideshow"
    const src = this.getImageUrl()

    if (layout === "full") {
      return (
        <ImageSetContainer>
          <FullLabel onClick={this.onClick}>
            <ImageSetLabel {...this.props} />
            {children}
          </FullLabel>
          <ImgContainer>
            <Img src={src} alt={alt} />
          </ImgContainer>
        </ImageSetContainer>
      )
    } else {
      return (
        <ImageSetContainer>
          <MiniWrapper alignItems="center" onClick={this.onClick} color={color}>
            <Img src={src} alt={alt} />
            <ImageSetLabel {...this.props} />
          </MiniWrapper>
        </ImageSetContainer>
      )
    }
  }
}

export const ImageSetContainer = styled.div`
  position: relative;
  width: 100%;
`

export const FullLabel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  min-height: 50px;
  width: auto;
  max-width: calc(100% - 80px);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;

    path,
    polygon {
      fill: white;
    }
  }
`

export const Img = styled.img`
  height: auto;
  width: 100%;
`

export const ImgContainer = styled.div``

const MiniWrapper = styled(Flex) <{ color?: string }>`
  height: 100px;
  padding: 10px 0 10px 10px;
  border: 1px solid ${props => (props.color ? props.color : Color("black10"))};
  cursor: pointer;

  ${Img} {
    height: 100%;
    width: auto;
  }
`
