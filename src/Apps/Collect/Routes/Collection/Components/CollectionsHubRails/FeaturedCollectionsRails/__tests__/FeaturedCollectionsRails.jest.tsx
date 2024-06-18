import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import "jest-styled-components"
import { FeaturedCollectionsRails } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/FeaturedCollectionsRails/index"
import { paginateCarousel } from "@artsy/palette"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { FeaturedCollectionRailEntityFragmentContainer } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/FeaturedCollectionsRails/FeaturedCollectionRailEntity"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("react-tracking")

jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("FeaturedCollectionsRails", () => {
  let props
  const trackEvent = jest.fn()
  const getWrapper = (passedProps = props) => {
    return mount(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <FeaturedCollectionsRails {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  beforeAll(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[1],
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
    trackEvent.mockClear()
  })

  it("renders expected fields", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Featured Collections")
    expect(component.text()).toMatch("Art Inspired by Cartoons")
    expect(component.text()).toMatch("Street Art: Celebrity Portraits")
    expect(component.text()).toMatch("Street Art: Superheroes and Villains")
  })

  describe("tracking", () => {
    it("tracks rails clicks", () => {
      const component = getWrapper()
      component.find("a").at(2).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "featuredCollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        destination_page_owner_id: "123452",
        destination_page_owner_slug: "street-art-superheroes-and-villains",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 2,
        type: "thumbnail",
      })
    })
  })

  it("does not render price guidance for FeaturedCollectionEntity when it is null", () => {
    props.collectionGroup.members[0].priceGuidance = null
    const component = getWrapper()
    const firstEntity = component
      .find(FeaturedCollectionRailEntityFragmentContainer)
      .at(0)

    expect(firstEntity.text()).not.toContain("From $")
  })
})
