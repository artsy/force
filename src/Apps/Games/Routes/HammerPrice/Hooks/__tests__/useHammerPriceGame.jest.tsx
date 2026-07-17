import { fireEvent, screen } from "@testing-library/react"
import { useHammerPriceGame } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import type {
  GameProgressStore,
  HammerPriceGameProgress,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { useHammerPriceGame_Test_Query } from "__generated__/useHammerPriceGame_Test_Query.graphql"
import type { useHammerPriceGame_auctionResult$key } from "__generated__/useHammerPriceGame_auctionResult.graphql"
import { useState } from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const createInMemoryStore = (
  initial: HammerPriceGameProgress[] = [],
): GameProgressStore => {
  const state = new Map(
    initial.map(progress => [progress.auctionResultId, progress]),
  )

  return {
    getProgress: auctionResultId => state.get(auctionResultId) ?? null,
    saveProgress: progress => {
      state.set(progress.auctionResultId, progress)
    },
    listProgress: () => Array.from(state.values()),
    clearProgress: auctionResultId => {
      state.delete(auctionResultId)
    },
  }
}

let store: GameProgressStore

interface GameProbeProps {
  auctionResult: useHammerPriceGame_auctionResult$key
}

/** Renders the hook's output into the DOM so tests can drive and assert it */
const GameProbe: React.FC<GameProbeProps> = ({ auctionResult }) => {
  const game = useHammerPriceGame({ auctionResult, store })
  const [entry, setEntry] = useState("")

  return (
    <div>
      <div data-testid="status">{game.status}</div>
      <div data-testid="targetDigits">{String(game.targetDigits)}</div>
      <div data-testid="digitCount">{game.digitCount}</div>
      <div data-testid="isPlayable">{String(game.isPlayable)}</div>
      <div data-testid="isRestored">{String(game.isRestored)}</div>
      <div data-testid="guessesRemaining">{game.guessesRemaining}</div>

      <div data-testid="guesses">
        {game.guesses
          .map(guess => `${guess.digits}:${guess.feedback.join(",")}`)
          .join("|")}
      </div>

      <input
        data-testid="entry"
        value={entry}
        onChange={event => setEntry(event.currentTarget.value)}
      />

      <button
        type="button"
        data-testid="submit"
        onClick={() => game.submitGuess(entry)}
      >
        submit
      </button>
    </div>
  )
}

const { renderWithRelay } = setupTestWrapperTL<useHammerPriceGame_Test_Query>({
  Component: props => {
    return <GameProbe auctionResult={props.auctionResult!} />
  },
  query: graphql`
    query useHammerPriceGame_Test_Query @relay_test_operation {
      auctionResult(id: "example") {
        ...useHammerPriceGame_auctionResult
      }
    }
  `,
})

const mockPlayableAuctionResult = () => ({
  internalID: "hp-test",
  // US$985,000 → target digits "00985000"
  priceRealized: { centsUSD: 98_500_000 },
})

const submitGuess = (digits: string) => {
  fireEvent.change(screen.getByTestId("entry"), { target: { value: digits } })
  fireEvent.click(screen.getByTestId("submit"))
}

const probe = (testId: string) => screen.getByTestId(testId).textContent

describe("useHammerPriceGame", () => {
  beforeEach(() => {
    store = createInMemoryStore()
  })

  it("starts a fresh game", () => {
    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    expect(probe("status")).toBe("notStarted")
    expect(probe("targetDigits")).toBe("00985000")
    expect(probe("digitCount")).toBe("8")
    expect(probe("isPlayable")).toBe("true")
    expect(probe("isRestored")).toBe("true")
    expect(probe("guessesRemaining")).toBe("6")
    expect(probe("guesses")).toBe("")
  })

  it("scores and records a submitted guess", () => {
    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    submitGuess("10985000")

    expect(probe("status")).toBe("inProgress")
    expect(probe("guesses")).toBe(
      "10985000:close,exact,exact,exact,exact,exact,exact,exact",
    )
    expect(store.getProgress("hp-test")?.guesses).toEqual(["10985000"])
  })

  it("rejects incomplete or invalid guesses", () => {
    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    submitGuess("123")
    submitGuess("")
    submitGuess("12345ab8")

    expect(probe("guesses")).toBe("")
    expect(probe("status")).toBe("notStarted")
  })

  it("wins when every digit is exact and rejects further guesses", () => {
    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    submitGuess("00985000")

    expect(probe("status")).toBe("won")

    submitGuess("11111111")

    expect(probe("guessesRemaining")).toBe("5")
  })

  it("loses after six incorrect guesses", () => {
    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    Array.from({ length: 6 }).forEach(() => {
      submitGuess("11111111")
    })

    expect(probe("status")).toBe("lost")
    expect(probe("guessesRemaining")).toBe("0")
  })

  it("restores persisted progress", () => {
    store = createInMemoryStore([
      {
        auctionResultId: "hp-test",
        guesses: ["11111111", "00985000"],
        updatedAt: "2026-07-14T00:00:00.000Z",
      },
    ])

    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    expect(probe("isRestored")).toBe("true")
    expect(probe("status")).toBe("won")
    expect(probe("guessesRemaining")).toBe("4")
  })

  it("discards malformed persisted guesses", () => {
    store = createInMemoryStore([
      {
        auctionResultId: "hp-test",
        guesses: ["123", "abcdefgh", "11111111"],
        updatedAt: "2026-07-14T00:00:00.000Z",
      },
    ])

    renderWithRelay({ AuctionResult: mockPlayableAuctionResult })

    expect(probe("guesses")).toBe(
      "11111111:close,close,miss,miss,miss,close,close,close",
    )
  })

  it("is unplayable when the lot has no realized price", () => {
    renderWithRelay({
      AuctionResult: () => ({
        internalID: "hp-unsold",
        priceRealized: { centsUSD: null },
      }),
    })

    expect(probe("isPlayable")).toBe("false")
    expect(probe("targetDigits")).toBe("null")

    submitGuess("00985000")

    expect(probe("guesses")).toBe("")
  })

  it("widens the grid for prices beyond the standard width", () => {
    renderWithRelay({
      AuctionResult: () => ({
        internalID: "hp-huge",
        // US$123,456,789 → 9 digits
        priceRealized: { centsUSD: 12_345_678_900 },
      }),
    })

    expect(probe("digitCount")).toBe("9")
    expect(probe("targetDigits")).toBe("123456789")

    submitGuess("123456789")

    expect(probe("status")).toBe("won")
  })
})
