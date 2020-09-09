import { CollectionHubFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import {
  OtherCollectionEntity,
  StyledLink,
  ThumbnailImage,
} from "../OtherCollectionEntity"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

jest.mock("v2/Artsy/Analytics/useTracking")
jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("OtherCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      member: CollectionHubFixture.linkedCollections[0].members[0],
      itemNumber: 1,
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
        <OtherCollectionEntity {...passedProps} />
      </AnalyticsContext.Provider>
    )
  }

  it("Renders collection's meta data", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Artist Posters")
    expect(component.find(ThumbnailImage).length).toBe(1)

    const thumbnailImage = component.find(ThumbnailImage).at(0).getElement()
      .props
    expect(thumbnailImage.src).toContain(
      "posters_thumbnail.png&width=60&height=60&quality=80&convert_to=jpg"
    )

    const link = component.find(StyledLink).at(0).getElement().props
    expect(link.to).toContain("artist-poster")
  })

  it("Returns entity with just text when there is no image", () => {
    props.member = CollectionHubFixture.linkedCollections[0].members[1]
    const component = getWrapper()
    expect(component.find(ThumbnailImage).length).toBe(0)
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      const component = getWrapper()
      component.at(0).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "otherCollectionsRail",
        context_page_owner_type: "collection",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        destination_page_owner_id: "123456",
        destination_page_owner_slug: "artist-posters",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 1,
        type: "thumbnail",
      })
    })
  })
})
