import { FeatureArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { HeroSections } from "v2/Components/Publishing/Fixtures/Components"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import { FeatureInnerContent } from "../FeatureInnerContent"
import { FeatureTextHeader } from "../FeatureTextHeader"

describe("FeatureTextHeader", () => {
  const getWrapper = _props => {
    return mount(<FeatureTextHeader {..._props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(FeatureArticle),
    }
  })

  it("Renders FeatureInnerContent", () => {
    const component = getWrapper(props)
    expect(component.find(FeatureInnerContent)).toHaveLength(1)
  })

  it("Renders image assets", () => {
    props.article = extend({}, FeatureArticle, {
      hero_section: HeroSections[0],
    })
    const component = getWrapper(props)
    expect(component.find("img").getElement().props.src).toMatch(
      "Rachel_Rossin_portrait_2.jpg"
    )
  })

  it("Renders video assets", () => {
    const component = getWrapper(props)
    expect(component.find("video").getElement().props.src).toMatch(
      "Hero+Loop+02.mp4"
    )
  })

  it("Renders editImage", () => {
    props.editImage = EditableChild("Image")
    const component = getWrapper(props)
    expect(component.text()).toMatch("Child Image")
  })
})
