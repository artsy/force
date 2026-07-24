import { renderHook } from "@testing-library/react"
import { useOrder2OfferCountdown } from "Apps/Order2/Hooks/useOrder2OfferCountdown"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import { DateTime } from "luxon"

jest.mock("Utils/Hooks/useCountdownTimer", () => ({
  useCountdownTimer: jest.fn(() => ({
    remainingTime: "2d 3h",
    hasValidRemainingTime: true,
  })),
}))

const mockUseCountdownTimer = useCountdownTimer as jest.Mock

const END_TIME = "2025-12-31T23:59:59Z"

describe("useOrder2OfferCountdown", () => {
  beforeEach(() => {
    mockUseCountdownTimer.mockClear()
  })

  it("derives the start time as endTime − 3 days for partner offers", () => {
    renderHook(() =>
      useOrder2OfferCountdown({ endTime: END_TIME, isPartnerOffer: true }),
    )

    expect(mockUseCountdownTimer).toHaveBeenCalledWith({
      startTime: DateTime.fromISO(END_TIME).minus({ days: 3 }).toString(),
      endTime: END_TIME,
      imminentTime: 1,
    })
  })

  it("uses the end time as the start time for non-partner offers", () => {
    renderHook(() =>
      useOrder2OfferCountdown({ endTime: END_TIME, isPartnerOffer: false }),
    )

    expect(mockUseCountdownTimer).toHaveBeenCalledWith({
      startTime: END_TIME,
      endTime: END_TIME,
      imminentTime: 1,
    })
  })

  it("passes an empty end time through without deriving a start", () => {
    renderHook(() =>
      useOrder2OfferCountdown({ endTime: "", isPartnerOffer: true }),
    )

    expect(mockUseCountdownTimer).toHaveBeenCalledWith({
      startTime: "",
      endTime: "",
      imminentTime: 1,
    })
  })

  it("returns the underlying countdown timer result", () => {
    const { result } = renderHook(() =>
      useOrder2OfferCountdown({ endTime: END_TIME, isPartnerOffer: true }),
    )

    expect(result.current).toEqual({
      remainingTime: "2d 3h",
      hasValidRemainingTime: true,
    })
  })
})
