import { Vanguard2019Fixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import { mount } from "enzyme"
import React from "react"
import {
  ReadMoreButton,
  totalSVGsForSection,
  VanguardArtistWrapper,
} from "../ArtistWrapper"

describe("ArtistWrapper", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<VanguardArtistWrapper {...passedProps} />)
  }
  beforeEach(() => {
    props = {
      article: Vanguard2019Fixture.relatedArticles[0].relatedArticles[0],
      section: "emerging",
      isMobile: false,
    }
  })

  it("is closed by default", () => {
    const component = getWrapper().instance() as VanguardArtistWrapper
    expect(component.state.isExpanded).toBeFalsy()
  })

  it("#componentDidMount expands article based on slug", () => {
    window.history.pushState({}, "", "/series/artsy-vanguard-2019/victoria-sin")
    const component = getWrapper().instance() as VanguardArtistWrapper
    expect(component.state.isExpanded).toBeTruthy()
  })

  it("onExpand sets state.isExpanded", () => {
    const component = getWrapper().instance() as VanguardArtistWrapper
    const isExpanded = component.state.isExpanded
    component.onExpand()
    expect(component.state.isExpanded).toBe(!isExpanded)
  })

  it("generates a different maximum index for SVG's based on section", () => {
    const emerging = totalSVGsForSection("emerging")
    const newlyEstablished = totalSVGsForSection("newly-established")

    expect(emerging).toEqual(20)
    expect(newlyEstablished).toEqual(15)
  })

  it("expands or collapses background when ReadMore is selected", () => {
    const component = getWrapper()
    component.find(ReadMoreButton).simulate("click")

    expect(window.scrollTo).toHaveBeenCalled()
  })
})
