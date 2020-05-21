import { ArticleProps } from "v2/Components/Publishing/Article"
import { isEditorialSponsored } from "v2/Components/Publishing/utils/Sponsored"
import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { Nav, NavContainer } from "../Nav/Nav"
import {
  ArticleCardsBlock,
  ArticleCardsContainer,
} from "../RelatedArticles/ArticleCards/Block"
import { Sections } from "../Sections/Sections"
import { CanvasFooter } from "./Components/CanvasFooter"

export const FeatureLayout: React.SFC<ArticleProps> = props => {
  const {
    article,
    backgroundColor,
    color,
    customEditorial,
    isMobile,
    isSuper,
    relatedArticlesForCanvas,
    showTooltips,
    showCollectionsRail,
  } = props
  const { seriesArticle } = article

  // TODO: Allow more hero types to use series nav
  const hasNav =
    seriesArticle &&
    article.hero_section &&
    article.hero_section.type === "fullscreen"
  const sponsor = (seriesArticle && seriesArticle.sponsor) || article.sponsor
  const isSponsored = isEditorialSponsored(sponsor)
  const seriesOrSuper = isSuper || seriesArticle

  return (
    <FeatureLayoutContainer backgroundColor={backgroundColor}>
      {hasNav && (
        <Nav
          canFix={false}
          color={color}
          sponsor={sponsor}
          title={seriesArticle.title}
          transparent
        />
      )}
      <Header article={article} textColor={color} />

      <FeatureLayoutContent>
        <Sections
          article={article}
          color={color}
          isMobile={isMobile}
          showTooltips={showTooltips}
          isSponsored={isSponsored}
          isSuper={isSuper}
        />
      </FeatureLayoutContent>

      {seriesArticle && <ArticleCardsBlock {...props} />}

      {relatedArticlesForCanvas && !seriesOrSuper && !customEditorial && (
        <CanvasFooter
          article={article}
          relatedArticles={relatedArticlesForCanvas}
          showCollectionsRail={showCollectionsRail}
        />
      )}
    </FeatureLayoutContainer>
  )
}

const FeatureLayoutContent = styled.div`
  display: flex;
  width: 100%;
`

const FeatureLayoutContainer = styled.div<{ backgroundColor?: string }>`
  position: relative;
  ${props =>
    props.backgroundColor &&
    `
    background-color: ${props.backgroundColor};
  `};

  ${NavContainer} {
    position: absolute;
  }

  ${ArticleCardsContainer} {
    padding-top: 60px;
  }
`
