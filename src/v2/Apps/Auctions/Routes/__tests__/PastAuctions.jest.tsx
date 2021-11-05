import { PastAuctionsPaginationContainer } from "../PastAuctions"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("PastAuctions", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot>
          <PastAuctionsPaginationContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query PastAuctions_Test_Query {
        viewer {
          ...PastAuctions_viewer
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

  it("guards against null data", () => {
    expect(() =>
      getWrapper({
        SaleConnection: () => ({
          edges: null,
        }),
      })
    ).not.toThrowError()
  })

  it("renders zerostate if no auctions", () => {
    const wrapper = getWrapper({
      SaleConnection: () => ({
        edges: [],
      }),
    })

    expect(wrapper.html()).toContain("No past auctions.")
  })

  it("renders past auctions and correct components", async () => {
    const wrapper = getWrapper({
      SaleConnection: () => ({
        totalCount: 5,
        pageInfo: {
          endCursor: "xxx",
          hasNextPage: false,
        },
      }),
    })
    expect(wrapper.find("AuctionArtworksRailFragmentContainer")).toBeDefined()
    expect(wrapper.find("Button")).toBeDefined()
    expect(wrapper.text()).toContain("Show More")
  })
})
