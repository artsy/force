import { FeatureArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { HeroSections } from "v2/Components/Publishing/Fixtures/Components"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import { extend } from "lodash"
import React from "react"
import {
  FeatureInnerContent,
  FeatureInnerSubContent,
} from "../FeatureInnerContent"
import { FeatureSplitHeader } from "../FeatureSplitHeader"

describe("FeatureTextHeader", () => {
  const getWrapper = _props => {
    return mount(<FeatureSplitHeader {..._props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: extend({}, FeatureArticle, {
        hero_section: HeroSections[1],
      }),
    }
  })

  it("Renders FeatureInnerContent and two sub-content (for mobile)", () => {
    const component = getWrapper(props)
    expect(component.find(FeatureInnerContent)).toHaveLength(1)
    expect(component.find(FeatureInnerSubContent)).toHaveLength(2)
  })

  it("Renders image assets", () => {
    const component = getWrapper(props)
    expect(component.find("img").getElement().props.src).toMatch(
      "720-Edit-2.jpg"
    )
  })

  it("Renders video assets", () => {
    props.article = extend({}, FeatureArticle, {
      hero_section: HeroSections[3],
    })
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
