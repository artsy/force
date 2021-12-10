import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionArtworksRailFragmentContainer } from "../AuctionArtworksRail"
import { useTracking as baseUseTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("AuctionArtworksRail", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <AuctionArtworksRailFragmentContainer
          sale={props.sale}
          tabType="current"
        />
      )
    },
    query: graphql`
      query AuctionArtworksRail_Test_Query @relay_test_operation {
        sale(id: "xxx") {
          ...AuctionArtworksRail_sale
        }
      }
    `,
  })

  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

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

  it("renders correct components and data", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        internalID: "testid123",
        href: "/auction/test-href",
        name: "Test Href",
        formattedStartDateTime: "Ends Apr 10 at 8:27pm UTC",
      }),
    })

    expect(wrapper.find("Waypoint")).toBeDefined()
    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").first().props().to).toContain(
      "/auction/test-href"
    )

    const text = wrapper.text()
    expect(text).toContain("Test Href")
    expect(text).toContain("Ends Apr 10 at 8:27pm UTC")
  })

  it("tracks clicks", () => {
    const wrapper = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "clickedArtworkGroup",
          "context_module": "currentAuctions",
          "context_page_owner_type": undefined,
          "destination_page_owner_id": "<Sale-mock-id-8>",
          "destination_page_owner_slug": "<Sale-mock-id-9>",
          "destination_page_owner_type": "sale",
          "type": "viewAll",
        },
      ]
    `)
  })
})
