import { fireEvent, screen } from "@testing-library/react"
import { HammerPriceAppFragmentContainer } from "Apps/Games/Routes/HammerPrice/HammerPriceApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { HammerPriceApp_Test_Query } from "__generated__/HammerPriceApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: { slug: "roni-horn-untitled-the-yes-without-the-no" },
      location: {
        pathname:
          "/games/hammer-price/puzzles/roni-horn-untitled-the-yes-without-the-no",
      },
    },
  }),
}))

// The Roni Horn puzzle: US$1,804,500 across 7 digits
const TARGET_DIGITS = "1804500"

const { renderWithRelay } = setupTestWrapperTL<HammerPriceApp_Test_Query>({
  Component: HammerPriceAppFragmentContainer,
  query: graphql`
    query HammerPriceApp_Test_Query @relay_test_operation {
      auctionResult(id: "7231067") {
        ...HammerPriceApp_auctionResult
      }
    }
  `,
})

const mockAuctionResult = () => ({
  internalID: "7231067",
  title: "Untitled (“The yes without the no.”)",
  dateText: "2013",
  artist: { name: "Roni Horn" },
  mediumText: "solid cast glass with as-cast surfaces",
  dimensionText: "137.2 x 142.2 cm",
  organization: "Christie’s",
  location: "New York",
  saleTitle: "21st Century Evening Sale",
  lotNumber: "14",
})

const submitGuess = (digits: string) => {
  const input = screen.getByRole("textbox", { name: /Your guess/ })

  fireEvent.change(input, { target: { value: digits } })
  fireEvent.click(screen.getByRole("button", { name: "Submit guess" }))
}

describe("HammerPriceApp", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders the game-safe auction record", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    expect(screen.getByText("Hammer Price")).toBeInTheDocument()
    expect(screen.getByText(/Roni Horn/)).toBeInTheDocument()
    expect(
      screen.getByText("solid cast glass with as-cast surfaces"),
    ).toBeInTheDocument()
    expect(screen.getByText("Auction house")).toBeInTheDocument()

    // Never renders the answer before the game is complete
    expect(screen.queryByText(/1,804,500/)).not.toBeInTheDocument()
    expect(screen.queryByText(/estimate/i)).not.toBeInTheDocument()
  })

  it("links to the full auction record with a spoiler warning", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    const link = screen.getByRole("link", {
      name: "View the full auction record",
    })

    expect(link).toHaveAttribute("href", "/auction-result/7231067")
    expect(screen.getByText(/it reveals the answer/)).toBeInTheDocument()
  })

  it("rejects an incomplete guess with an error message", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    submitGuess("123")

    expect(
      screen.getByText(/Enter all 7 digits before submitting/),
    ).toBeInTheDocument()
    expect(screen.getByText("6 guesses left")).toBeInTheDocument()
  })

  it("scores a submitted guess and formats the entry with separators", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    const input = screen.getByRole("textbox", { name: /Your guess/ })

    fireEvent.change(input, { target: { value: "2904500" } })

    expect(input).toHaveValue("2,904,500")

    fireEvent.click(screen.getByRole("button", { name: "Submit guess" }))

    expect(screen.getByText("5 guesses left")).toBeInTheDocument()

    expect(
      screen.getByText("Guess 1: 2,904,500. 5 correct, 2 close, 0 incorrect."),
    ).toBeInTheDocument()

    // Announced to screen readers
    expect(
      screen.getByText(/Guess 1 of 6 submitted\. Digit 1 is 2: close\./),
    ).toBeInTheDocument()
  })

  it("reveals the price and shows the result dialog on a win", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    submitGuess(TARGET_DIGITS)

    expect(screen.getByText("Sold — on your first guess!")).toBeInTheDocument()
    expect(screen.getAllByText("US$1,804,500").length).toBeGreaterThan(0)
  })

  it("ends the game and reveals the price after six failed guesses", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    Array.from({ length: 6 }).forEach(() => {
      submitGuess("9999999")
    })

    expect(screen.getByText("Better luck tomorrow")).toBeInTheDocument()
    expect(screen.getAllByText("US$1,804,500").length).toBeGreaterThan(0)

    // The guess form is gone once the game is over
    expect(
      screen.queryByRole("button", { name: "Submit guess" }),
    ).not.toBeInTheDocument()
  })

  it("persists progress for return visits", () => {
    const { unmount } = renderWithRelay({ AuctionResult: mockAuctionResult })

    submitGuess("2904500")

    unmount()

    renderWithRelay({ AuctionResult: mockAuctionResult })

    expect(screen.getByText("5 guesses left")).toBeInTheDocument()
  })
})
