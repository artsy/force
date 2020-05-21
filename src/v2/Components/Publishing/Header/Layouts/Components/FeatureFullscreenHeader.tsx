import { space } from "@artsy/palette"
import { PartnerInline } from "v2/Components/Publishing/Partner/PartnerInline"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { resize } from "../../../../../Utils/resizer"
import { pMedia } from "../../../../Helpers"
import { EditImage, FeatureHeaderProps } from "../FeatureHeader"
import { FeatureInnerContent } from "./FeatureInnerContent"

export const FeatureFullscreenHeader: React.SFC<FeatureHeaderProps> = props => {
  const {
    article: { hero_section, is_super_article, seriesArticle, super_article },
    editImage,
  } = props
  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const src =
    !isVideo && url.length && resize(url, { width: !sd.IS_MOBILE ? 2000 : 600 })
  const hasNav = seriesArticle || super_article || is_super_article

  return (
    <FeatureHeaderContainer hasNav={hasNav || editImage}>
      <FeatureAssetContainer src={src ? src : undefined}>
        {editImage && <EditImage>{editImage}</EditImage>}
        {isVideo && (
          <FeatureVideo
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
          />
        )}
      </FeatureAssetContainer>
      <Overlay />

      <HeaderTextContainer hasLogos={is_super_article}>
        {is_super_article && (
          <PartnerInline
            logo={
              super_article.partner_fullscreen_header_logo ||
              super_article.partner_logo
            }
            url={super_article.partner_logo_link}
            color="white"
            trackingData={{
              label: "Clicked primary partner logo",
              impression_type: "sa_primary_logo",
              destination_path: super_article.partner_logo_link,
              context_type: "article_fixed",
            }}
          />
        )}
        <FeatureInnerContent {...props} />
      </HeaderTextContainer>
    </FeatureHeaderContainer>
  )
}

const Overlay = styled.div`
  position: absolute;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3)
  );
`

const HeaderTextContainer = styled.div.attrs<{ hasLogos?: boolean }>({})`
  height: 100%;
  text-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.hasLogos ? "space-between" : "flex-end")};

  .PartnerInline {
    position: relative;
  }
  ${pMedia.xs`
    padding: ${space(2)}px;
  `};
`

const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const FeatureAssetContainer = styled.div.attrs<{ src?: string }>({})`
  width: 100%;
  height: 100%;
  right: 0;
  position: absolute;
  overflow: hidden;
  ${props =>
    props.src &&
    `
    background-image: url(${props.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `};
`

export const FeatureHeaderContainer = styled.div.attrs<{ hasNav?: boolean }>(
  {}
)`
  width: 100%;
  position: relative;
  height: ${props => (props.hasNav ? "100vh" : "calc(100vh - 61px)")};
  ${props =>
    !props.hasNav &&
    `
    margin-top: 61px;
  `};
`
