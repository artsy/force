import { CollectionsRailFixture } from "Apps/__tests__/Fixtures/Collections"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone, drop } from "lodash"
// eslint-disable-next-line no-restricted-imports
import Waypoint from "react-waypoint"
import { RelatedCollectionEntity } from "Components/RelatedCollectionsRail/RelatedCollectionEntity"
import { RelatedCollectionsRail } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { paginateCarousel } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"

jest.mock("react-tracking")
jest.mock("@artsy/palette/dist/elements/Carousel/paginate")
jest.unmock("react-tracking")

describe.skip("CollectionsRail", () => {
  let props
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = props) => {
    return mount(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="1234"
        path="/collection/slug"
      >
        <RelatedCollectionsRail {...passedProps} />
      </AnalyticsCombinedContextProvider>
    )
  }

  beforeAll(() => {
    props = {
      title: "Street Art",
      collections: CollectionsRailFixture,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(paginateCarousel as jest.Mock).mockImplementation(() => [0, 100, 200])
  })

  it("Renders expected fields", () => {
    const component = getWrapper()
    expect(component.text()).toMatch("More like Street Art")
    expect(component.find(RelatedCollectionEntity).length).toBe(8)
    expect(component.text()).toMatch("Flags")
    expect(component.text()).toMatch("From $1,000")
    expect(component.text()).toMatch("Street Art Now")
    expect(component.text()).toMatch("From $200")
  })

  it("does not render a carousel entry if it has no artworks", () => {
    const collectionsCopy = clone(props.collections)
    collectionsCopy.push({
      slug: "jasper-johns-flags2",
      headerImage: "https://files.artsy.net/images/jasperjohnsflag.png",
      title: "Jasper Johns: Flags Part 2",
      price_guidance: 1000,
      artworksConnection: null,
    })
    const component = getWrapper({ collections: collectionsCopy })
    expect(component.find(RelatedCollectionEntity).length).toBe(8)
  })

  it("Does not render carousel if less than 4 entries", () => {
    props.collections = drop(CollectionsRailFixture, 1)
    const component = getWrapper()

    expect(component.text()).toBeFalsy()
    expect(component.find(RelatedCollectionEntity).length).toBe(0)
  })

  describe("Tracking", () => {
    it("Tracks impressions", () => {
      const component = getWrapper()
      component.find(Waypoint).getElement().props.onEnter()

      expect(trackEvent).toBeCalledWith({
        action_type: "Impression",
        context_module: "CollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "Collection",
      })
    })

    it("Tracks carousel navigation", () => {
      const collectionsCopy = clone(props.collections)
      collectionsCopy.push({
        slug: "jasper-johns-flags2",
        headerImage: "https://files.artsy.net/images/jasperjohnsflag.png",
        title: "Jasper Johns: Flags Part 2",
        price_guidance: 1000,
        artworksConnection: {
          edges: [
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag",
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                },
              },
            },
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag (Moratorium)",
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/Jyhryk2bLDdkpNflvWO0Lg/small.jpg",
                  },
                },
              },
            },
            {
              node: {
                artist: {
                  name: "Jasper Johns",
                },
                title: "Flag I",
                image: {
                  resized: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/gM-IwaZ9C24Y_RQTRW6F5A/small.jpg",
                  },
                },
              },
            },
          ],
        },
      })
      const component = getWrapper({ collections: collectionsCopy })
      component.find("a").at(2).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedCollectionGroup",
        context_module: "relatedCollectionsRail",
        context_page_owner_id: "1234",
        context_page_owner_slug: "slug",
        context_page_owner_type: "collection",
        destination_page_owner_id: "65432",
        destination_page_owner_slug: "contemporary-limited-editions",
        destination_page_owner_type: "collection",
        horizontal_slide_position: 2,
        type: "thumbnail",
      })
    })
  })
})
