import { mount, shallow } from "enzyme"
import { App } from "../App"
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import { ArticleLayout } from "../layouts/Article"
import {
  FeatureArticle,
  NewsArticle,
  SeriesArticle,
  StandardArticle,
  VideoArticle,
} from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import React from "react"

describe("App", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<App {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: StandardArticle,
    }
  })

  it.only("renders a standard article", () => {
    const component = getWrapper()

    expect(component.find(Article).length).toBe(1)
    expect(component.find(ArticleLayout).length).toBe(1)
    expect(component.html()).toMatch("StandardLayout")
  })

  it("renders a feature article", () => {
    props.article = FeatureArticle
    const component = getWrapper()

    expect(component.find(Article).length).toBe(1)
    expect(component.find(ArticleLayout).length).toBe(1)
    expect(component.html()).toMatch("FeatureLayout")
  })

  it("renders a series article", () => {
    props.article = SeriesArticle
    const component = getWrapper()

    expect(component.find(Article).length).toBe(1)
    expect(component.find(ArticleLayout).length).toBe(0)
    expect(component.html()).toMatch("Series")
  })

  it("renders a video article", () => {
    props.article = VideoArticle
    const component = getWrapper()

    expect(component.find(Article).length).toBe(1)
    expect(component.find(ArticleLayout).length).toBe(0)
    expect(component.html()).toMatch("Video")
  })

  it("renders a news article", () => {
    props.article = NewsArticle
    const component = shallow(<App {...props} />)

    expect(component.html()).toMatch("News")
  })
})
