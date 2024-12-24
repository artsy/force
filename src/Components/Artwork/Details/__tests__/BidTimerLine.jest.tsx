import { screen } from "@testing-library/react"
import { BidTimerLine } from "Components/Artwork/Details/BidTimerLine"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useTimer } from "Utils/Hooks/useTimer"
import type { BidTimerLineTestQuery } from "__generated__/BidTimerLineTestQuery.graphql"
import { DateTime } from "luxon"
import { graphql } from "react-relay"

jest.mock("Components/ArtworkGrid/ArtworkGridContext")
jest.mock("Utils/Hooks/useTimer")
jest.unmock("react-relay")

const mockUseArtworkGridContext = useArtworkGridContext as jest.Mock
const mockUseTimer = useTimer as jest.Mock

const mockTimer = (
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
) => {
  mockUseTimer.mockReturnValue({
    time: { days, hours, minutes, seconds },
  })
}

const mockArtworkGridContext = (isAuctionArtwork: boolean) => {
  mockUseArtworkGridContext.mockReturnValue({ isAuctionArtwork })
}

describe("BidTimerLine", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockTimer("0", "5", "30", "12")
    mockArtworkGridContext(false)
  })

  const { renderWithRelay } = setupTestWrapperTL<BidTimerLineTestQuery>({
    Component: props => {
      if (props.artwork) {
        return <BidTimerLine {...(props as any)} />
      }
      return null
    },
    query: graphql`
      query BidTimerLineTestQuery @relay_test_operation {
        artwork(id: "artwork-id") {
          ...BidTimerLine_artwork
        }
      }
    `,
  })

  it("renders registration message when registration is still open and it is not a lot detail card", () => {
    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: false,
            registrationEndsAt: DateTime.local().plus({ days: 1 }).toString(),
          },
        },
      }),
    })

    const message = screen.getByText(/Register by/i)
    expect(message).toBeInTheDocument()
  })

  it("does not render registration message when it is a lot detail card", () => {
    mockUseArtworkGridContext.mockReturnValue({ isAuctionArtwork: true })

    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: false,
            registrationEndsAt: DateTime.local().plus({ days: 1 }).toString(),
          },
        },
      }),
    })
    const message = screen.queryByText(/Register by/i)

    expect(message).not.toBeInTheDocument()
  })

  it("renders time left to bid when bidding is still open", () => {
    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: false,
            registrationEndsAt: null,
          },
        },
      }),
    })

    mockTimer("0", "5", "30", "25")

    const timeLeft = screen.getByText(/5h left to bid/i)
    expect(timeLeft).toBeInTheDocument()
  })

  it("renders extended bidding time when online bidding has been extended and is a lot detail card", () => {
    mockTimer("0", "0", "30", "56")
    mockUseArtworkGridContext.mockReturnValue({ isAuctionArtwork: true })

    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: true,
            registrationEndsAt: null,
          },
        },
      }),
    })

    const extendedTime = screen.getByText(/Extended, 30m left/i)
    expect(extendedTime).toBeInTheDocument()
  })

  it("renders bidding time without 'Extended' text when online bidding has been extended and is not a lot detail card", () => {
    mockTimer("0", "0", "30", "1")

    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: true,
            registrationEndsAt: null,
          },
        },
      }),
    })

    const extendedTime = screen.getByText(/30m left to bid/i)
    expect(extendedTime).toBeInTheDocument()
  })

  it("renders extended bidding time less than 1 minute", () => {
    mockTimer("0", "0", "0", "56")
    mockUseArtworkGridContext.mockReturnValue({ isAuctionArtwork: true })

    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: true,
            registrationEndsAt: null,
          },
        },
      }),
    })

    const extendedTime = screen.getByText(/Extended, 56s left/i)
    expect(extendedTime).toBeInTheDocument()
  })

  it("renders time left to bid when it's less than 1 minute", () => {
    mockTimer("0", "0", "0", "7")

    renderWithRelay({
      Artwork: () => ({
        collectorSignals: {
          auction: {
            lotClosesAt: DateTime.local().plus({ days: 1 }).toString(),
            onlineBiddingExtended: true,
            registrationEndsAt: null,
          },
        },
      }),
    })

    const extendedTime = screen.getByText(/^7s left to bid/i)
    expect(extendedTime).toBeInTheDocument()
  })
})
