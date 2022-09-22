import { Clickable, Flex, Text } from "@artsy/palette"
import { useSystemContext } from "System"
import createLogger from "Utils/logger"
import { markAllNotificationsAsRead } from "./Mutations/markAllNotificationsAsRead"

export const MARK_ALL_AS_READ_PANEL_HEIGHT = 40

const logger = createLogger("MarkAllAsReadPanel")

export const MarkAllAsReadPanel = () => {
  const { relayEnvironment } = useSystemContext()

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
      bg="white100"
    >
      <Clickable onClick={markAllAsRead}>
        <Text variant="xs" color="black60">
          Mark all as read
        </Text>
      </Clickable>
    </Flex>
  )
}
