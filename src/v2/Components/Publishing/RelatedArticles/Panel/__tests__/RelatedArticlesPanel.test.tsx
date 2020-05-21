import { mockTracking } from "v2/Artsy/Analytics"
import { RelatedPanel } from "v2/Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Waypoint from "react-waypoint"
import { RelatedArticlesPanel } from "../RelatedArticlesPanel"
import { RelatedArticlesPanelLink } from "../RelatedArticlesPanelLink"

jest.unmock("react-tracking")

describe("RelatedArticlesPanel", () => {
  const getWrapper = props => {
    return mount(<RelatedArticlesPanel {...props} />)
  }

  let testProps
  beforeEach(() => {
    testProps = { articles: RelatedPanel }
  })

  it("renders the related articles panel", () => {
    const related = renderer
      .create(<RelatedArticlesPanel articles={RelatedPanel} />)
      .toJSON()
    expect(related).toMatchSnapshot()
  })

  it("renders a default label", () => {
    const component = getWrapper(testProps)
    expect(component.text()).toMatch("Related Stories")
  })

  it("renders a provided label", () => {
    testProps.label = "The Best Stories"
    const component = getWrapper(testProps)
    expect(component.text()).toMatch("The Best Stories")
  })

  it("renders links", () => {
    const component = getWrapper(testProps)
    expect(component.find(RelatedArticlesPanelLink)).toHaveLength(3)
  })

  it("tracks link clicks", () => {
    const { Component, dispatch } = mockTracking(RelatedArticlesPanel)
    const component = mount(<Component articles={RelatedPanel} />)
    component
      .find(RelatedArticlesPanelLink)
      .at(0)
      .simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_module: "Related articles",
      subject: "Related articles",
      destination_path:
        "/article/artsy-editorial-15-top-art-schools-united-states",
      type: "thumbnail",
    })
  })

  it("Calls a tracking impression", () => {
    const { Component, dispatch } = mockTracking(RelatedArticlesPanel)
    const component = mount(<Component articles={RelatedPanel} />)
    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()

    expect(dispatch).toBeCalledWith({
      action_type: "Impression",
      context_module: "Related articles",
      subject: "Related articles",
    })
  })
})
