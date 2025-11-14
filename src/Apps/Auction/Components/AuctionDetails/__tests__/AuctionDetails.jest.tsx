import { AuctionDetailsFragmentContainer } from "Apps/Auction/Components/AuctionDetails/AuctionDetails"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { AuctionDetailsQuery } from "__generated__/AuctionDetailsQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: jest.fn(),
}))

jest.mock("../AuctionInfoSidebar", () => ({
  AuctionInfoSidebarFragmentContainer: () => null,
}))

describe("AuctionDetails", () => {
  const mockUseTracking = useTracking as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<AuctionDetailsQuery>({
    Component: (props: any) => {
      return <AuctionDetailsFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionDetailsQuery @relay_test_operation {
        sale(id: "foo") {
          ...AuctionDetails_sale
        }
      }
    `,
  })

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("shows correct title", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Auction Name",
      }),
    })
    expect(screen.getByText("Auction Name")).toBeInTheDocument()
  })

  it("shows register button", () => {
    expect(() =>
      renderWithRelay({
        Sale: () => ({
          name: "Auction Name",
          isRegistrationClosed: false,
        }),
      }),
    ).not.toThrow()
  })

  it.skip("shows formatted start time", () => {
    renderWithRelay({
      Sale: () => ({
        auctionsDetailFormattedStartDateTime: "Mar 22, 2022 • 9:22pm GMT",
      }),
    })
    expect(screen.getByText("Mar 22, 2022 • 9:22pm GMT")).toBeInTheDocument()
  })

  it("shows add to calendar button", () => {
    renderWithRelay({
      Sale: () => ({
        isClosed: false,
      }),
    })
    expect(screen.getByText("+ Add to Calendar")).toBeInTheDocument()
  })

  it("shows sale description", () => {
    renderWithRelay({
      Sale: () => ({
        description: "Auction description",
      }),
    })
    expect(screen.getByText("Auction description")).toBeInTheDocument()
  })

  it("shows the sidebar info", () => {
    expect(() => renderWithRelay()).not.toThrow()
  })
})
