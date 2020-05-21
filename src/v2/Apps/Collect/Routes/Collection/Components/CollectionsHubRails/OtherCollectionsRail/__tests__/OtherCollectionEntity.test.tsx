import { CollectionHubFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import {
  OtherCollectionEntity,
  StyledLink,
  ThumbnailImage,
} from "../OtherCollectionEntity"

jest.mock("Artsy/Analytics/useTracking")
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
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  it("Renders collection's meta data", () => {
    const component = mount(<OtherCollectionEntity {...props} />)

    expect(component.text()).toMatch("Artist Posters")
    expect(component.find(ThumbnailImage).length).toBe(1)
    const thumbnailImage = component
      .find(ThumbnailImage)
      .at(0)
      .getElement().props

    expect(thumbnailImage.src).toContain(
      "posters_thumbnail.png&width=60&height=60&quality=80&convert_to=jpg"
    )

    const link = component
      .find(StyledLink)
      .at(0)
      .getElement().props

    expect(link.to).toContain("artist-poster")
  })

  it("Returns entity with just text when there is no image", () => {
    props.member = CollectionHubFixture.linkedCollections[0].members[1]
    const component = mount(<OtherCollectionEntity {...props} />)

    expect(component.find(ThumbnailImage).length).toBe(0)
  })

  describe("Tracking", () => {
    it("Tracks collection click", () => {
      const component = mount(
        <OtherCollectionEntity {...props} itemNumber={0} />
      )

      component.at(0).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "OtherCollectionsRail",
        context_page_owner_type: "Collection",
        type: "thumbnail",
        destination_path: "undefined/collection/artist-posters",
        item_number: 0,
      })
    })
  })
})
