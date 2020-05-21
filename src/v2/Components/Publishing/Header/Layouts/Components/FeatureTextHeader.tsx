import { space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { EditImage, FeatureHeaderProps } from "../FeatureHeader"
import { FeatureInnerContent, Title } from "./FeatureInnerContent"

export const FeatureTextHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, date, editDeck, editImage, editVertical, editTitle } = props
  const { hero_section } = article

  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const alt = url.length ? article.title : ""
  const src = url.length && !isVideo && resize(url, { width: 1200 })

  return (
    <TextHeaderContainer isEditing={Boolean(editTitle)}>
      <FeatureInnerContent
        article={article}
        date={date}
        editDeck={editDeck}
        editVertical={editVertical}
        editTitle={editTitle}
      />

      <FeatureTextAsset>
        {editImage && <EditImage>{editImage}</EditImage>}
        {url &&
          (url.includes("mp4") ? (
            <video
              src={url}
              autoPlay
              controls={false}
              loop
              muted
              playsInline
              width="100%"
            />
          ) : (
              <Image src={src} alt={alt} />
            ))}
      </FeatureTextAsset>
    </TextHeaderContainer>
  )
}

const Image = styled.img`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

export const FeatureTextAsset = styled.div`
  width: 100%;
  padding-top: ${space(2)}px;
  box-sizing: border-box;
  position: relative;
`

const TextHeaderContainer = styled.div.attrs<{ isEditing?: boolean }>({})`
  width: 100%;
  position: relative;
  height: auto;
  padding: ${space(2)}px;
  margin-top: 50px;

  ${props =>
    props.isEditing &&
    `
    margin-top: 0;
  `};

  ${Title} {
    margin-bottom: 150px;
  }

  ${EditImage} {
    position: relative;
  }
`
