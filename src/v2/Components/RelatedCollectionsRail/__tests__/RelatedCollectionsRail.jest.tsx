import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone, drop } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import { RelatedCollectionEntity } from "../RelatedCollectionEntity"
import { RelatedCollectionsRail } from "../RelatedCollectionsRail"
import { paginateCarousel } from "@artsy/palette"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.unmock("react-tracking")

describe("CollectionsRail", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(<RelatedCollectionsRail {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      title: "Street Art",
      collections: CollectionsRailFixture,
    }
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
  })

  it("Renders expected fields", async () => {
    const component = await mount(<RelatedCollectionsRail {...props} />)
    expect(component.text()).toMatch("More like Street Art")
    expect(component.find(RelatedCollectionEntity).length).toBe(8)
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("From $1,000")
    expect(component.text()).toMatch("Street Art Now")
    expect(component.text()).toMatch("From $200")
  })

  it("does not render a carousel entry if it has no artworks", () => {
    const collectionsCopy = clone(props.collections)
    collectionsCopy.push({
      slug: "jasper-johns-flags2",
      headerImage: "http://files.artsy.net/images/jasperjohnsflag.png",
      title: "Jasper Johns: Flags Part 2",
      price_guidance: 1000,
      artworksConnection: null,
    })
    const component = getWrapper({ collections: collectionsCopy })
    expect(component.find(RelatedCollectionEntity).length).toBe(8)
  })

  it("Does not render carousel if less than 4 entries", () => {
    props.collections = drop(CollectionsRailFixture, 1)
    const component = getWrapper()

    expect(component.text()).toBeFalsy()
    expect(component.find(RelatedCollectionEntity).length).toBe(0)
  })

  describe("Tracking", () => {
    it("Tracks impressions", () => {
      const { Component, dispatch } = mockTracking(RelatedCollectionsRail)
      const component = mount(<Component {...props} />)
      component.find(Waypoint).getElement().props.onEnter()

      expect(dispatch).toBeCalledWith({
        action_type: "Impression",
        context_module: "CollectionsRail",
        context_page_owner_type: "Collection",
      })
    })

    it("Tracks carousel navigation", () => {
      const collectionsCopy = clone(props.collections)
      collectionsCopy.push({
        slug: "jasper-johns-flags2",
        headerImage: "http://files.artsy.net/images/jasperjohnsflag.png",
        title: "Jasper Johns: Flags Part 2",
        price_guidance: 1000,
        artworksConnection: {
          edges: [
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag",
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                },
              },
            },
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag (Moratorium)",
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/Jyhryk2bLDdkpNflvWO0Lg/small.jpg",
                  },
                },
              },
            },
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag I",
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/gM-IwaZ9C24Y_RQTRW6F5A/small.jpg",
                  },
                },
              },
            },
          ],
        },
      })

      const updatedCollections = { collections: collectionsCopy }
      const { Component, dispatch } = mockTracking(RelatedCollectionsRail)

      const component = mount(<Component {...updatedCollections} />)
      component.find("button").at(2).simulate("click") // Next button

      expect(dispatch).toBeCalledWith({
        action_type: "Click",
        context_module: "CollectionsRail",
        context_page_owner_type: "Collection",
        subject: "clicked next button",
        type: "Button",
      })
    })
  })
})
