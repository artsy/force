import { Button } from "@artsy/palette"
import {
  ClassicArticle,
  ClassicArticlePartner,
  ClassicArticleSale,
} from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import React from "react"
import { ClassicPromotedContent } from "../ClassicPromotedContent"

describe("FeatureBasicHeader", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<ClassicPromotedContent {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: Object.assign({}, ClassicArticle),
    }
  })

  it("Renders expected content for partner galleries", () => {
    props.article.partner = ClassicArticlePartner
    const component = getWrapper()
    expect(component.text()).toMatch("Promoted Content")
    expect(component.text()).toMatch("Contessa Gallery")
    expect(component.find(Button).text()).toMatch("Explore Gallery")
    expect(component.html()).toMatch("square.jpg")
  })

  it("Renders expected content for auctions", () => {
    props.article.sale = ClassicArticleSale
    const component = getWrapper()
    expect(component.text()).toMatch("Promoted Content")
    expect(component.text()).toMatch("ICI: Benefit Auction 2019")
    expect(component.find(Button).text()).toMatch("Explore Auction")
    expect(component.html()).toMatch("large_rectangle.jpg")
  })
})
