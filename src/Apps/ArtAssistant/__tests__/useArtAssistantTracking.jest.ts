import { renderHook } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { useArtAssistantTracking } from "Apps/ArtAssistant/hooks/useArtAssistantTracking"
import { useTracking } from "react-tracking"

describe("Art Assistant analytics", () => {
  const trackEvent = jest.fn()
  beforeEach(() => {
    trackEvent.mockClear()
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent })
  })

  it.each([false, true])(
    "gates message, response and suggested reply content (%s)",
    isEnabled => {
      ;(useFlag as jest.Mock).mockReturnValue(isEnabled)
      const { result } = renderHook(useArtAssistantTracking)
      result.current.trackMessageSent({
        conversationID: "chat",
        message: "Private prompt",
        messageID: "u",
        messageIndex: 0,
        type: "typed",
      })
      result.current.trackResponseReceived({
        conversationID: "chat",
        durationMs: 10,
        itemIDs: ["artist"],
        itemType: "artist",
        messageID: "a",
        promptMessageID: "u",
        response: "Private answer",
        stopReason: "end_turn",
        toolCallCount: 1,
      })
      result.current.trackSuggestedReplyTapped({
        conversationID: "chat",
        position: 0,
        reply: "Private reply",
        responseMessageID: "a",
      })
      const events = trackEvent.mock.calls.map(([event]) => event)
      expect(events[0]).toMatchObject({
        action: "sentArtAssistantMessage",
        conversation_id: "chat",
        message_id: "u",
        character_count: 14,
      })
      expect(events[1]).toMatchObject({
        action: "receivedArtAssistantResponse",
        prompt_message_id: "u",
        item_ids: ["artist"],
        item_type: "artist",
      })
      if (isEnabled) {
        expect(events[0].message).toBe("Private prompt")
        expect(events[1].response).toBe("Private answer")
        expect(events[2].reply).toBe("Private reply")
      } else {
        expect(events[0]).not.toHaveProperty("message")
        expect(events[1]).not.toHaveProperty("response")
        expect(events[2]).not.toHaveProperty("reply")
      }
      expect(useFlag).toHaveBeenCalledWith(
        "onyx_send-art-assistant-messages-to-segment",
      )
    },
  )

  it("tracks failure metadata without message content", () => {
    const { result } = renderHook(useArtAssistantTracking)
    result.current.trackTurnFailed({
      conversationID: "chat",
      durationMs: 100,
      errorStatus: 429,
      messageID: "a",
      promptMessageID: "u",
      outcome: "stream_error",
    })
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "artAssistantTurnFailed",
        error_status: 429,
        outcome: "stream_error",
        duration_ms: 100,
      }),
    )
  })
})
