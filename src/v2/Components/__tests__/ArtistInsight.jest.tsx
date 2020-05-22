import { Link } from "@artsy/palette"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { ArtistInsight } from "../ArtistInsight"

describe("AuctionCard", () => {
  const props = {
    label: "Collected by a major institution",
    type: "COLLECTED",
    entities: ["Tate", "MoMA PS1"],
  }

  const getWrapper = () =>
    mount(
      <MockBoot breakpoint="xl">
        <ArtistInsight {...props} />
      </MockBoot>
    )

  it("renders the artist insight and allows expansion of entities", () => {
    const wrapper = getWrapper()
    const text = wrapper.text()

    expect(text).toContain("Collected by a major institution")
    expect(text).toMatch(/Tate, and 1\smore/)

    wrapper
      .find(Link)
      .first()
      .simulate("click")

    expect(wrapper.text()).toContain("Tate, MoMA PS1")
  })
})
