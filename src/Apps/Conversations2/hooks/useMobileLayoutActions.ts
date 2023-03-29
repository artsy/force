import { useRouter } from "next/router"
import { DEFAULT_CONVERSATION_ID } from "pages/conversations/index.page"
import { useEffect, useState, useCallback } from "react"

// Controls which column we are currently display
// and exposes methods to change in between these columns
export const useMobileLayoutActions = () => {
  const { query, push } = useRouter()
  const [currentColumn, setCurrentColumn] = useState<
    "sidebar" | "conversation" | "detail"
  >("sidebar")

  useEffect(() => {
    if (query.conversationId) {
      const view =
        query.conversationId !== DEFAULT_CONVERSATION_ID
          ? "conversation"
          : "sidebar"
      setCurrentColumn(view)
    }
  }, [query.conversationId])

  const goToSidebar = useCallback(() => {
    setCurrentColumn("sidebar")
    push(DEFAULT_CONVERSATION_ID)
  }, [push])

  const goToDetails = useCallback(() => {
    setCurrentColumn("detail")
  }, [])

  const goToConversation = useCallback(() => {
    setCurrentColumn("conversation")
  }, [])

  return { currentColumn, goToSidebar, goToDetails, goToConversation }
}
