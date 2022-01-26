import { CollectionsHubLinkedCollections } from "v2/Apps/__tests__/Fixtures/Collections"
import { useTracking } from "v2/System/Analytics/useTracking"
import { mount } from "enzyme"
import "jest-styled-components"
import { ArtistSeriesRail } from "../index"
import { paginateCarousel } from "@artsy/palette"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("found", () => ({
  Link: props => <div>{props.children}</div>,
  RouterContext: jest.requireActual("found").RouterContext,
}))

describe.skip("ArtistSeriesRail", () => {
  let props
  const trackEvent = jest.fn()

  function singleData() {
    return {
      title: "1787 keyboard",
      price_guidance: 10000,
      artworksConnection: {
        edges: [
          {
            node: {
              artist: {
                name: "Jasper Johns",
              },
              title: "keyborad",
              image: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
              },
            },
          },
        ],
      },
    }
  }

  beforeEach(() => {
    props = {
      collectionGroup: CollectionsHubLinkedCollections.linkedCollections[0],
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
        <ArtistSeriesRail {...passedProps} />
      </AnalyticsContext.Provider>
    )
  }

  it("showing the correct text, price guidance, and title", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("Artist Series")
    expect(component.text()).toMatch("Flags unique collections")
    expect(component.text()).toMatch("From $1,000")
    expect(component.html()).toContain("Page 1 of 3")
  })

  describe("Tracking", () => {
    it("Tracks link click", () => {
      props.collectionGroup.members = [
        singleData(),
        singleData(),
        singleData(),
        singleData(),
        singleData(),
      ]

      const component = getWrapper()
      component.find("a").at(2).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtistSeriesGroup",
        context_module: "artistSeriesRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        curation_boost: false,
        destination_page_owner_id: undefined,
        destination_page_owner_slug: undefined,
        destination_page_owner_type: "artistSeries",
        horizontal_slide_position: 2,
        type: "thumbnail",
      })
    })
  })
})
