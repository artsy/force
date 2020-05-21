import { Box, Flex, media, space } from "@artsy/palette"
import { BylineContainer } from "v2/Components/Publishing/Byline/Byline"
import React from "react"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { Media } from "v2/Utils/Responsive"
import { EditImage, FeatureHeaderProps } from "../FeatureHeader"
import {
  FeatureInnerContent,
  FeatureInnerSubContent,
  SubContentContainer,
  TextContainer,
  Title,
} from "./FeatureInnerContent"

export const FeatureSplitHeader: React.SFC<FeatureHeaderProps> = props => {
  const {
    article: { hero_section, seriesArticle },
    editImage,
  } = props

  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const src = !isVideo && url.length && resize(url, { width: 1600 })

  return (
    <FeatureSplitHeaderContainer
      hasNav={(seriesArticle || editImage) && true}
      justifyContent="space-between"
      flexDirection={["column", "column", "row", "row"]}
    >
      <HeaderTextContainer width={["100%", "100%", "50%", "50%"]} p={20}>
        <FeatureInnerContent {...props} />
      </HeaderTextContainer>

      <FeatureAssetContainer
        width={["100%", "100%", "50%", "50%"]}
        p={[0, 0, 20, 20]}
      >
        {editImage && <EditImage>{editImage}</EditImage>}
        {isVideo ? (
          <FeatureVideo
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
          />
        ) : (
            src && (
              <ImageContainer src={src}>
                <Img src={src} />
              </ImageContainer>
            )
          )}
      </FeatureAssetContainer>

      <Media lessThan="md">
        <HeaderTextContainer width="100%" px={20}>
          <FeatureInnerSubContent {...props} />
        </HeaderTextContainer>
      </Media>
    </FeatureSplitHeaderContainer>
  )
}

const HeaderTextContainer = styled(Box)`
  ${TextContainer} {
    height: 100%;
    justify-content: space-between;
  }

  ${SubContentContainer} {
    display: block;
  }

  ${BylineContainer} {
    margin-top: ${space(3)}px;
  }

  ${media.md`
    ${Title} {
      margin-bottom: 20px;
    }
    ${TextContainer} {
      ${SubContentContainer} {
        display: none;
      }
    }
  `};
`

const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${media.md`
    height: auto;
  `};
`

export const FeatureAssetContainer = styled(Box)`
  flex: 1;
  overflow: hidden;
  position: relative;

  img {
    display: none;
  }

  ${media.md`
    height: fit-content;
    overflow: inherit;

    img {
      display: block;
    }
  `};
`

const ImageContainer = styled.div<{ src?: string }>`
  ${props =>
    props.src &&
    `
  background-image: url(${props.src});
  `};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;

  ${media.md`
    height: fit-content;
    ${props =>
      props.src &&
      `
      background-image: none;
      height: fit-content;
    `}
  `};
`

const Img = styled.img`
  width: 100%;
`

export const FeatureSplitHeaderContainer = styled(Flex) <{
  hasNav?: boolean
}>`
  height: ${props => (props.hasNav ? "100vh" : "calc(100vh - 61px)")};
  min-height: fit-content;

  ${props =>
    !props.hasNav &&
    `
    margin-top: 61px;
  `};
`
