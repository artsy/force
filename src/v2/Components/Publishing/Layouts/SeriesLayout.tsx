import { Box, color } from "@artsy/palette"
import { targetingData } from "v2/Components/Publishing/Display/DisplayTargeting"
import { Nav } from "v2/Components/Publishing/Nav/Nav"
import { ArticleCards } from "v2/Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import { FixedBackground } from "v2/Components/Publishing/Series/FixedBackground"
import { SeriesAbout } from "v2/Components/Publishing/Series/SeriesAbout"
import {
  SeriesTitle,
  SeriesTitleContainer,
} from "v2/Components/Publishing/Series/SeriesTitle"
import { AdDimension, AdUnit, ArticleData } from "v2/Components/Publishing/Typings"
import { isEditorialSponsored } from "v2/Components/Publishing/utils/Sponsored"
import React, { Component } from "react"
import styled from "styled-components"
import { DisplayAd } from "../Display/DisplayAd"

interface Props {
  article?: ArticleData
  backgroundColor?: string
  color?: string
  relatedArticles?: any
  isMobile?: boolean
}

export class SeriesLayout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  render() {
    const { article, backgroundColor, relatedArticles, isMobile } = this.props

    const { hero_section, sponsor } = article
    const isSponsored = isEditorialSponsored(sponsor)
    const backgroundUrl =
      hero_section && hero_section.url ? hero_section.url : ""
    const adDimension = isMobile
      ? AdDimension.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
      : AdDimension.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom

    return (
      <SeriesContainer
        color={this.props.color}
        backgroundColor={backgroundColor}
      >
        <Nav transparent sponsor={sponsor} canFix={false} />

        <FixedBackground
          backgroundColor={backgroundColor}
          backgroundUrl={backgroundUrl}
        />

        <SeriesContent sponsor={sponsor}>
          <SeriesTitle article={article} color={this.props.color} />

          {relatedArticles && (
            <ArticleCards
              relatedArticles={relatedArticles}
              series={article}
              color={this.props.color}
            />
          )}
          <Box maxWidth={1200} mx="auto" pt={[40, 40, 60]}>
            <SeriesAbout article={article} color={this.props.color} />
          </Box>
        </SeriesContent>
        <DisplayAd
          adUnit={
            isMobile
              ? AdUnit.Mobile_SponsoredSeriesLandingPageAndVideoPage_Bottom
              : AdUnit.Desktop_SponsoredSeriesLandingPageAndVideoPage_LeaderboardBottom
          }
          adDimension={adDimension}
          targetingData={targetingData(
            article,
            isSponsored ? "sponsorlanding" : "standardseries"
          )}
          isSeries
          articleSlug={article.slug}
        />
      </SeriesContainer>
    )
  }
}

SeriesLayout.defaultProps = {
  backgroundColor: color("black100"),
  color: "white",
}

interface ContainerProps {
  backgroundUrl?: string
  sponsor?: any
}

export const SeriesContent = styled.div<Props & ContainerProps>`
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  ${SeriesTitleContainer} {
    margin-bottom: ${props => (props.sponsor ? "60px" : "90px")};
  }
`
export const SeriesContainer = styled.div<Props & ContainerProps>`
  color: ${props => props.color};

  ${SeriesContent} {
    padding: 90px 20px 150px;
  }
`
