import { CollectionsRailFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import { RelatedCollectionEntity } from "../RelatedCollectionEntity"
import { useTracking } from "v2/System/Analytics/useTracking"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContextProvider } from "v2/System/Analytics/AnalyticsContext"
import { RouterLink } from "v2/System/Router/RouterLink"

jest.mock("v2/System/Analytics/useTracking")

describe.skip("RelatedCollectionEntity", () => {
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
      <AnalyticsContextProvider
        value={{
          contextPageOwnerId: "1234",
          contextPageOwnerSlug: "slug",
          contextPageOwnerType: OwnerType.collection,
        }}
      >
        <RelatedCollectionEntity {...passedProps} />
      </AnalyticsContextProvider>
    )
  }

  it("Renders expected fields", () => {
    const component = getWrapper()

    expect(component.text()).toContain("Jasper Johns:")
    expect(component.text()).toContain("Flags")
    expect(component.text()).toContain("From $1,000")
    expect(component.find("img").length).toBe(3)
    const artworkImage = component.find("img").at(0).getElement().props
    expect(artworkImage.src).toBe(
      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg"
    )
    expect(artworkImage.alt).toBe("Flag")
  })

  it("Returns proper image size if 2 artworks returned", () => {
    props.collection.artworksConnection.edges.pop()
    const component = getWrapper()
    expect(component.find("img").length).toBe(2)
  })

  it("Tracks link clicks", () => {
    const component = getWrapper()
    component.find(RouterLink).simulate("click")

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
