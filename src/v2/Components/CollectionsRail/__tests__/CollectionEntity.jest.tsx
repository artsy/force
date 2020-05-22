import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { Background, CollectionEntity, StyledLink } from "../CollectionEntity"
jest.unmock("react-tracking")

describe("CollectionEntity", () => {
  let props

  beforeEach(() => {
    props = {
      collection: CollectionsRailFixture[0],
    }
  })

  it("Renders expected fields", () => {
    const component = mount(<CollectionEntity {...props} />)

    expect(component.text()).toMatch("Jasper Johns: Flags")
    expect(component.text()).toMatch("Works from $1,000")
    expect(
      component.find(Background).getElement().props.collectionImage
    ).toMatch("jasperjohnsflag.png")
  })

  it("Tracks link clicks", () => {
    const { Component, dispatch } = mockTracking(CollectionEntity)
    const component = mount(<Component {...props} />)
    component.find(StyledLink).simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      context_module: "CollectionsRail",
      context_page_owner_type: "Article",
      destination_path: "undefined/collection/jasper-johns-flags",
      type: "thumbnail",
    })
  })
})
