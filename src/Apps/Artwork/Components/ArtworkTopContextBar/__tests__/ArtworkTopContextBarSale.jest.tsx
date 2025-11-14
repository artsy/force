import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { ArtworkTopContextBarSale } from "../ArtworkTopContextBarSale"

jest.unmock("react-relay")

jest.mock("Components/TopContextBar", () => ({
  TopContextBar: ({
    children,
    href,
    src,
    displayBackArrow,
    preferHistoryBack,
    rightContent,
  }) => (
    <div
      data-testid="top-context-bar"
      data-href={href}
      data-src={src}
      data-display-back-arrow={displayBackArrow}
      data-prefer-history-back={preferHistoryBack}
    >
      {children}
      {rightContent}
    </div>
  ),
}))

jest.mock("../RegistrationAuctionTimer", () => ({
  RegistrationAuctionTimerFragmentContainer: ({ sale }) => (
    <div data-testid="registration-auction-timer">Timer for: {sale.name}</div>
  ),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <ArtworkTopContextBarSale id="sale-id" {...props} />
  ),
  query: graphql`
    query ArtworkTopContextBarSale_test_Query @relay_test_operation {
      sale(id: "sale-id") {
        ...RegistrationAuctionTimer_sale
        name
        href
        isAuction
        isBenefit
        isGalleryAuction
        coverImage {
          url
        }
        partner {
          name
        }
      }
    }
  `,
})

describe("ArtworkTopContextBarSale", () => {
  it("renders null when sale data is not available", () => {
    const mockResolvers = {
      Query: () => ({
        sale: null,
      }),
    }

    renderWithRelay(mockResolvers)

    expect(screen.queryByTestId("top-context-bar")).not.toBeInTheDocument()
  })

  it("renders auction information correctly", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Contemporary Evening Sale",
        href: "/auction/contemporary-evening-sale",
        isAuction: true,
        isBenefit: false,
        isGalleryAuction: false,
        coverImage: {
          url: "https://example.com/image.jpg",
        },
        partner: {
          name: "Christie's",
        },
      }),
    })

    const topContextBar = screen.getByTestId("top-context-bar")
    expect(topContextBar).toBeInTheDocument()
    expect(topContextBar).toHaveAttribute(
      "data-href",
      "/auction/contemporary-evening-sale",
    )
    expect(topContextBar).toHaveAttribute(
      "data-src",
      "https://example.com/image.jpg",
    )
    expect(topContextBar).toHaveAttribute("data-display-back-arrow", "true")
    expect(topContextBar).toHaveAttribute("data-prefer-history-back", "true")

    expect(screen.getByText("Contemporary Evening Sale")).toBeInTheDocument()
    expect(screen.getByText("Auction by Christie's")).toBeInTheDocument()
    expect(screen.getByTestId("registration-auction-timer")).toBeInTheDocument()
    expect(
      screen.getByText("Timer for: Contemporary Evening Sale"),
    ).toBeInTheDocument()
  })

  it("renders benefit auction information correctly", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Benefit Auction 2023",
        href: "/auction/benefit-auction-2023",
        isAuction: true,
        isBenefit: true,
        isGalleryAuction: false,
        coverImage: {
          url: "https://example.com/image.jpg",
        },
        partner: {
          name: "Partner Name",
        },
      }),
    })

    expect(screen.getByText("Benefit Auction 2023")).toBeInTheDocument()
    expect(
      screen.getByText("Benefit Auction by Partner Name"),
    ).toBeInTheDocument()
  })

  it("renders gallery auction information correctly", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Gallery Auction 2023",
        href: "/auction/gallery-auction-2023",
        isAuction: true,
        isBenefit: false,
        isGalleryAuction: true,
        coverImage: {
          url: "https://example.com/image.jpg",
        },
        partner: {
          name: "Gallery Name",
        },
      }),
    })

    expect(screen.getByText("Gallery Auction 2023")).toBeInTheDocument()
    expect(
      screen.getByText("Gallery Auction by Gallery Name"),
    ).toBeInTheDocument()
  })

  it("renders sale information correctly when not an auction", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Gallery Sale",
        href: "/sale/gallery-sale",
        isAuction: false,
        isBenefit: false,
        isGalleryAuction: false,
        coverImage: {
          url: "https://example.com/image.jpg",
        },
        partner: {
          name: "Gallery Name",
        },
      }),
    })

    expect(screen.getByText("Gallery Sale")).toBeInTheDocument()
    expect(screen.getByText("Sale by Gallery Name")).toBeInTheDocument()
  })

  it("handles missing partner name", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Sale Without Partner",
        href: "/sale/sale-without-partner",
        isAuction: true,
        isBenefit: false,
        isGalleryAuction: false,
        coverImage: {
          url: "https://example.com/image.jpg",
        },
        partner: null,
      }),
    })

    expect(screen.getByText("Sale Without Partner")).toBeInTheDocument()
    expect(screen.getByText("Auction")).toBeInTheDocument()
    expect(screen.queryByText(/by/)).not.toBeInTheDocument()
  })
})
