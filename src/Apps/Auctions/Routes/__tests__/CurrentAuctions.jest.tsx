import { CurrentAuctionsPaginationContainer } from "Apps/Auctions/Routes/CurrentAuctions"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("CurrentAuctions", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot>
          <CurrentAuctionsPaginationContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query CurrentAuctionsTestQuery @relay_test_operation {
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

    expect(container.innerHTML).toContain("No current auctions.")
  })

  it("renders current auctions and correct components", () => {
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
