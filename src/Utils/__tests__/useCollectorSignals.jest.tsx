import { renderHook } from "@testing-library/react-hooks"
import { useCollectorSignals } from "Utils/Hooks/useCollectorSignals"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag" // Adjust the import path

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))
const mockUseFeatureFlag = useFeatureFlag as jest.Mock

describe("useCollectorSignals", () => {
  beforeEach(() => {
    mockUseFeatureFlag.mockReturnValue(true)
  })
  it("should process signals for multiple artworks", () => {
    const artworks = [
      { internalID: "acquireable-partner-offer", isAcquireable: true },
      { internalID: "not-acquireable", isAcquireable: false },
      { internalID: "no-partner-offer", isAcquireable: true },
    ]
    const partnerOffers = [
      { artworkId: "acquireable-partner-offer", endAt: "2042-01-01" },
      { artworkId: "not-acquireable", endAt: "2042-01-01" },
    ]

    const { result } = renderHook(() =>
      useCollectorSignals({ artworks, partnerOffers })
    )

    expect(result.current["acquireable-partner-offer"]).toEqual({
      partnerOffer: {
        artworkId: "acquireable-partner-offer",
        endAt: "2042-01-01",
      },
    })
    expect(result.current["not-acquireable"]).toEqual({ partnerOffer: null })
    expect(result.current["no-partner-offer"]).toEqual({ partnerOffer: null })
  })

  it("should process signals for a single artwork", () => {
    const artwork = {
      internalID: "acquireable-partner-offer",
      isAcquireable: true,
    }
    const partnerOffers = [
      { artworkId: "acquireable-partner-offer", endAt: "2042-01-01" },
      { artworkId: "not-acquireable", endAt: "2042-01-01" },
    ]

    const { result } = renderHook(() =>
      useCollectorSignals({ artwork, partnerOffers })
    )

    expect(result.current).toEqual({
      partnerOffer: {
        artworkId: "acquireable-partner-offer",
        endAt: "2042-01-01",
      },
    })
  })
})
