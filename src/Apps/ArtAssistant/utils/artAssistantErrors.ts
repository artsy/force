import { MetaphysicsSubscriptionError } from "System/Relay/metaphysicsSubscriptionError"

export type ArtAssistantErrorKind =
  | "unclear"
  | "timeout"
  | "conversation_limit"
  | "rate_limited"
  | "generic"
export type ArtAssistantErrorAction = "retry" | "dismiss" | "newChat" | "close"

export const ART_ASSISTANT_ERRORS: Record<
  ArtAssistantErrorKind,
  {
    message: string
    actions: { action: ArtAssistantErrorAction; label: string }[]
  }
> = {
  unclear: {
    message:
      "Sorry, we’re still learning and improving. Would you mind trying a phrase that’s a bit more specific?",
    actions: [],
  },
  timeout: {
    message:
      "This answer was slightly difficult for us to figure out. Would you mind asking us once more?",
    actions: [
      { action: "retry", label: "Try the same ask again" },
      { action: "dismiss", label: "Forget it, I’ll ask something else" },
    ],
  },
  conversation_limit: {
    message:
      "This is as far as this chat session can go. Want to start a new chat with me?",
    actions: [
      { action: "newChat", label: "Yes! Open a new chat window" },
      { action: "close", label: "No, I’m done for now" },
    ],
  },
  rate_limited: {
    message:
      "Unfortunately, this is as far as our chats can go for now. Please come back and chat with me a little later. Thank you for using Artsy’s Art Assistant!",
    actions: [],
  },
  generic: {
    message:
      "Sorry, we’re still improving our experience and can’t help you further. Would you like to:",
    actions: [
      { action: "retry", label: "Try again" },
      { action: "newChat", label: "Start a new chat instead" },
    ],
  },
}

export const artAssistantErrorKindForStopReason = (
  reason: string,
): ArtAssistantErrorKind => {
  switch (reason) {
    case "rate_limited":
      return "rate_limited"
    case "max_iterations":
    case "aborted":
      return "timeout"
    case "error":
      return "generic"
    default:
      return "unclear"
  }
}

export const artAssistantErrorKindForStreamError = (
  error: unknown,
): ArtAssistantErrorKind => {
  return error instanceof MetaphysicsSubscriptionError &&
    error.graphQLErrors?.some(message =>
      /^Conversation (history is too long|input is too large)/.test(message),
    )
    ? "conversation_limit"
    : "generic"
}
