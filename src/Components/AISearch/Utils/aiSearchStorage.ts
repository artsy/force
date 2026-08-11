import type { AISearchArtworkFilters } from "Components/AISearch/Utils/aiSearchTypes"

/**
 * Conversations are persisted client-side: `Subscription.aiAgentTurn` is
 * stateless by design and replays whatever history the client hands it, so
 * localStorage is the only record that a past conversation ever happened.
 */

const AI_SEARCH_CONVERSATIONS_KEY = "artsy.aiSearchConversations"

export const MAX_STORED_CONVERSATIONS = 20
export const MAX_CONVERSATION_TITLE_LENGTH = 80

export interface StoredAISearchMessage {
  id: string
  role: "USER" | "ASSISTANT"
  text: string
  statuses?: string[]
  artworkIDs?: string[]
  artistIDs?: string[]
  artworkFilters?: AISearchArtworkFilters | null
}

export interface StoredAISearchConversation {
  /** The `conversationID` sent to metaphysics for every turn */
  id: string
  title: string
  /** ISO timestamp of the last turn; the sidebar sorts and formats from this */
  updatedAt: string
  messages: StoredAISearchMessage[]
}

const isStoredConversation = (
  entry: unknown,
): entry is StoredAISearchConversation => {
  if (typeof entry !== "object" || entry === null) {
    return false
  }

  const candidate = entry as Partial<StoredAISearchConversation>

  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.updatedAt === "string" &&
    Array.isArray(candidate.messages)
  )
}

export const readAISearchConversations = (): StoredAISearchConversation[] => {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const raw = window.localStorage.getItem(AI_SEARCH_CONVERSATIONS_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isStoredConversation)
  } catch {
    // Corrupt or unreadable store: behave as if there is no history rather
    // than throwing into render.
    return []
  }
}

const write = (conversations: StoredAISearchConversation[]) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(
      AI_SEARCH_CONVERSATIONS_KEY,
      JSON.stringify(conversations.slice(0, MAX_STORED_CONVERSATIONS)),
    )
  } catch {
    // Quota exceeded or storage disabled — a prototype can lose history.
  }
}

/** Upserts a conversation and moves it to the front of the list */
export const writeAISearchConversation = (
  conversation: StoredAISearchConversation,
): StoredAISearchConversation[] => {
  const others = readAISearchConversations().filter(existing => {
    return existing.id !== conversation.id
  })

  const next = [conversation, ...others].slice(0, MAX_STORED_CONVERSATIONS)

  write(next)

  return next
}

export const deleteAISearchConversation = (
  id: string,
): StoredAISearchConversation[] => {
  const next = readAISearchConversations().filter(conversation => {
    return conversation.id !== id
  })

  write(next)

  return next
}

export const buildConversationTitle = (firstUserMessage: string): string => {
  const collapsed = firstUserMessage.replace(/\s+/g, " ").trim()

  if (collapsed.length <= MAX_CONVERSATION_TITLE_LENGTH) {
    return collapsed
  }

  return `${collapsed.slice(0, MAX_CONVERSATION_TITLE_LENGTH).trimEnd()}…`
}
