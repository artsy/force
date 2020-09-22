import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import React from "react"
import {
  ArtworkImage,
  RelatedCollectionEntity,
  StyledLink,
} from "../RelatedCollectionEntity"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("RelatedCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      collection: CollectionsRailFixture[0],
      slideIndex: 1,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })
  const getWrapper = (passedProps = props) => {
    return mount(
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "1234",
          contextPageOwnerSlug: "slug",
          contextPageOwnerType: OwnerType.collection,
        }}
      >
        <RelatedCollectionEntity {...passedProps} />
      </AnalyticsContext.Provider>
    )
  }

  it("Renders expected fields", () => {
    const component = getWrapper()

    expect(component.text()).toMatch("Jasper Johns:")
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("From $1,000")
    expect(component.find(ArtworkImage).length).toBe(3)
    const artworkImage = component.find(ArtworkImage).at(0).getElement().props

    expect(artworkImage.src).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
    expect(artworkImage.alt).toBe("Jasper Johns, Flag")
    expect(artworkImage.width).toBe(86)
  })

  it("Returns proper image size if 2 artworks returned", () => {
    props.collection.artworksConnection.edges.pop()
    const component = getWrapper()
    const artworkImage = component.find(ArtworkImage).at(0).getElement().props

    expect(component.find(ArtworkImage).length).toBe(2)
    expect(artworkImage.width).toBe(130)
  })

  it("Renders a backup image if no artworks returned", () => {
    props.collection.artworksConnection.edges = []
    const component = getWrapper()
    const artworkImage = component.find(ArtworkImage).at(0).getElement().props

    expect(component.find(ArtworkImage).length).toBe(1)
    expect(artworkImage.src).toBe(
      "http://files.artsy.net/images/jasperjohnsflag.png"
    )
    expect(artworkImage.width).toBe(262)
  })

  it("Tracks link clicks", () => {
    const component = getWrapper()
    component.find(StyledLink).simulate("click")

    expect(trackEvent).toBeCalledWith({
      action: "clickedCollectionGroup",
      context_module: "relatedCollectionsRail",
      context_page_owner_id: "1234",
      context_page_owner_slug: "slug",
      context_page_owner_type: "collection",
      destination_page_owner_id: "54321",
      destination_page_owner_slug: "jasper-johns-flags",
      destination_page_owner_type: "collection",
      horizontal_slide_position: 1,
      type: "thumbnail",
    })
  })
})
