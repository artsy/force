import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import CloseIcon from "@artsy/icons/CloseIcon"
import { NotificationsPills } from "Components/Notifications/NotificationsPills"
import { NotificationListMode } from "Components/Notifications/NotificationsWrapper"
import { NotificationsContextualMenu } from "Components/Notifications/NotificationsContextualMenu"
import { MarkAllAsReadPanelProps } from "Components/Notifications/MarkAllAsReadPanel"

export interface NotificationsHeaderProps extends MarkAllAsReadPanelProps {
  mode: NotificationListMode
  onHide?: () => void
}

export const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  mode,
  onHide,
  unreadCounts,
}) => {
  return (
    <Box backgroundColor="white100" width="100%" px={2} pt={2} pb={1}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex justifyContent="flex-start">
          <Text variant="lg-display">Activity</Text>
        </Flex>
        <Flex justifyContent="flex-end" gap={4} alignItems="center">
          <NotificationsContextualMenu
            unreadCounts={unreadCounts}
            onHide={onHide}
          />
          {mode === "dropdown" && (
            <Clickable as="a">
              <CloseIcon display="block" />
            </Clickable>
          )}
        </Flex>
      </Flex>

      <Spacer y={2} />

      <Flex flexDirection="row">
        <NotificationsPills />
      </Flex>
    </Box>
  )
}
