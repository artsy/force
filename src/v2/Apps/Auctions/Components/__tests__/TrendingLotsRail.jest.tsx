import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { useTracking as baseUseTracking } from "react-tracking"
import { TrendingLotsRailFragmentContainer } from "../TrendingLotsRail"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("TrendingLotsRail", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <TrendingLotsRailFragmentContainer viewer={props.viewer} />
    },
    query: graphql`
      query TrendingLotsRail_Test_Query @relay_test_operation {
        viewer {
          ...TrendingLotsRail_viewer
        }
      }
    `,
  })

  beforeEach(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("guards against null data", () => {
    expect(() =>
      getWrapper({
        SaleArtworksConnection: () => ({
          edges: null,
        }),
      })
    ).not.toThrowError()
  })

  it("does not render if no trending lots", () => {
    const wrapper = getWrapper({
      SaleArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(wrapper.html()).not.toContain("Works with the most bids today")
    expect(wrapper.html()).toContain("No Works To Show")
    expect(wrapper.find("Carousel").length).toBe(0)
    expect(wrapper.find("FillwidthItem").length).toBe(0)
  })

  it("renders the correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Carousel")).toBeDefined()
    expect(wrapper.find("FillwidthItem")).toBeDefined()
  })

  it("tracks clicks", () => {
    const wrapper = getWrapper({
      SaleArtworksConnection: () => ({
        edges: [{ node: { sale: { isClosed: false } } }],
      }),
    })
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "clickedArtworkGroup",
          "context_module": "trendingLots",
          "context_page_owner_type": undefined,
          "destination_page_owner_id": "<mock-value-for-field-\\"internalID\\">",
          "destination_page_owner_slug": "<mock-value-for-field-\\"slug\\">",
          "destination_page_owner_type": "artwork",
          "horizontal_slide_position": 0,
          "type": "thumbnail",
        },
      ]
    `)
  })
})
