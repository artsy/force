import { CollectionsRailContent } from "v2/Components/CollectionsRail"
import { StandardArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { RelatedCanvas } from "v2/Components/Publishing/Fixtures/Components"
import { RelatedArticlesCanvas } from "v2/Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { CanvasFooter } from "../CanvasFooter"

describe("CanvasFooter", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<CanvasFooter {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: StandardArticle,
    }
  })

  it("renders related articles if provided", () => {
    props.relatedArticles = RelatedCanvas
    const component = getWrapper()

    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
  })

  it("renders related articles", () => {
    props.relatedArticles = RelatedCanvas
    const component = getWrapper()

    expect(component.find(RelatedArticlesCanvas)).toHaveLength(1)
  })

  it("renders Collections Rail if props.showCollectionsRail", () => {
    props.showCollectionsRail = true
    const component = getWrapper()
    expect(component.find(CollectionsRailContent)).toHaveLength(1)
  })
})
