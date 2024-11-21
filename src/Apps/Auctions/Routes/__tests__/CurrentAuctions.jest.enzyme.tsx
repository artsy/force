import { CurrentAuctionsPaginationContainer } from "Apps/Auctions/Routes/CurrentAuctions"
import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("CurrentAuctions", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot>
          <CurrentAuctionsPaginationContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query CurrentAuctions_Test_Query @relay_test_operation {
        viewer {
          ...CurrentAuctions_viewer
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
    const { wrapper } = getWrapper({
      SaleConnection: () => ({
        edges: [],
      }),
    })

    expect(wrapper.html()).toContain("No current auctions.")
  })

  it("renders current auctions and correct components", () => {
    const { wrapper } = getWrapper({
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
