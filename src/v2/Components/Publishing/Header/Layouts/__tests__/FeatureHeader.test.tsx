import { FeatureArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import { FeatureBasicHeader } from "../Components/FeatureBasicHeader"
import { FeatureFullscreenHeader } from "../Components/FeatureFullscreenHeader"
import { FeatureSplitHeader } from "../Components/FeatureSplitHeader"
import { FeatureTextHeader } from "../Components/FeatureTextHeader"
import { FeatureHeader } from "../FeatureHeader"

describe("Header", () => {
  const getWrapper = passedProps => {
    return mount(<FeatureHeader {...passedProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: cloneDeep(FeatureArticle),
    }
  })

  it("Renders text header by default", () => {
    delete props.article.hero_section.type
    const component = getWrapper(props)
    expect(component.find(FeatureTextHeader)).toHaveLength(1)
  })

  it("Renders text header by for text types", () => {
    props.article.hero_section.type = "text"
    const component = getWrapper(props)
    expect(component.find(FeatureTextHeader)).toHaveLength(1)
  })

  it("Renders basic header by for basic types", () => {
    props.article.hero_section.type = "basic"
    const component = getWrapper(props)
    expect(component.find(FeatureBasicHeader)).toHaveLength(1)
  })

  it("Renders fullscreen header by for fullscreen types", () => {
    props.article.hero_section.type = "fullscreen"
    const component = getWrapper(props)
    expect(component.find(FeatureFullscreenHeader)).toHaveLength(1)
  })

  it("Renders split header by for split types", () => {
    props.article.hero_section.type = "split"
    const component = getWrapper(props)
    expect(component.find(FeatureSplitHeader)).toHaveLength(1)
  })
})
