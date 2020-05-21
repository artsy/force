import {
  FeatureArticle,
  SeriesArticle,
  SponsoredArticle,
  SuperArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { HeroSections } from "v2/Components/Publishing/Fixtures/Components"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { PartnerInline } from "v2/Components/Publishing/Partner/PartnerInline"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import { FeatureFullscreenHeader } from "../FeatureFullscreenHeader"
import { FeatureInnerContent } from "../FeatureInnerContent"

describe("FeatureTextHeader", () => {
  const getWrapper = _props => {
    return mount(<FeatureFullscreenHeader {..._props} />)
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
    expect(component.html()).toMatch("Rachel_Rossin_portrait_2.jpg")
  })

  it("Renders video assets", () => {
    const component = getWrapper(props)
    expect(component.find("video").getElement().props.src).toMatch(
      "Hero+Loop+02.mp4"
    )
  })

  it("Renders Series title if in series", () => {
    props.article = extend({}, SponsoredArticle, {
      hero_section: HeroSections[2],
      seriesArticle: SeriesArticle,
    })
    const component = getWrapper(props)
    expect(component.text()).toMatch("The Future of Art")
    expect(component.html()).toMatch('<a href="/series/future-of-art">')
  })

  it("PartnerInline if super article", () => {
    props.article = SuperArticle
    const component = getWrapper(props)
    expect(component.find(PartnerInline)).toHaveLength(1)
  })

  it("Renders editImage", () => {
    props.editImage = EditableChild("Image")
    const component = getWrapper(props)
    expect(component.text()).toMatch("Child Image")
  })
})
