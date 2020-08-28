import { CollectionsHubLinkedCollections } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ArtistSeriesRail } from "../index"
import { paginateCarousel } from "@artsy/palette"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("v2/Artsy/Analytics/useTracking")
jest.mock("found", () => ({
  Link: props => <div>{props.children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("ArtistSeriesRail", () => {
  let props
  const trackEvent = jest.fn()

  function singleData() {
    return {
      title: "1787 keyboard",
      price_guidance: 10000,
      artworksConnection: {
        edges: [
          {
            node: {
              artist: {
                name: "Jasper Johns",
              },
              title: "keyborad",
              image: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
              },
            },
          },
        ],
      },
    }
  }

  beforeEach(() => {
    props = {
      collectionGroup: CollectionsHubLinkedCollections.linkedCollections[0],
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
  })

  it("showing the correct text, price guidance, and title", () => {
    const component = mount(<ArtistSeriesRail {...props} />)
    expect(component.text()).toMatch("Artist Series")
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
    expect(component.html()).toContain("Page 1 of 3")
  })

  describe("Tracking", () => {
    it("Tracks arrow click", () => {
      props.collectionGroup.members = [
        singleData(),
        singleData(),
        singleData(),
        singleData(),
        singleData(),
      ]

      const component = mount(<ArtistSeriesRail {...props} />)
      component.find("button").at(2).simulate("click") // Next button

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "ArtistCollectionsRail",
        context_page_owner_type: "Collection",
        type: "Button",
        subject: "clicked next button",
      })
    })
  })
})
