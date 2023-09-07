import { screen } from "@testing-library/react"
import { AuctionResultTestQuery } from "__generated__/AuctionResultTestQuery.graphql"
import { AuctionResultFragmentContainer } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResult"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("AuctionResult", () => {
  const { renderWithRelay } = setupTestWrapperTL<AuctionResultTestQuery>({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint="lg">
          <AuctionResultFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query AuctionResultTestQuery @relay_test_operation {
        auctionResult(id: "foo-bar") {
          ...AuctionResult_auctionResult
        }
      }
    `,
  })

  describe("Auction result data", () => {
    describe("when it's a past auction", () => {
      it("renders the auction result data", () => {
        renderWithRelay({ AuctionResult: () => mockAuctionResult })

        expect(screen.getByText("Carrie Mae Weems")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Some Said You Were the Spitting Image of Evil, 1995"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Sale Price")).toBeInTheDocument()
        expect(screen.getByText("US$35,280")).toBeInTheDocument()
        expect(screen.getByText("+41% est")).toBeInTheDocument()

        expect(screen.getByText("Pre-sale estimate")).toBeInTheDocument()
        expect(screen.getByText("US$20,000–US$30,000")).toBeInTheDocument()

        expect(screen.getByText("Medium")).toBeInTheDocument()
        expect(
          screen.getByText(
            "chromogenic print and etched glass in an artist's frame"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Dimensions")).toBeInTheDocument()
        expect(screen.getByText("67.6 x 57.8 cm")).toBeInTheDocument()

        expect(screen.getByText("Sale Date")).toBeInTheDocument()
        expect(screen.getByText("Jul 08, 2022")).toBeInTheDocument()

        expect(screen.getByText("Auction house")).toBeInTheDocument()
        expect(screen.getByText("Sotheby's")).toBeInTheDocument()

        expect(screen.getByText("Sale location")).toBeInTheDocument()
        expect(screen.getByText("Berlin, Germany")).toBeInTheDocument()

        expect(screen.getByText("Sale name")).toBeInTheDocument()
        expect(screen.getByText("Contemporary Discoveries")).toBeInTheDocument()

        expect(screen.getByText("Lot")).toBeInTheDocument()
        expect(screen.getByText("55")).toBeInTheDocument()
      })

      it("renders the auction result data with non-USD currency", () => {
        renderWithRelay({
          AuctionResult: () => ({
            ...mockAuctionResult,
            currency: "EUR",
            priceRealized: {
              display: "€35,280",
              displayUSD: "US$35,280",
            },
          }),
        })

        expect(screen.getByText("Carrie Mae Weems")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Some Said You Were the Spitting Image of Evil, 1995"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Sale Price")).toBeInTheDocument()
        expect(screen.getByText("€35,280")).toBeInTheDocument()
        expect(screen.getByText("+41% est")).toBeInTheDocument()
        expect(screen.getByText("US$35,280")).toBeInTheDocument()
      })

      it("renders the auction result data with no sale price", () => {
        renderWithRelay({
          AuctionResult: () => ({
            ...mockAuctionResult,
            priceRealized: null,
          }),
        })

        expect(screen.getByText("Carrie Mae Weems")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Some Said You Were the Spitting Image of Evil, 1995"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Sale Price")).toBeInTheDocument()
        expect(screen.getByText("Price not available")).toBeInTheDocument()
      })

      it("renders the auction result data when bought in", () => {
        renderWithRelay({
          AuctionResult: () => ({
            ...mockAuctionResult,
            priceRealized: null,
            boughtIn: true,
          }),
        })

        expect(screen.getByText("Carrie Mae Weems")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Some Said You Were the Spitting Image of Evil, 1995"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Sale Price")).toBeInTheDocument()
        expect(screen.getByText("Bought In")).toBeInTheDocument()
      })

      it("renders the auction result data with awaiting results", () => {
        const lastMonth = new Date().setDate(new Date().getDate() - 1)
        const lastMonthISO = new Date(lastMonth).toISOString()

        renderWithRelay({
          AuctionResult: () => ({
            ...mockAuctionResult,
            saleDate: lastMonthISO,
            priceRealized: null,
          }),
        })

        expect(screen.getByText("Carrie Mae Weems")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Some Said You Were the Spitting Image of Evil, 1995"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Sale Price")).toBeInTheDocument()
        expect(screen.getByText("Awaiting results")).toBeInTheDocument()
      })
    })

    describe("when it's an upcoming auction", () => {
      it("renders the auction result data with estimate when available", () => {
        renderWithRelay({
          AuctionResult: () => ({ ...mockAuctionResult, isUpcoming: true }),
        })

        expect(screen.getByText("Carrie Mae Weems")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Some Said You Were the Spitting Image of Evil, 1995"
          )
        ).toBeInTheDocument()

        expect(screen.queryByText("Sale Price")).not.toBeInTheDocument()

        expect(screen.getByText("Pre-sale Estimate")).toBeInTheDocument()
        expect(screen.getByText("US$20,000–US$30,000")).toBeInTheDocument()

        expect(screen.getByText("Medium")).toBeInTheDocument()
        expect(
          screen.getByText(
            "chromogenic print and etched glass in an artist's frame"
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Dimensions")).toBeInTheDocument()
        expect(screen.getByText("67.6 x 57.8 cm")).toBeInTheDocument()

        expect(screen.getByText("Sale Date")).toBeInTheDocument()
        expect(screen.getByText("Jul 08, 2022")).toBeInTheDocument()

        expect(screen.getByText("Auction house")).toBeInTheDocument()
        expect(screen.getByText("Sotheby's")).toBeInTheDocument()

        expect(screen.getByText("Sale location")).toBeInTheDocument()
        expect(screen.getByText("Berlin, Germany")).toBeInTheDocument()

        expect(screen.getByText("Sale name")).toBeInTheDocument()
        expect(screen.getByText("Contemporary Discoveries")).toBeInTheDocument()

        expect(screen.getByText("Lot")).toBeInTheDocument()
        expect(screen.getByText("55")).toBeInTheDocument()
      })

      it("renders the auction result data without estimate when not available", () => {
        renderWithRelay({
          AuctionResult: () => ({
            ...mockAuctionResult,
            isUpcoming: true,
            estimate: null,
          }),
        })

        expect(screen.queryByText("Sale Price")).not.toBeInTheDocument()

        expect(screen.getByText("Pre-sale Estimate")).toBeInTheDocument()
        expect(screen.getByText("Estimate not available")).toBeInTheDocument()
      })
    })
  })
})

const mockAuctionResult = {
  artist: { name: "Carrie Mae Weems" },
  title: "Some Said You Were the Spitting Image of Evil",
  images: {
    larger: {
      resized: {
        src: "image-url",
        srcSet: "image-url",
        height: null,
        width: null,
      },
    },
  },
  mediumText: "chromogenic print and etched glass in an artist's frame",
  dimensionText: "67.6 x 57.8 cm",
  formattedSaleDate: "Jul 08, 2022",
  organization: "Sotheby's",
  location: "Berlin, Germany",
  saleTitle: "Contemporary Discoveries",
  lotNumber: "55",
  estimate: {
    display: "US$20,000–US$30,000",
  },
  isUpcoming: false,
  saleDate: "2022-07-08T00:00:00.000Z",
  currency: "USD",
  boughtIn: false,
  performance: {
    mid: "41%",
  },
  priceRealized: {
    display: "US$35,280",
    displayUSD: "US$35,280",
  },
  dateText: "1995",
  comparableAuctionResults: {
    edges: [],
  },
}
