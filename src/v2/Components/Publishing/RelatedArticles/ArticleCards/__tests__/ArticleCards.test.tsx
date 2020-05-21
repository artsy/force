import {
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ArticleCard } from "../ArticleCard"
import { ArticleCards } from "../ArticleCards"

describe("ArticleCard", () => {
  it("renders properly", () => {
    const component = renderer
      .create(
        <ArticleCards relatedArticles={[StandardArticle, VideoArticle]} />
      )
      .toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders a list of articles properly", () => {
    const component = mount(
      <ArticleCards relatedArticles={[StandardArticle, VideoArticle]} />
    )
    expect(component.find(ArticleCard).length).toBe(2)
  })

  it("renders a list of articles in a series properly", () => {
    const component = mount(
      <ArticleCards
        series={SeriesArticleSponsored}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
    expect(component.find(ArticleCard).length).toBe(2)
  })
})
