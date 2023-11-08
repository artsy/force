import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MyBidsFragmentContainer } from "Apps/Auctions/Components/MyBids/MyBids"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyBids", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <MyBidsFragmentContainer me={props.me} />
    },
    query: graphql`
      query MyBids_Test_Query @relay_test_operation {
        me {
          ...MyBids_me
        }
      }
    `,
  })

  beforeAll(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders the correct components", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("CarouselRail")).toBeDefined()
    expect(wrapper.find("SaleContainer")).toBeDefined()
    expect(wrapper.find("MyBidsBidHeaderFragmentContainer")).toBeDefined()
    expect(wrapper.find("MyBidsBidItemFragmentContainer")).toBeDefined()
  })

  it("renders the Bid Now button if only user interaction is registration and button links out to sale", () => {
    const { wrapper } = getWrapper({
      Me: () => ({
        myBids: {
          active: [
            {
              sale: {
                slug: "some-sale",
              },
              saleArtworks: [],
            },
          ],
        },
      }),
    })

    const btn = wrapper.find("[data-test='registeredOnlyButton']").first()
    expect(btn.props().to).toBe("/auction/some-sale")
  })

  it("tracks clicks on the only registered button", () => {
    const { wrapper } = getWrapper({
      Me: () => ({
        myBids: {
          active: [
            {
              sale: {
                slug: "some-sale",
              },
              saleArtworks: [],
            },
          ],
        },
      }),
    })

    const btn = wrapper.find("[data-test='registeredOnlyButton']").first()
    btn.simulate("click")
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedAuctionGroup",
      context_module: "yourActiveBids",
      destination_page_owner_type: "sale",
      type: "thumbnail",
    })
  })
})
