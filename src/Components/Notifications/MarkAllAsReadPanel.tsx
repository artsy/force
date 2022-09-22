import { Clickable, Flex, Text } from "@artsy/palette"
import { useSystemContext } from "System"
import createLogger from "Utils/logger"
import { markAllNotificationsAsRead } from "./Mutations/markAllNotificationsAsRead"

export const MARK_ALL_AS_READ_PANEL_HEIGHT = 40

const logger = createLogger("MarkAllAsReadPanel")

export interface MarkAllAsReadPanelProps {
  unreadCounts: number
}

export const MarkAllAsReadPanel: React.FC<MarkAllAsReadPanelProps> = props => {
  const { relayEnvironment } = useSystemContext()
  const { unreadCounts } = props

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
      console.log("[debug] error", error)
      logger.error(error)
    }
  }

  return (
    <Flex
      height={MARK_ALL_AS_READ_PANEL_HEIGHT}
      p={2}
      alignItems="center"
      borderBottom="1px solid"
      borderBottomColor="black15"
      flexDirection="row"
      justifyContent="space-between"
      bg="white100"
    >
      <Text variant="xs" color="brand">
        {unreadCounts} New Notifications
      </Text>
      <Clickable onClick={markAllAsRead}>
        <Text variant="xs" color="black60">
          Mark all as read
        </Text>
      </Clickable>
    </Flex>
  )
}
