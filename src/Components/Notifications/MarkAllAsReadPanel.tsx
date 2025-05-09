import { Box, Clickable, Text } from "@artsy/palette"

import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import { markAllNotificationsAsRead } from "./Mutations/markAllNotificationsAsRead"

export const MARK_ALL_AS_READ_PANEL_HEIGHT = 40

const logger = createLogger("MarkAllAsReadPanel")

export interface MarkAllAsReadPanelProps {
  unreadCounts: number
}

export const MarkAllAsReadPanel: React.FC<
  React.PropsWithChildren<MarkAllAsReadPanelProps>
> = ({ unreadCounts }) => {
  const { relayEnvironment } = useSystemContext()

  const hasUnreadNotifications = unreadCounts > 0

  const markAllAsRead = async () => {
    if (!relayEnvironment) {
      return
    }

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
    <Box>
      <Clickable
        onClick={markAllAsRead}
        disabled={!hasUnreadNotifications}
        width="100%"
        p={2}
      >
        <Text
          variant="sm-display"
          color={!hasUnreadNotifications ? "mono60" : "mono100"}
        >
          Mark all as read
        </Text>
      </Clickable>
    </Box>
  )
}
