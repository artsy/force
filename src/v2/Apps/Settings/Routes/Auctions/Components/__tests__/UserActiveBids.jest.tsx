import React from "react"
import { UserActiveBids } from "../UserActiveBids"
import { mount } from "enzyme"

const data = [
  {
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
          cropped: {
            src: "somesource",
            srcSet: "somesourceset",
          },
        },
        artist: {
          name: "Caspar",
        },
      },
    },
  },
]

describe("UserActiveBids", () => {
  let wrapper = mount(<UserActiveBids lotStandings={data} />)

  afterAll(() => {
    wrapper.unmount()
  })

  it("renders correctly", () => {
    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders active bids title", () => {
    expect(wrapper.find("Text").first().html()).toContain("Active Bids")
  })

  it("renders correct artwork link", () => {
    expect(wrapper.find("RouterLink").first().props().to).toEqual(
      data[0].saleArtwork.artwork.href
    )
  })

  it("renders the passed image url", () => {
    expect(wrapper.find("Image").props().src).toEqual(
      data[0].saleArtwork.artwork.image.cropped.src
    )
  })

  it("renders nothing message when no data found", () => {
    wrapper = mount(<UserActiveBids lotStandings={[]} />)
    expect(wrapper.html()).toContain("Nothing to Show")
  })
})
