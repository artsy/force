import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import Waypoint from "react-waypoint"
import { CollectionEntity } from "../CollectionEntity"
import { CollectionsRail } from "../CollectionsRail"
jest.unmock("react-tracking")

describe("CollectionsRail", () => {
  let props

  beforeEach(() => {
    props = {
      collections: CollectionsRailFixture,
    }
  })

  it("Renders expected fields", () => {
    const component = mount(<CollectionsRail {...props} />)
    expect(component.text()).toMatch("Shop works from curated collections")
    expect(component.find(CollectionEntity).length).toBe(4)
    expect(component.text()).toMatch("Jasper Johns: Flags")
    expect(component.text()).toMatch("Works from $1,000")
    expect(component.text()).toMatch("Street Art Now")
    expect(component.text()).toMatch("Works from $200")
  })

  it("Tracks impressions", () => {
    const { Component, dispatch } = mockTracking(CollectionsRail)
    const component = mount(<Component {...props} />)
    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()

    expect(dispatch).toBeCalledWith({
      action_type: "Impression",
      context_module: "CollectionsRail",
      context_page_owner_type: "Article",
    })
  })
})
