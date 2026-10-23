import {
  artAssistantErrorKindForStopReason,
  artAssistantErrorKindForStreamError,
} from "Apps/ArtAssistant/utils/artAssistantErrors"
import { MetaphysicsSubscriptionError } from "System/Relay/metaphysicsSubscriptionError"

describe("Art Assistant error categories", () => {
  it.each([
    ["rate_limited", "rate_limited"],
    ["max_iterations", "timeout"],
    ["aborted", "timeout"],
    ["error", "generic"],
    ["stop", "unclear"],
    ["new_reason", "unclear"],
  ])("maps %s to %s like Eigen", (reason, kind) => {
    expect(artAssistantErrorKindForStopReason(reason)).toBe(kind)
  })
  it.each([
    "Conversation history is too long (max 40 messages)",
    "Conversation input is too large (max 100000 bytes)",
  ])("recognizes the backend conversation limit: %s", message => {
    expect(
      artAssistantErrorKindForStreamError(
        new MetaphysicsSubscriptionError({ graphQLErrors: [message] }),
      ),
    ).toBe("conversation_limit")
  })
  it("does not expose unknown backend failures as user-facing text", () => {
    expect(
      artAssistantErrorKindForStreamError(
        new Error("private upstream response"),
      ),
    ).toBe("generic")
  })
})
