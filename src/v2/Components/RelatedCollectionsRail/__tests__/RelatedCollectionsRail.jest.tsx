import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mockTracking } from "v2/Artsy/Analytics"
import { ArrowButton } from "v2/Components/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone, drop } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import { RelatedCollectionEntity } from "../RelatedCollectionEntity"
import { RelatedCollectionsRail } from "../RelatedCollectionsRail"
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
  })

  it("Renders expected fields", async () => {
    const component = await mount(
      <RelatedCollectionsRail {...props} />
    ).renderUntil(n => {
      return n.html().search("is-selected") > 0
    })
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

    expect(component.text()).toBe(null)
    expect(component.find(RelatedCollectionEntity).length).toBe(0)
  })

  it("No arrows when there are less than 5 collections", () => {
    const component = getWrapper()
    expect(component.find(ArrowButton).length).toBe(1)
  })

  describe("Tracking", () => {
    it("Tracks impressions", () => {
      const { Component, dispatch } = mockTracking(RelatedCollectionsRail)
      const component = mount(<Component {...props} />)
      component
        .find(Waypoint)
        .getElement()
        .props.onEnter()

      expect(dispatch).toBeCalledWith({
        action_type: "Impression",
        context_module: "CollectionsRail",
        context_page_owner_type: "Collection",
      })
    })

    it("Tracks carousel navigation", done => {
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
      component
        .find(ArrowButton)
        .at(1)
        .simulate("click")
      // Settimeout needed here for carousel render
      setTimeout(() => {
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          context_module: "CollectionsRail",
          context_page_owner_type: "Collection",
          subject: "clicked next button",
          type: "Button",
        })
        done()
      })
    })
  })
})
