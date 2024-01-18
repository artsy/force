import {
  Box,
  Clickable,
  DROP_SHADOW,
  Flex,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import CloseIcon from "@artsy/icons/CloseIcon"
import MoreIcon from "@artsy/icons/MoreIcon"
import { NotificationsPills } from "Components/Notifications/NotificationsPills"
import { NotificationListMode } from "Components/Notifications/NotificationsWrapper"

export interface NotificationsHeaderProps {
  mode: NotificationListMode
}

export const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  mode,
}) => {
  return (
    <Box
      backgroundColor="white100"
      width="100%"
      p="20px 20px 0"
      style={{ boxShadow: mode === "dropdown" ? DROP_SHADOW : "none" }}
    >
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex justifyContent="flex-start">
          <Text variant="lg-display">Activity</Text>
        </Flex>
        <Flex justifyContent="flex-end" gap={4}>
          <MoreIcon />
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
      <Spacer y={1} />
      <Separator />
    </Box>
  )
}
