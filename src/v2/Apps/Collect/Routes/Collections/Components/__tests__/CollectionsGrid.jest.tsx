import { EntityHeader } from "@artsy/palette"
import { CollectionsFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import React from "react"
import { CollectionsGrid } from "../CollectionsGrid"

describe("CollectionsGrid", () => {
  const getWrapper = passedProps => {
    return mount(<CollectionsGrid {...passedProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      collections: CollectionsFixture,
    }
  })

  it("Renders a list of collections in the alphabetical order", () => {
    const component = getWrapper(props)

    expect(component.find(EntityHeader).length).toBe(6)
    expect(component.find(EntityHeader).get(0).props.name).toEqual(
      "Big Artists, Small Sculptures"
    )
    expect(component.find(EntityHeader).get(1).props.name).toEqual(
      "Contemporary Limited Editions"
    )
    expect(component.html()).toMatch("pumpkinsbigartistsmallsculpture")
  })

  it("Renders a categoryName if provided", () => {
    props.name = "Collectible Sculptures"
    const component = getWrapper(props)

    expect(component.text()).toMatch("Collectible Sculptures")
  })

  it("Renders category name as an #id", () => {
    props.name = "Collectible Sculptures"
    const component = getWrapper(props)

    expect(component.find("#collectible-sculptures")).toBeTruthy()
  })
})
