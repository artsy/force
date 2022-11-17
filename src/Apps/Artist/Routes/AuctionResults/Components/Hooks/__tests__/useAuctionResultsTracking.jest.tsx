import { OwnerType } from "@artsy/cohesion"
import { renderHook } from "@testing-library/react-hooks"
import { useTracking } from "react-tracking"
import { useAuctionResultsTracking } from "Apps/Artist/Routes/AuctionResults/Components/Hooks/useAuctionResultsTracking"

jest.mock("react-tracking")

describe("useAuctionResultsTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  const setupHook = () => {
    const { result } = renderHook(() => useAuctionResultsTracking())

    if (result.error) {
      throw result.error
    }

    const tracking = result.current
    return tracking
  }

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent: trackingSpy }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("#trackClickedAuctionResultItem", () => {
    it("tracks without specifying owner type", () => {
      setupHook().trackClickedAuctionResultItem(false)

      expect(trackingSpy).toBeCalledWith({
        action: "clickedAuctionResultItem",
        context_module: "auctionResults",
        context_page_owner_type: "artistAuctionResults",
        expanded: false,
      })
    })

    it("track with specific owner type", () => {
      setupHook().trackClickedAuctionResultItem(
        true,
        OwnerType.myCollectionInsights
      )

      expect(trackingSpy).toBeCalledWith({
        action: "clickedAuctionResultItem",
        context_module: "auctionResults",
        context_page_owner_type: "myCollectionInsights",
        expanded: true,
      })
    })
  })
})
