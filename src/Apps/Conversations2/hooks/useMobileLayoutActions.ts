import { useRouter } from "System/Router/useRouter"
import { omit } from "lodash"
import { useEffect, useState, useCallback } from "react"

/**
 * Controls which column we are currently display and exposes methods to change
 * in between these columns.
 */
export const useMobileLayoutActions = () => {
  const { match, router } = useRouter()

  const {
    location: { query },
    params,
  } = match

  const [currentColumn, setCurrentColumn] = useState<
    "sidebar" | "conversation" | "detail"
  >("sidebar")

  useEffect(() => {
    if (query.showAllConversations) {
      setCurrentColumn("sidebar")
    } else {
      setCurrentColumn("conversation")
    }
  }, [query.showAllConversations])

  const goToSidebar = useCallback(() => {
    setCurrentColumn("sidebar")

    router.push({
      pathname: `/user/conversations2/${params.conversationId}`,
      query: {
        showAllConversations: true,
        ...omit(query, ["conversationId"]),
      },
    })
  }, [router, query, params])

  const goToDetails = useCallback(() => {
    setCurrentColumn("detail")
  }, [])

  const goToConversation = useCallback(() => {
    setCurrentColumn("conversation")
  }, [])

  return {
    currentColumn,
    goToSidebar,
    goToDetails,
    goToConversation,
  }
}
