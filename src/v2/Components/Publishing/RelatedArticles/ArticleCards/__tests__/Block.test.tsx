import {
  FeatureArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { VerticalOrSeriesTitle } from "v2/Components/Publishing/Sections/VerticalOrSeriesTitle"
import { SeriesAbout } from "v2/Components/Publishing/Series/SeriesAbout"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { ArticleCard } from "../ArticleCard"
import { ArticleCardsBlock } from "../Block"

describe("ArticleCard", () => {
  it("renders properly", () => {
    const component = renderer
      .create(
        <ArticleCardsBlock
          article={StandardArticle}
          relatedArticles={[StandardArticle, VideoArticle]}
        />
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders a list of articles properly", () => {
    const component = mount(
      <ArticleCardsBlock
        article={StandardArticle}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
    expect(component.text()).toMatch(StandardArticle.vertical.name)
    expect(component.find(ArticleCard).length).toBe(2)
  })

  it("renders a list of articles in a series properly", () => {
    const FeatureSeriesArticle = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticleSponsored,
    })
    const component = mount(
      <ArticleCardsBlock
        article={FeatureSeriesArticle}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
    expect(component.find(VerticalOrSeriesTitle).length).toBe(1)
    expect(component.find(VerticalOrSeriesTitle).text()).toMatch(
      SeriesArticleSponsored.title
    )
    expect(component.find(ArticleCard).length).toBe(2)
    expect(component.find(SeriesAbout).length).toBe(1)
  })
})
