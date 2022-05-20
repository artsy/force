import { CollectionHubFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/System/Analytics/useTracking"
import { mount } from "enzyme"
import "jest-styled-components"
import { FeaturedCollectionEntity, FeaturedCollectionsRails } from "../index"
import { Image, paginateCarousel } from "@artsy/palette"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("v2/System/Analytics/useTracking")

jest.mock("found", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("FeaturedCollectionsRails", () => {
  let props
  const trackEvent = jest.fn()
  const getWrapper = (passedProps = props) => {
    return mount(
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "1234",
          contextPageOwnerSlug: "slug",
          contextPageOwnerType: OwnerType.collection,
        }}
      >
        <FeaturedCollectionsRails {...passedProps} />
      </AnalyticsContext.Provider>
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

  it("Renders expected fields", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Featured Collections")
    expect(component.text()).toMatch("Art Inspired by Cartoons")
    expect(component.text()).toMatch("Street Art: Celebrity Portraits")
    expect(component.text()).toMatch("Street Art: Superheroes and Villains")
  })

  describe("Tracking", () => {
    it("Tracks rails clicks", () => {
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

  it.skip("Renders expected fields for FeaturedCollectionEntity", () => {
    const component = getWrapper()
    const firstEntity = component.find(FeaturedCollectionEntity).at(0)

    expect(firstEntity.text()).toContain("Art Inspired by Cartoons")
    expect(firstEntity.text()).toContain("From $60")
    const featuredImage = component.find(Image).at(0)
    expect(featuredImage.getElement().props.src).toContain(
      "?resize_to=fill&src=http%3A%2F%2Ffiles.artsy.net%2Fimages%2Fcartoons_thumbnail.png&width=325&height=244&quality=75&convert_to=jpg"
    )
  })

  it("Does not renders price guidance for FeaturedCollectionEntity when it is null", () => {
    props.collectionGroup.members[0].priceGuidance = null
    const component = getWrapper()
    const firstEntity = component.find(FeaturedCollectionEntity).at(0)

    expect(firstEntity.text()).not.toContain("From $")
  })
})
