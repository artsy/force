import { Box, Flex, Separator, useTheme } from "@artsy/palette"
import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar/constants"
import { Sticky } from "Components/Sticky"
import { NotificationsListQueryRenderer } from "Components/Notifications/NotificationsList"
import { NotificationsHeader } from "Components/Notifications/NotificationsHeader"
import { MarkAllAsReadPanelProps } from "Components/Notifications/MarkAllAsReadPanel"

const DROPDOWN_HEADER_HEIGHT = 113
const VERTICAL_OFFSET = 10
const DROPDOWN_CONTENT_HEIGHT =
  DROPDOWN_HEADER_HEIGHT + DESKTOP_NAV_BAR_TOP_TIER_HEIGHT + VERTICAL_OFFSET

export type NotificationListMode = "dropdown" | "page"

export interface NotificationsWrapperProps extends MarkAllAsReadPanelProps {
  mode: NotificationListMode
}

export const NotificationsWrapper: React.FC<NotificationsWrapperProps> = ({
  mode,
  unreadCounts,
}) => {
  const { theme } = useTheme()

  return (
    <Box>
      {mode === "dropdown" ? (
        <Box style={{ boxShadow: theme.effects.dropShadow }}>
          <Flex flex={1} overflow="hidden">
            <NotificationsHeader mode="dropdown" unreadCounts={unreadCounts} />
          </Flex>

          <Separator />

          <Box
            maxHeight={`calc(100vh - ${DROPDOWN_CONTENT_HEIGHT}px)`}
            overflowY="scroll"
          >
            <NotificationsListQueryRenderer mode={mode} />
          </Box>
        </Box>
      ) : (
        <>
          <Sticky>
            <NotificationsHeader mode="page" unreadCounts={unreadCounts} />
            <Separator />
          </Sticky>

          <Flex overflow="scroll" flexDirection="column">
            <NotificationsListQueryRenderer mode={mode} />
          </Flex>
          <Separator />
        </>
      )}
    </Box>
  )
}
