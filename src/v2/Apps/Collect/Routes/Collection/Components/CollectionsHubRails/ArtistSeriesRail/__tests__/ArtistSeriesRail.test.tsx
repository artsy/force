import { CollectionsHubLinkedCollections } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { ArrowButton } from "v2/Components/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ArtistSeriesRail } from "../index"

jest.mock("Artsy/Analytics/useTracking")
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
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  it("showing the correct text, price guidance, and title", () => {
    const component = mount(<ArtistSeriesRail {...props} />)
    expect(component.text()).toMatch("Artist Series")
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
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
      component
        .find(ArrowButton)
        .at(1)
        .simulate("click")

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
