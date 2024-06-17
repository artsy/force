import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import { RelatedCollectionEntity } from "Components/RelatedCollectionsRail/RelatedCollectionEntity"
import { useTracking } from "react-tracking"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { RouterLink } from "System/Components/RouterLink"

jest.mock("react-tracking")

describe.skip("RelatedCollectionEntity", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
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
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <RelatedCollectionEntity {...passedProps} />
      </AnalyticsCombinedContextProvider>
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
