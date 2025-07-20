import { PastAuctionsPaginationContainer } from "Apps/Auctions/Routes/PastAuctions"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("PastAuctions", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot>
          <PastAuctionsPaginationContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query PastAuctionsTestQuery @relay_test_operation {
        viewer {
          ...PastAuctions_viewer
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
      renderWithRelay({
        SaleConnection: () => ({
          edges: null,
        }),
      }),
    ).not.toThrowError()
  })

  it("renders zerostate if no auctions", () => {
    const { container } = renderWithRelay({
      SaleConnection: () => ({
        edges: [],
      }),
    })

    expect(container.innerHTML).toContain("No past auctions.")
  })

  it("renders past auctions and correct components", async () => {
    renderWithRelay({
      SaleConnection: () => ({
        totalCount: 5,
        pageInfo: {
          endCursor: "xxx",
          hasNextPage: false,
        },
      }),
    })

    expect(screen.getByText("Show More")).toBeInTheDocument()
  })
})
