import cookie from "cookies-js"
import { isServer } from "lib/isServer"

export const getNotificationCount = () =>
  (!isServer && cookie.get("notification-count")) || 0

export const updateNotificationCache = (notificationCount?: number) => {
  if (typeof notificationCount === "number") {
    notificationCount === 0
      ? cookie.expire("notification-count")
      : cookie.set("notification-count", notificationCount)
  }
}

export const getConversationCount = () =>
  (!isServer && cookie.get("conversation-count")) || 0

export const updateConversationCache = (conversationCount?: number) => {
  if (typeof conversationCount === "number") {
    conversationCount === 0
      ? cookie.expire("conversation-count")
      : cookie.set("conversation-count", conversationCount)
  }
}
