import React from "react"
import { screen } from "@testing-library/react"
import { BidTimerLineFragmentContainer } from "Components/Artwork/Details/BidTimerLine"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useTimer } from "Utils/Hooks/useTimer"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { BidTimerLineTestQuery } from "__generated__/BidTimerLineTestQuery.graphql"

jest.mock("Components/ArtworkGrid/ArtworkGridContext")
jest.mock("Utils/Hooks/useTimer")
jest.unmock("react-relay")

const mockUseArtworkGridContext = useArtworkGridContext as jest.Mock
const mockUseTimer = useTimer as jest.Mock

const mockTimer = (days: string, hours: string, minutes: string) => {
  mockUseTimer.mockReturnValue({
    time: { days, hours, minutes },
  })
}

const mockArtworkGridContext = (isAuctionArtwork: boolean) => {
  mockUseArtworkGridContext.mockReturnValue({ isAuctionArtwork })
}

describe("BidTimerLine", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockTimer("0", "5", "30")
    mockArtworkGridContext(false)
  })

  const { renderWithRelay } = setupTestWrapperTL<BidTimerLineTestQuery>({
    Component: props => {
      if (props.artwork) {
        return <BidTimerLineFragmentContainer {...(props as any)} />
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

  it("renders registration message when registration is still open and it is not an auction artwork", () => {
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

    mockTimer("0", "5", "30")

    const timeLeft = screen.getByText(/5h left to bid/i)
    expect(timeLeft).toBeInTheDocument()
  })

  it("renders extended bidding time when online bidding has been extended", () => {
    mockTimer("0", "0", "30")

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

    const extendedTime = screen.getByText(/Extended, 30m left to bid/i)
    expect(extendedTime).toBeInTheDocument()
  })
})
