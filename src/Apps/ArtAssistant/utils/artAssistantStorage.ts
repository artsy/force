import type {
  ArtAssistantImage,
  ArtAssistantMessage,
} from "Apps/ArtAssistant/types"
import { ART_ASSISTANT_ERRORS } from "Apps/ArtAssistant/utils/artAssistantErrors"

export interface StoredArtAssistantConversation {
  id: string
  title: string
  updatedAt: string
  messages: ArtAssistantMessage[]
}

export const MAX_STORED_CONVERSATIONS = 20
// Keeps the 20-conversation localStorage budget predictable.
export const MAX_STORED_THUMBNAIL_LENGTH = 40_000
export const ART_ASSISTANT_HISTORY_CLEARED =
  "artsy:art-assistant-history-cleared"
const STORAGE_PREFIX = "artsy.artAssistant.v1."
export const artAssistantStorageKey = (userID: string): string =>
  `${STORAGE_PREFIX}${userID}`

export const clearArtAssistantConversations = (): void => {
  if (typeof window === "undefined") return
  try {
    Array.from({ length: window.localStorage.length }, (_, index) =>
      window.localStorage.key(index),
    ).forEach(key => {
      if (key?.startsWith(STORAGE_PREFIX)) window.localStorage.removeItem(key)
    })
  } catch {
    // Logout must still work when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(ART_ASSISTANT_HISTORY_CLEARED))
}

const isSection = (section: unknown): boolean => {
  if (!section || typeof section !== "object") return false
  const value = section as Record<string, unknown>
  return (
    (value.type === "artists" || value.type === "artworks") &&
    Array.isArray(value.ids) &&
    value.ids.every(id => typeof id === "string")
  )
}

const isImage = (image: unknown): image is ArtAssistantImage => {
  if (!image || typeof image !== "object") return false
  const value = image as Record<string, unknown>
  return (
    typeof value.s3Key === "string" &&
    typeof value.s3Bucket === "string" &&
    (value.thumbnailURL === undefined || typeof value.thumbnailURL === "string")
  )
}

const toStoredImage = (image: ArtAssistantImage): ArtAssistantImage => {
  const { s3Key, s3Bucket, thumbnailURL } = image
  return thumbnailURL?.startsWith("data:image/") &&
    thumbnailURL.length <= MAX_STORED_THUMBNAIL_LENGTH
    ? { s3Key, s3Bucket, thumbnailURL }
    : { s3Key, s3Bucket }
}

const isMessage = (message: unknown): message is ArtAssistantMessage => {
  if (!message || typeof message !== "object") return false
  const value = message as Record<string, unknown>
  if (typeof value.id !== "string" || typeof value.text !== "string")
    return false
  if (value.role === "user")
    return value.image === undefined || isImage(value.image)
  return (
    value.role === "assistant" &&
    (value.error === undefined ||
      (typeof value.error === "string" &&
        Object.prototype.hasOwnProperty.call(
          ART_ASSISTANT_ERRORS,
          value.error,
        ))) &&
    (value.phase === "complete" || value.phase === "error") &&
    (value.sections === undefined ||
      (Array.isArray(value.sections) && value.sections.every(isSection))) &&
    (value.suggestedReplies === undefined ||
      (Array.isArray(value.suggestedReplies) &&
        value.suggestedReplies.every(reply => typeof reply === "string")))
  )
}

// Whitelist persisted fields: activity and debug events belong only to the live turn.
export const toStoredMessages = (
  messages: ArtAssistantMessage[],
): ArtAssistantMessage[] => {
  return messages.map(message => {
    if (message.role === "user")
      return {
        id: message.id,
        role: "user",
        text: message.text,
        ...(message.image ? { image: toStoredImage(message.image) } : {}),
      }
    if (message.phase !== "complete") {
      const error = message.error ?? "generic"
      return {
        id: message.id,
        role: "assistant",
        phase: "error",
        text: ART_ASSISTANT_ERRORS[error].message,
        error,
      }
    }
    return {
      id: message.id,
      role: "assistant",
      phase: "complete",
      text: message.text,
      sections: message.sections,
      suggestedReplies: message.suggestedReplies,
    }
  })
}

export const readArtAssistantConversations = (
  userID: string,
): StoredArtAssistantConversation[] => {
  if (typeof window === "undefined") return []
  try {
    const value: unknown = JSON.parse(
      window.localStorage.getItem(artAssistantStorageKey(userID)) ?? "[]",
    )
    if (!Array.isArray(value)) return []
    return value
      .flatMap(entry => {
        if (
          !entry ||
          typeof entry !== "object" ||
          typeof entry.id !== "string" ||
          typeof entry.title !== "string" ||
          typeof entry.updatedAt !== "string" ||
          !Number.isFinite(Date.parse(entry.updatedAt)) ||
          !Array.isArray(entry.messages) ||
          !entry.messages.every(isMessage)
        )
          return []
        return [
          {
            id: entry.id,
            title: entry.title,
            updatedAt: entry.updatedAt,
            messages: toStoredMessages(entry.messages),
          },
        ]
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, MAX_STORED_CONVERSATIONS)
  } catch {
    return []
  }
}

export const writeArtAssistantConversations = ({
  userID,
  conversations,
}: {
  userID: string
  conversations: StoredArtAssistantConversation[]
}): void => {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(
      artAssistantStorageKey(userID),
      JSON.stringify(
        conversations.slice(0, MAX_STORED_CONVERSATIONS).map(conversation => ({
          ...conversation,
          messages: toStoredMessages(conversation.messages),
        })),
      ),
    )
  } catch {
    // Storage may be disabled or full. The in-memory conversation remains usable.
  }
}

export const conversationTitle = (prompt: string): string => {
  const text = prompt.replace(/\s+/g, " ").trim()
  if (!text) return "Image search"
  return text.length > 80 ? `${text.slice(0, 80)}…` : text
}
