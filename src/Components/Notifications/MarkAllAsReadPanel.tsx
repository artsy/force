import { Clickable, Flex, Text } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { markAllNotificationsAsRead } from "./Mutations/markAllNotificationsAsRead"

export const MARK_ALL_AS_READ_PANEL_HEIGHT = 40

const logger = createLogger("MarkAllAsReadPanel")

export interface MarkAllAsReadPanelProps {
  unreadCounts: number
}

export const MarkAllAsReadPanel: React.FC<MarkAllAsReadPanelProps> = ({
  unreadCounts,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { t } = useTranslation()
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
      <Text variant="xs" color={hasUnreadNotifications ? "brand" : "black60"}>
        {hasUnreadNotifications
          ? t("activityPanel.newNotifications")
          : t("activityPanel.noNewNotifications")}
      </Text>
      <Clickable onClick={markAllAsRead} disabled={!hasUnreadNotifications}>
        <Text variant="xs" color="black60">
          {t`activityPanel.markAllAsRead`}
        </Text>
      </Clickable>
    </Flex>
  )
}
