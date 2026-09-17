import { fireEvent, render, screen } from "@testing-library/react"
import { ArtistHeaderRecentAuctionResultItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResultItem"
import type { RecentAuctionResult } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResults"
import { MockBoot } from "DevTools/MockBoot"

let mockUser: { id: string } | null = null
const mockShowAuthDialog = jest.fn()

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ user: mockUser }),
}))

jest.mock("Components/AuthDialog", () => {
  const actual = jest.requireActual("Components/AuthDialog")
  return {
    ...actual,
    useAuthDialog: () => ({ showAuthDialog: mockShowAuthDialog }),
  }
})

const baseAuctionResult: RecentAuctionResult = {
  internalID: "auction-result-1",
  title: "Poinsettias (F. & S. IIIA.50)",
  dateText: null,
  images: {
    thumbnail: {
      resized: {
        src: "https://example.com/image.jpg",
        srcSet: "https://example.com/image.jpg 1x",
      },
    },
  },
  priceRealized: {
    display: "$16,510",
    centsUSD: 1651000,
  },
} as RecentAuctionResult

const renderItem = (
  auctionResult: Partial<RecentAuctionResult> = {},
  isPriceGated?: boolean,
) => {
  return render(
    <MockBoot>
      <ArtistHeaderRecentAuctionResultItem
        auctionResult={{ ...baseAuctionResult, ...auctionResult }}
        isPriceGated={isPriceGated}
      />
    </MockBoot>,
  )
}

describe("ArtistHeaderRecentAuctionResultItem", () => {
  beforeEach(() => {
    mockUser = null
    mockShowAuthDialog.mockClear()
  })

  it("links to the auction result page", () => {
    renderItem()

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/auction-result/auction-result-1",
    )
  })

  it("renders the title without a date when dateText is absent", () => {
    renderItem({ dateText: null })

    expect(
      screen.getByText("Poinsettias (F. & S. IIIA.50)"),
    ).toBeInTheDocument()
  })

  it("appends dateText to the title when present", () => {
    renderItem({ title: "Tête de jeune fille", dateText: "1945" })

    expect(screen.getByText("Tête de jeune fille, 1945")).toBeInTheDocument()
  })

  it("renders a fallback icon when there is no image", () => {
    renderItem({ images: { thumbnail: null } })

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("falls back to the placeholder icon when the image fails to load", () => {
    const { container } = renderItem()

    const image = container.querySelector("img")
    expect(image).toBeInTheDocument()

    fireEvent.error(image as HTMLImageElement)

    expect(container.querySelector("img")).not.toBeInTheDocument()
  })

  it("fits the whole image within its box, preserving aspect ratio, rather than cropping or stretching it", () => {
    const { container } = renderItem()

    expect(container.querySelector("img")).toHaveStyle({
      objectFit: "contain",
    })
  })

  it("blends letterbox padding around a contained image into the card, not the no-image grey", () => {
    const { container } = renderItem()

    const image = container.querySelector("img")
    expect(image?.parentElement).toHaveStyle({
      backgroundColor: "#F7F7F7",
    })
  })

  it("keeps a darker grey background behind the no-image glyph", () => {
    const { container } = renderItem({ images: { thumbnail: null } })

    const svg = container.querySelector("svg")
    expect(svg?.parentElement?.parentElement).toHaveStyle({
      backgroundColor: "#E7E7E7",
    })
  })

  it("shows the formatted sale date when present", () => {
    renderItem({ saleDate: "2023-11-22T00:00:00+00:00" })

    expect(screen.getByText("Nov 22, 2023")).toBeInTheDocument()
  })

  it("orders content as date, title, price, then performance", () => {
    const { container } = renderItem({
      title: "Tête de jeune fille",
      dateText: "1945",
      saleDate: "2023-11-22T00:00:00+00:00",
      performance: { mid: "12%" },
    })

    const text = container.textContent ?? ""

    expect(text.indexOf("Nov 22, 2023")).toBeLessThan(
      text.indexOf("Tête de jeune fille, 1945"),
    )
    expect(text.indexOf("Tête de jeune fille, 1945")).toBeLessThan(
      text.indexOf("$16,510"),
    )
    expect(text.indexOf("$16,510")).toBeLessThan(text.indexOf("+12% est"))
  })

  it("shows a positive performance delta in green", () => {
    renderItem({ performance: { mid: "12%" } })

    const delta = screen.getByText("+12% est")
    expect(delta).toBeInTheDocument()
    expect(delta).toHaveStyle({ color: "#00674A" })
  })

  it("shows a negative performance delta in red", () => {
    renderItem({ performance: { mid: "-12%" } })

    const delta = screen.getByText("-12% est")
    expect(delta).toBeInTheDocument()
    expect(delta).toHaveStyle({ color: "#D71023" })
  })

  describe("price", () => {
    it("shows the price when not gated", () => {
      renderItem()

      expect(screen.getByText("$16,510")).toBeInTheDocument()
    })

    it("treats a zero-cent price as unavailable", () => {
      renderItem({ priceRealized: { display: "$0", centsUSD: 0 } })

      expect(screen.getByText("Price not available")).toBeInTheDocument()
    })

    it("shows a price-not-available message when there is no price", () => {
      renderItem({ priceRealized: null })

      expect(screen.getByText("Price not available")).toBeInTheDocument()
    })

    it("shows the price when gated but the viewer is signed in", () => {
      mockUser = { id: "logged-in-user" }

      renderItem({}, true)

      expect(screen.getByText("$16,510")).toBeInTheDocument()
    })
  })

  describe("when gated and signed out", () => {
    it("shows a sign-up prompt instead of the price", () => {
      renderItem({}, true)

      expect(screen.getByText("Sign up to see price")).toBeInTheDocument()
      expect(screen.queryByText("$16,510")).not.toBeInTheDocument()
    })
  })

  // The full auction-result page requires an account for any visitor, so
  // a signed-out click should never navigate there — regardless of
  // whether this particular card's price is gated, since that's purely
  // about what's visible on the rail itself, not click-through access.
  describe("clicking through while signed out", () => {
    it("prevents navigation and shows the auth dialog for a non-gated item", () => {
      renderItem()

      fireEvent.click(screen.getByRole("link"))

      expect(mockShowAuthDialog).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            title: expect.stringContaining("Sign up or log in"),
          }),
        }),
      )
    })

    it("prevents navigation and shows the auth dialog for a gated item", () => {
      renderItem({}, true)

      fireEvent.click(screen.getByRole("link"))

      expect(mockShowAuthDialog).toHaveBeenCalled()
    })

    it("shows the auth dialog when clicking the sign-up prompt text itself", () => {
      renderItem({}, true)

      fireEvent.click(screen.getByText("Sign up to see price"))

      expect(mockShowAuthDialog).toHaveBeenCalled()
    })
  })

  describe("clicking through while signed in", () => {
    it("does not show the auth dialog, gated or not", () => {
      mockUser = { id: "logged-in-user" }

      renderItem({}, true)

      fireEvent.click(screen.getByRole("link"))

      expect(mockShowAuthDialog).not.toHaveBeenCalled()
    })
  })
})
