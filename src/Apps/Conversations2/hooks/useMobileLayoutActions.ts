import { DEFAULT_CONVERSATION_ID } from "Apps/Conversations2/Conversations2App"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "System/Router/useRouter"

// Controls which column we are currently display
// and exposes methods to change in between these columns
export const useMobileLayoutActions = () => {
  const { match } = useRouter()
  const [currentColumn, setCurrentColumn] = useState<
    "sidebar" | "conversation" | "detail"
  >("sidebar")

  useEffect(() => {
    if (match.params.conversationId) {
      const view =
        match.params.conversationId !== DEFAULT_CONVERSATION_ID
          ? "conversation"
          : "sidebar"
      setCurrentColumn(view)
    }
  }, [match.params.conversationId])

  const goToSidebar = useCallback(() => {
    setCurrentColumn("sidebar")
  }, [])

  const goToDetails = useCallback(() => {
    setCurrentColumn("detail")
  }, [])

  const goToConversation = useCallback(() => {
    setCurrentColumn("conversation")
  }, [])

  return { currentColumn, goToSidebar, goToDetails, goToConversation }
}
