import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { DisplayAd } from "v2/Components/Publishing/Display/DisplayAd"
import {
  FeatureArticle,
  SeriesArticle,
  SeriesArticleSponsored,
} from "v2/Components/Publishing/Fixtures/Articles"
import { RelatedCanvas } from "v2/Components/Publishing/Fixtures/Components"
import { Nav } from "v2/Components/Publishing/Nav/Nav"
import { ArticleCardsBlock } from "v2/Components/Publishing/RelatedArticles/ArticleCards/Block"
import { RelatedArticlesCanvas } from "v2/Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { SeriesAbout } from "v2/Components/Publishing/Series/SeriesAbout"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import { FeatureLayout } from "../FeatureLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)
jest.mock("Artsy/Analytics/useTracking")

const trackEvent = jest.fn()
beforeEach(() => {
  ; (useTracking as jest.Mock).mockImplementation(() => {
    return {
      trackEvent,
    }
  })
})

it("renders RelatedArticlesCanvas if article is not super or in a series", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(1)
})

it("Does not render RelatedArticlesCanvas if article is super", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
      isSuper
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(0)
})

it("Does not render RelatedArticlesCanvas if article is in a series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout
      article={Article}
      relatedArticlesForCanvas={RelatedCanvas}
      isSuper
    />
  )
  expect(article.find(RelatedArticlesCanvas).length).toBe(0)
})

it("renders a nav if article is in a series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(Nav).length).toBe(1)
})

it("renders display ads when feature ", () => {
  const article = mount(
    <FeatureLayout
      article={FeatureArticle}
      relatedArticlesForCanvas={RelatedCanvas}
    />
  )
  expect(article.find(DisplayAd).length).toBe(2)
})

it("does not render a nav if article has a non-fullscreen header", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    hero_section: {
      type: "basic",
    },
    seriesArticle: SeriesArticle,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(Nav).length).toBe(0)
})

it("renders related article cards if in a series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticle,
    relatedArticles: [FeatureArticle],
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(ArticleCardsBlock).length).toBe(1)
})

it("renders sponsor info if in a sponsored series", () => {
  const Article = extend(cloneDeep(FeatureArticle), {
    seriesArticle: SeriesArticleSponsored,
  })
  const article = mount(
    <FeatureLayout article={Article} relatedArticlesForCanvas={RelatedCanvas} />
  )
  expect(article.find(SeriesAbout).length).toBe(1)
})
