import React from "react"
import { mount } from "enzyme"
import { ArtistsStep } from "./ArtistsStep"

describe("ArtistsStep", () => {
  it("renders popular artists to start", () => {
    const props = { router: {} }
    const wrapper = mount(<ArtistsStep {...props} />)
    expect(wrapper.find("ArtistSearchResultsComponent")).toHaveLength(0)
    expect(wrapper.find("PopularArtistsComponent")).toHaveLength(1)
  })

  it("renders search results with query", () => {
    const props = { router: {} }
    const wrapper = mount(<ArtistsStep {...props} />)

    const onInput = wrapper.find("input").prop("onInput")
    const event: any = { target: { value: "andy" } }
    onInput(event)
    wrapper.update()

    expect(wrapper.find("ArtistSearchResultsComponent")).toHaveLength(1)
    expect(wrapper.find("PopularArtistsComponent")).toHaveLength(0)
  })
})
