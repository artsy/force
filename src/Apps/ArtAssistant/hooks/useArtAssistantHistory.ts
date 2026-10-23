import type { useArtAssistantConversation } from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import {
  conversationTitle,
  readArtAssistantConversations,
  toStoredMessages,
  writeArtAssistantConversations,
  MAX_STORED_CONVERSATIONS,
  ART_ASSISTANT_HISTORY_CLEARED,
  artAssistantStorageKey,
  type StoredArtAssistantConversation,
} from "Apps/ArtAssistant/utils/artAssistantStorage"
import { useCallback, useEffect, useRef, useState } from "react"

interface ArtAssistantHistoryOptions
  extends Pick<
    ReturnType<typeof useArtAssistantConversation>,
    "messages" | "conversationID" | "loadConversation" | "startNewConversation"
  > {
  userID: string
}

export const useArtAssistantHistory = ({
  userID,
  messages,
  conversationID,
  loadConversation,
  startNewConversation,
}: ArtAssistantHistoryOptions) => {
  const [conversations, setConversations] = useState<
    StoredArtAssistantConversation[]
  >([])
  const hydratedUser = useRef<string | null>(null)
  const shouldSkipPersist = useRef(true)

  useEffect(() => {
    const stored = readArtAssistantConversations(userID)
    hydratedUser.current = userID
    shouldSkipPersist.current = true
    setConversations(stored)
    if (stored[0]) loadConversation(stored[0])
    else startNewConversation()
  }, [userID, loadConversation, startNewConversation])

  useEffect(() => {
    const clear = () => {
      // Disable writes before aborting a turn, so late updates cannot restore a logged-out chat.
      hydratedUser.current = null
      setConversations([])
      startNewConversation()
    }
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        (event.key === artAssistantStorageKey(userID) &&
          event.newValue === null)
      )
        clear()
    }
    window.addEventListener(ART_ASSISTANT_HISTORY_CLEARED, clear)
    window.addEventListener("storage", handleStorage)
    return () => {
      window.removeEventListener(ART_ASSISTANT_HISTORY_CLEARED, clear)
      window.removeEventListener("storage", handleStorage)
    }
  }, [userID, startNewConversation])

  useEffect(() => {
    if (shouldSkipPersist.current) {
      shouldSkipPersist.current = false
      return
    }
    if (hydratedUser.current !== userID || !messages.length) return
    const prompts = messages.filter(message => message.role === "user")
    const firstPrompt = prompts[0]
    const lastPrompt = prompts[prompts.length - 1]
    if (!firstPrompt || !lastPrompt) return
    setConversations(previous => {
      const existing = previous.find(item => item.id === conversationID)
      const conversation: StoredArtAssistantConversation = {
        id: conversationID,
        title: conversationTitle(firstPrompt.text),
        // Loading a chat or receiving agent events must not change its recency.
        updatedAt: existing?.messages.some(
          message => message.role === "user" && message.id === lastPrompt.id,
        )
          ? existing.updatedAt
          : new Date().toISOString(),
        messages: toStoredMessages(messages),
      }
      const next = (
        existing
          ? previous.map(item =>
              item.id === conversationID ? conversation : item,
            )
          : [conversation, ...previous]
      )
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, MAX_STORED_CONVERSATIONS)
      writeArtAssistantConversations({ userID, conversations: next })
      return next
    })
  }, [userID, messages, conversationID])

  const selectConversation = useCallback(
    (id: string) => {
      const conversation = conversations.find(item => item.id === id)
      if (conversation) loadConversation(conversation)
    },
    [conversations, loadConversation],
  )

  const removeConversation = useCallback(
    (id: string) => {
      setConversations(previous => {
        const next = previous.filter(item => item.id !== id)
        writeArtAssistantConversations({ userID, conversations: next })
        return next
      })
      if (id === conversationID) startNewConversation()
    },
    [userID, conversationID, startNewConversation],
  )

  return { conversations, selectConversation, removeConversation }
}
