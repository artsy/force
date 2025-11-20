import type { ClickableProps } from "@artsy/palette"
import { ContextualMenuItemButton } from "Components/ContextualMenu"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import { forwardRef } from "react"
import { markAllNotificationsAsRead } from "./Mutations/markAllNotificationsAsRead"

const logger = createLogger("MarkAllAsReadPanel")

export interface MarkAllAsReadPanelProps extends ClickableProps {
  unreadCounts: number
}

export const MarkAllAsReadPanel = forwardRef<
  HTMLButtonElement,
  MarkAllAsReadPanelProps
>(({ unreadCounts, ...rest }, ref) => {
  const { relayEnvironment } = useSystemContext()

  const hasUnreadNotifications = unreadCounts > 0

  const markAllAsRead = async () => {
    if (!relayEnvironment) return

    try {
      const response = await markAllNotificationsAsRead(relayEnvironment)
      const errorMessage =
        response.markAllNotificationsAsRead?.responseOrError?.mutationError
          ?.message

      if (errorMessage) {
        throw new Error(errorMessage)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <ContextualMenuItemButton
      ref={ref}
      onClick={markAllAsRead}
      disabled={!hasUnreadNotifications}
      color={!hasUnreadNotifications ? "mono60" : "mono100"}
      {...rest}
    >
      Mark all as read
    </ContextualMenuItemButton>
  )
})
