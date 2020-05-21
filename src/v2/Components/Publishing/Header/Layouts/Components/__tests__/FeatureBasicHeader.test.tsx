import { mockTracking } from "v2/Artsy/Analytics"
import {
  FeatureBasicArticle,
  FeatureBasicVideoArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { Video } from "v2/Components/Publishing/Sections/Video"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep } from "lodash"
import React from "react"
import { FeatureBasicHeader, VideoContainer } from "../FeatureBasicHeader"
import { FeatureInnerContent } from "../FeatureInnerContent"

jest.unmock("react-tracking")

describe("FeatureBasicHeader", () => {
  const getWrapper = passedProps => {
    return mount(<FeatureBasicHeader {...passedProps} />)
  }

  let testProps
  beforeEach(() => {
    testProps = {
      article: cloneDeep(FeatureBasicArticle),
      tracking: { trackEvent: jest.fn() },
    }
  })

  it("Renders FeatureInnerContent", () => {
    const component = getWrapper(testProps)
    expect(component.find(FeatureInnerContent)).toHaveLength(1)
  })

  it("Renders video assets", () => {
    testProps.article = FeatureBasicVideoArticle
    const component = getWrapper(testProps)
    expect(component.find(Video)).toHaveLength(1)
  })

  it("Tracks video clicks", () => {
    const { Component, dispatch } = mockTracking(FeatureBasicHeader)
    const component = mount(<Component article={FeatureBasicVideoArticle} />)
    component
      .find(VideoContainer)
      .at(0)
      .simulate("click")

    expect(dispatch).toBeCalledWith({
      action: "Click",
      label: "Basic feature video click",
      impression_type: "sa_basic_feature_video",
      context_type: "article_fixed",
    })
  })

  it("Renders editImage", () => {
    testProps.editImage = EditableChild("Image")
    const component = getWrapper(testProps)
    expect(component.text()).toMatch("Child Image")
  })
})
