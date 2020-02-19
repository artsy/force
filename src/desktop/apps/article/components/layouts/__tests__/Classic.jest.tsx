import React from "react"
import { ClassicArticleLayout } from "../Classic"
import { mount } from "enzyme"
import {
  ClassicArticle,
  ClassicArticleInternalChannel,
  ClassicArticlePromotedContent,
} from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
jest.mock("desktop/collections/articles.coffee")
jest.mock("desktop/components/articles_grid/view.coffee")
const ArticlesGridView = require("desktop/components/articles_grid/view.coffee") as jest.Mock

describe("ClassicArticleLayout", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<ClassicArticleLayout {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: ClassicArticle,
      templates: {
        ArticlesGridView: "articles-grid-view",
      },
    }
  })

  it("renders an article", () => {
    const component = getWrapper()
    expect(component.html()).toMatch("ClassicHeader")
    expect(component.html()).toMatch(
      "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple"
    )
    expect(component.html()).toMatch("Joanne Artman Gallery")
  })

  it("renders a team-channel article", () => {
    props.article = ClassicArticleInternalChannel
    const component = getWrapper()
    expect(component.html()).toMatch("ClassicHeader")
    expect(component.html()).toMatch("Consignments Intern")
    expect(component.html()).toMatch("Artsy Jobs")
  })

  it("renders a sponsored article", () => {
    props.article = ClassicArticlePromotedContent
    const component = getWrapper()
    expect(component.html()).toMatch("ClassicHeader")
    expect(component.html()).toMatch("Promoted Content")
    expect(component.html()).toMatch(
      "ICI: Benefit Auction 2019 Curatorial Committee Picks"
    )
    expect(component.html()).toMatch("Independent Curators International")
  })

  it("renders ArticlesGrid", () => {
    props.article = ClassicArticleInternalChannel
    const component = getWrapper()
    expect(component.html()).toMatch("articles-grid-view")
    expect(ArticlesGridView).toBeCalled()
    expect(ArticlesGridView.mock.calls[0][0].header).toMatch(
      "More from Artsy Jobs"
    )
  })
})
