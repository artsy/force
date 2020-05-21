import React from "react"
import styled from "styled-components"
import { resize } from "../../../Utils/resizer"
import { GLOBAL_IMAGE_QUALITY } from "../Constants"
import { ArticleLayout, SectionLayout } from "../Typings"
import { ArtworkCaption } from "./ArtworkCaption"
import { ImageWrapper } from "./ImageWrapper"

export interface ArtworkProps {
  artwork: any
  color?: string
  editing?: boolean
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
  linked?: boolean
  width?: string | number
  height?: string | number
  slideshowIndex?: number
}

export class Artwork extends React.PureComponent<ArtworkProps> {
  static defaultProps = {
    linked: true,
    width: "100%",
    height: "auto",
  }

  render() {
    const {
      artwork,
      children,
      editing,
      linked,
      height,
      width,
      layout,
      slideshowIndex,
    } = this.props
    const src = resize(artwork.image, {
      width: 1200,
      quality: GLOBAL_IMAGE_QUALITY,
    })

    const Image = () => (
      <ImageWrapper
        editing={editing}
        layout={layout}
        linked={linked}
        src={src}
        width={width}
        height={height}
        alt={artwork.title}
        slideshowIndex={slideshowIndex}
      />
    )

    return (
      <ArtworkContainer>
        {linked ? (
          <ArtworkImageLink href={`/artwork/${artwork.slug}`}>
            <Image />
          </ArtworkImageLink>
        ) : (
          <Image />
        )}

        <ArtworkCaption {...this.props} />
        {children}
      </ArtworkContainer>
    )
  }
}

const ArtworkImageLink = styled.a`
  text-decoration: none;
`

const ArtworkContainer = styled.div`
  display: flex;
  flex-direction: column;
`
