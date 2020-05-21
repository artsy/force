import { ImagesData } from "v2/Components/Publishing/Typings"
import { find } from "lodash"
import React from "react"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions, {
  FillWidthItemDimensions,
} from "../../../Utils/fillwidth"
import { pMedia } from "../../Helpers"
import { SIZE_ME_REFRESH_RATE } from "../Constants"
import { ArticleLayout, SectionLayout } from "../Typings"
import { Artwork } from "./Artwork"
import { Image } from "./Image"

export interface ImageCollectionProps {
  color?: string
  images: ImagesData
  targetHeight?: number
  gutter?: number
  sectionLayout?: SectionLayout
  articleLayout?: ArticleLayout
  size?: {
    width: number
  }
  fullscreenImages: ImagesData
}

class ImageCollectionComponent extends React.PureComponent<
  ImageCollectionProps,
  null
  > {
  static defaultProps = {
    size: {
      width: 680,
    },
  }

  renderImages(dimensions: FillWidthItemDimensions[]) {
    const {
      articleLayout,
      color,
      gutter,
      images,
      sectionLayout,
      size: { width },
      fullscreenImages,
    } = this.props

    const renderedImages = images.map((image, i) => {
      const url = image.url || image.image

      let imageSize
      if (width <= 600 || dimensions.length === 1) {
        imageSize = {}
      } else {
        imageSize = find(dimensions, ["id", url])
      }

      const slideshowIndex =
        fullscreenImages &&
        fullscreenImages.findIndex(img => {
          return img.url === image.url
        })

      let renderedImage
      if (image.type === "image") {
        renderedImage = (
          <Image
            image={image}
            color={color}
            sectionLayout={sectionLayout}
            layout={articleLayout}
            width={imageSize.width}
            height={imageSize.height}
            slideshowIndex={slideshowIndex}
          />
        )
      } else if (image.type === "artwork") {
        renderedImage = (
          <Artwork
            artwork={image}
            color={color}
            sectionLayout={sectionLayout}
            layout={articleLayout}
            width={imageSize.width}
            height={imageSize.height}
            slideshowIndex={slideshowIndex}
          />
        )
      } else {
        return false
      }

      const margin = i === dimensions.length - 1 ? 0 : gutter

      return (
        <ImageCollectionItem key={i} margin={margin} width={imageSize.width}>
          {renderedImage}
        </ImageCollectionItem>
      )
    })
    return renderedImages
  }

  render() {
    const { gutter, images, size, targetHeight } = this.props
    const dimensions = fillwidthDimensions(
      images,
      size.width,
      gutter,
      targetHeight
    )
    const renderedImages = this.renderImages(dimensions)

    return <ImageCollectionContainer>{renderedImages}</ImageCollectionContainer>
  }
}

const ImageCollectionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  ${pMedia.xs`
    flex-direction: column;
  `};
`

export const ImageCollectionItem = styled.div<{
  margin?: number
  width?: number
}>`
  margin-right: ${props => (props.margin ? props.margin + "px" : "0px")};
  width: ${props => (props.width ? props.width + "px" : "100%")};
  max-width: 100%;

  img {
    max-width: 100%;
    height: auto;
  }

  ${pMedia.xs`
    margin-bottom: 10px;
    width: 100%;

    img {
      width: 100%;
    }
  `};
`

const sizeMeOptions = {
  refreshRate: SIZE_ME_REFRESH_RATE,
  noPlaceholder: true,
}

export const ImageCollection = sizeMe(sizeMeOptions)(ImageCollectionComponent)
