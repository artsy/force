import type { useArtAssistantConversation } from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import {
  conversationTitle,
  readArtAssistantConversations,
  toStoredMessages,
  writeArtAssistantConversations,
  MAX_STORED_CONVERSATIONS,
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
    if (shouldSkipPersist.current) {
      shouldSkipPersist.current = false
      return
    }
    if (hydratedUser.current !== userID || !messages.length) return
    const firstPrompt = messages.find(message => message.role === "user")
    if (!firstPrompt) return
    const conversation: StoredArtAssistantConversation = {
      id: conversationID,
      title: conversationTitle(firstPrompt.text),
      updatedAt: new Date().toISOString(),
      messages: toStoredMessages(messages),
    }
    setConversations(previous => {
      const next = [
        conversation,
        ...previous.filter(item => item.id !== conversationID),
      ].slice(0, MAX_STORED_CONVERSATIONS)
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
