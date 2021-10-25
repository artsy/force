import React from "react"
import { UserActiveBid } from "../UserActiveBid"
import { mount } from "enzyme"

const data = {
  isLeadingBidder: true,
  activeBid: {
    id: "activeBid-id",
  },
  saleArtwork: {
    lotLabel: "xxx",
    highestBid: {
      display: "$1000",
    },
    counts: {
      bidderPositions: 5,
    },
    artwork: {
      title: "mist",
      href: "/mist",
      image: {
        url: "someMockImageUrl",
      },
      artist: {
        name: "Caspar",
      },
    },
  },
}

describe("UserActiveBid component", () => {
  let wrapper = mount(
    <UserActiveBid lot={data} shouldDisplayBorderBottom={false} />
  )

  afterAll(() => {
    wrapper.unmount()
  })

  it("renders correctly", () => {
    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders correct lot number", () => {
    expect(wrapper.find("Text").first().html()).toContain("Lot xxx")
  })
})
