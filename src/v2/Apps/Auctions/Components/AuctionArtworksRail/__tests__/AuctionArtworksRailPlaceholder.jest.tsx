import React from "react"
import { mount } from "enzyme"
import { AuctionArtworksRailPlaceholder } from "../../AuctionArtworksRailPlaceholder"

jest.unmock("react-relay")

describe("AuctionArtworksRailPlaceholder", () => {
  const wrapper = mount(<AuctionArtworksRailPlaceholder />)

  it("renders the correct components and data", () => {
    expect(wrapper.find("Carousel")).toBeDefined()

    const text = wrapper.text()

    expect(text).toContain("Artist Name")
    expect(text).toContain("Artwork Title")
    expect(text).toContain("Price")
  })
})
