import { render, screen } from "@testing-library/react"
import {
  DEFAULT_TIMEOUT_AMOUNT,
  HomeContentCards,
} from "Apps/Home/Components/HomeContentCards"

jest.mock("Apps/Home/Components/HomeContentCards/BrazeCards", () => ({
  BrazeCards: () => "BrazeCards",
}))

jest.mock("Apps/Home/Components/HomeContentCards/FallbackCards", () => ({
  FallbackCards: () => "FallbackCards",
}))

jest.mock("Apps/Home/Components/HomeContentCards/PlaceholderCards", () => ({
  PlaceholderCards: () => "PlaceholderCards",
}))

describe("HomeContentCards", () => {
  jest.useFakeTimers()

  beforeEach(() => {
    window.analytics = { ready: callback => callback() } as any

    window.appboy = {
      removeSubscription: jest.fn(),
      requestContentCardsRefresh: jest.fn(),
      subscribeToContentCardsUpdates: jest.fn(),
    } as any
  })

  it("starts out with placeholder cards", () => {
    render(<HomeContentCards />)
    expect(screen.getByText("PlaceholderCards")).toBeInTheDocument()
  })

  it("switches to fallback cards after timeout", () => {
    render(<HomeContentCards />)
    expect(screen.getByText("PlaceholderCards")).toBeInTheDocument()
    jest.advanceTimersByTime(DEFAULT_TIMEOUT_AMOUNT)
    expect(screen.getByText("FallbackCards")).toBeInTheDocument()
  })

  it("switches to fallback cards when segment is never ready", () => {
    window.appboy = undefined as any

    window.analytics = {
      ready: () => {},
    } as any

    render(<HomeContentCards />)
    expect(screen.getByText("PlaceholderCards")).toBeInTheDocument()
    jest.advanceTimersByTime(DEFAULT_TIMEOUT_AMOUNT)
    expect(screen.getByText("FallbackCards")).toBeInTheDocument()
  })

  it("switches to fallback cards when appboy never shows up", () => {
    const artificialSegmentDelay = 10
    window.appboy = undefined as any

    window.analytics = {
      ready: callback => {
        setTimeout(() => {
          callback()
        }, artificialSegmentDelay)
      },
    } as any

    render(<HomeContentCards />)
    expect(screen.getByText("PlaceholderCards")).toBeInTheDocument()
    jest.advanceTimersByTime(artificialSegmentDelay)
    expect(screen.getByText("FallbackCards")).toBeInTheDocument()
  })

  it("renders braze cards when they are returned", () => {
    const mockUpdater = callback => callback()
    window.appboy.subscribeToContentCardsUpdates = mockUpdater
    window.appboy.getCachedContentCards = () => ({ cards: [{}] } as any)

    render(<HomeContentCards />)

    expect(screen.getByText("BrazeCards")).toBeInTheDocument()
  })
})
