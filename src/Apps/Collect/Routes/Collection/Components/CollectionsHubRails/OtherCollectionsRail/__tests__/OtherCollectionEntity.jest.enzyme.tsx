import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import { OtherCollectionEntity } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/OtherCollectionsRail/OtherCollectionEntity"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { Image } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

jest.mock("react-tracking")
jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe.skip("OtherCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
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
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <OtherCollectionEntity {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  it("Renders collection's meta data", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Artist Posters")
    expect(component.find(Image).length).toBe(1)

    const thumbnailImage = component.find(Image).at(0).getElement().props
    expect(thumbnailImage.src).toContain(
      "posters_thumbnail.png&width=60&height=60&quality=80&convert_to=jpg"
    )

    const link = component.find(RouterLink).at(0).getElement().props
    expect(link.to).toContain("artist-poster")
  })

  it("Returns entity with just text when there is no image", () => {
    props.member = CollectionHubFixture.linkedCollections[0].members[1]
    const component = getWrapper()
    expect(component.find(Image).length).toBe(0)
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
