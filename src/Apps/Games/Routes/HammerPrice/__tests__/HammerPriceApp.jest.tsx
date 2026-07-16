import { fireEvent, screen, waitFor } from "@testing-library/react"
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

// The Roni Horn puzzle: US$1,804,500, padded to the standard 8 digits
const TARGET_DIGITS = "01804500"

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

const getInput = () => {
  return screen.getByRole("textbox", { name: /Your guess/ })
}

const getSubmit = () => {
  return screen.getByRole("button", { name: "Submit guess" })
}

const enterGuess = (digits: string) => {
  fireEvent.change(getInput(), { target: { value: digits } })
}

const getGuessCount = (usedCount: number) => {
  return screen.getByRole("list", {
    name: `Guesses, ${usedCount} of 6 used`,
  })
}

const findGuessCount = (usedCount: number) => {
  return screen.findByRole("list", {
    name: `Guesses, ${usedCount} of 6 used`,
  })
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

  it("links the attribution to the full auction record", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    const link = screen.getByRole("link", {
      name: "Source: Artsy Price Database",
    })

    expect(link).toHaveAttribute("href", "/auction-result/7231067")
  })

  it("only shows the submit button once every digit is entered", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    expect(
      screen.queryByRole("button", { name: "Submit guess" }),
    ).not.toBeInTheDocument()

    enterGuess("123")
    expect(
      screen.queryByRole("button", { name: "Submit guess" }),
    ).not.toBeInTheDocument()

    enterGuess(TARGET_DIGITS)
    expect(getSubmit()).toBeInTheDocument()

    expect(getGuessCount(0)).toBeInTheDocument()
  })

  it("only accepts digits, up to the fixed width", () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    enterGuess("12ab34xy567890")

    // Non-digits stripped, truncated to 8 digits
    expect(getInput()).toHaveValue("12345678")
  })

  it("scores a submitted guess digit by digit", async () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    enterGuess("20904500")
    fireEvent.click(getSubmit())

    expect(getGuessCount(1)).toBeInTheDocument()

    expect(
      screen.getByText("Guess 1: 20,904,500. 5 correct, 3 close, 0 incorrect."),
    ).toBeInTheDocument()

    // Announced to screen readers
    expect(
      screen.getByText(/Guess 1 of 6 submitted\. Digit 1 is 2: close\./),
    ).toBeInTheDocument()

    // Let the reveal finish so the next row is interactive again
    await waitFor(() => expect(getInput()).not.toBeDisabled())
  })

  it("reveals the price and shows the result dialog on a win", async () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    enterGuess(TARGET_DIGITS)
    fireEvent.click(getSubmit())

    expect(
      await screen.findByText("Sold, on your first guess!"),
    ).toBeInTheDocument()
    expect(screen.getAllByText("US$1,804,500").length).toBeGreaterThan(0)
  })

  it("ends the game and reveals the price after six failed guesses", async () => {
    renderWithRelay({ AuctionResult: mockAuctionResult })

    // Five wrong guesses, waiting for each reveal to finish
    for (let i = 0; i < 5; i++) {
      enterGuess("99999999")
      fireEvent.click(getSubmit())

      await waitFor(() => expect(getInput()).not.toBeDisabled())
    }

    // The sixth wrong guess ends the game
    enterGuess("99999999")
    fireEvent.click(getSubmit())

    expect(await screen.findByText("Better luck tomorrow")).toBeInTheDocument()
    expect(screen.getAllByText("US$1,804,500").length).toBeGreaterThan(0)

    expect(
      screen.queryByRole("button", { name: "Submit guess" }),
    ).not.toBeInTheDocument()
  })

  it("persists progress for return visits", async () => {
    const { unmount } = renderWithRelay({ AuctionResult: mockAuctionResult })

    enterGuess("20904500")
    fireEvent.click(getSubmit())

    await findGuessCount(1)

    unmount()

    renderWithRelay({ AuctionResult: mockAuctionResult })

    expect(await findGuessCount(1)).toBeInTheDocument()
  })

  it("shows feedback colors for every restored row, not just the first", async () => {
    // Two prior guesses for the Roni Horn puzzle (hp-2026-07-13), the second
    // of which wins — simulates reloading a solved puzzle.
    localStorage.setItem(
      "hammerPrice:v1:progress:hp-2026-07-13",
      JSON.stringify({
        puzzleId: "hp-2026-07-13",
        guesses: ["99999999", TARGET_DIGITS],
        updatedAt: "2026-07-13T00:00:00.000Z",
      }),
    )

    renderWithRelay({ AuctionResult: mockAuctionResult })

    await findGuessCount(2)

    // Every cell in the two restored rows should show its scored feedback
    // color immediately — none should be left "concealed" (unrevealed).
    expect(
      document.querySelectorAll('[data-cell-state="concealed"]'),
    ).toHaveLength(0)
    expect(
      document.querySelectorAll('[data-cell-state="exact"]').length,
    ).toBeGreaterThan(0)
    expect(
      document.querySelectorAll('[data-cell-state="close"]').length,
    ).toBeGreaterThan(0)
    expect(
      document.querySelectorAll('[data-cell-state="miss"]').length,
    ).toBeGreaterThan(0)
  })
})
