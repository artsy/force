import { renderHook } from "@testing-library/react-hooks"
import { useConversationsTracking } from "Apps/Conversations/hooks/useConversationsTracking"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("useConversationsTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  const setupHook = () => {
    const { result } = renderHook(() => useConversationsTracking())

    if (result.error) {
      throw result.error
    }

    return result.current
  }

  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent: trackingSpy }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("#trackPartnerOfferCTAViewed", () => {
    it("tracks the partner offer in conversation viewed event", () => {
      setupHook().trackPartnerOfferCTAViewed("conversation-id")

      expect(trackingSpy).toHaveBeenCalledWith({
        action: "partnerOfferInConversationViewed",
        context_owner_id: "conversation-id",
        context_owner_type: "conversation",
      })
    })
  })
})
