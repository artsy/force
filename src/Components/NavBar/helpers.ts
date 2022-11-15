import cookie from "cookies-js"

export interface Counts {
  conversations?: number
  notifications?: number
}

export const getNotificationCount = () => cookie.get("notification-count") || 0

export const updateNotificationCache = (notificationCount?: number) => {
  if (typeof notificationCount === "number") {
    notificationCount === 0
      ? cookie.expire("notification-count")
      : cookie.set("notification-count", notificationCount)
  }
}

export const getConversationCount = () => cookie.get("conversation-count") || 0

export const updateConversationCache = (conversationCount?: number) => {
  if (typeof conversationCount === "number") {
    conversationCount === 0
      ? cookie.expire("conversation-count")
      : cookie.set("conversation-count", conversationCount)
  }
}

export const checkAndSyncIndicatorsCount = (counts: Counts) => {
  const { conversations, notifications } = counts
  const conversationCount = conversations ?? getConversationCount()
  const notificationsCount = notifications ?? getNotificationCount()
  const hasConversations = conversationCount > 0
  const hasNotifications = notificationsCount > 0

  updateConversationCache(conversations)
  updateNotificationCache(notifications)

  return {
    hasConversations,
    hasNotifications,
    counts: {
      conversations: conversationCount,
      notifications: notificationsCount,
    },
  }
}

export type IndicatorsCountState = ReturnType<
  typeof checkAndSyncIndicatorsCount
>
