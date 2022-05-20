import { CollectionHubFixture } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/System/Analytics/useTracking"
import { mount } from "enzyme"
import "jest-styled-components"
import { OtherCollectionsRail } from "../index"
import { paginateCarousel } from "@artsy/palette"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("@artsy/palette", () => {
  const moduleMock = jest.requireActual("@artsy/palette")
  return {
    ...moduleMock,
    useMutationObserver: jest.fn(),
    paginate: () => [0, 100],
  }
})

jest.mock("v2/System/Analytics/useTracking")
jest.mock("found", () => ({
  Link: props => <div>{props.children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe("CollectionsRail", () => {
  let props
  const trackEvent = jest.fn()

  beforeAll(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[0],
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
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
        <OtherCollectionsRail {...passedProps} />
      </AnalyticsContext.Provider>
    )
  }

  it("Renders expected fields", () => {
    const component = getWrapper()

    expect(component.text()).toMatch("Other Collections")
    expect(component.text()).toMatch("Artist Posters")
    expect(component.text()).toMatch("KAWS: Bearbricks")
  })

  describe("Tracking", () => {
    it("Tracks link click", () => {
      const component = getWrapper()
      component.find("a").at(1).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "otherCollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        destination_page_owner_id: "123457",
        destination_page_owner_slug: "kaws-bearbrick",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 2,
        type: "thumbnail",
      })
    })
  })
})
