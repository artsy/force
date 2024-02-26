import { Box, Flex, Separator, useTheme } from "@artsy/palette"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"
import { Sticky } from "Components/Sticky"
import { NotificationsListQueryRenderer } from "Components/Notifications/NotificationsList"
import { NotificationsHeader } from "Components/Notifications/NotificationsHeader"
import { MarkAllAsReadPanelProps } from "Components/Notifications/MarkAllAsReadPanel"

const DROPDOWN_HEADER_HEIGHT = 113
const VERTICAL_OFFSET = 10
const DROPDOWN_CONTENT_HEIGHT =
  DROPDOWN_HEADER_HEIGHT + DESKTOP_NAV_BAR_HEIGHT + VERTICAL_OFFSET

export type NotificationListMode = "dropdown" | "page"

export interface NotificationsWrapperProps extends MarkAllAsReadPanelProps {
  mode: NotificationListMode
  onHide?: () => void
}

export const NotificationsWrapper: React.FC<NotificationsWrapperProps> = ({
  mode,
  onHide,
  unreadCounts,
}) => {
  const { theme } = useTheme()

  return (
    <Box>
      {mode === "dropdown" ? (
        <Box style={{ boxShadow: theme.effects.dropShadow }}>
          <Flex flex={1} overflow="hidden">
            <NotificationsHeader
              mode="dropdown"
              onHide={onHide}
              unreadCounts={unreadCounts}
            />
          </Flex>

          <Separator borderColor="black5" />

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
            <NotificationsHeader
              mode="page"
              onHide={onHide}
              unreadCounts={unreadCounts}
            />
            <Separator borderColor="black5" />
          </Sticky>

          <Box
            overflow="scroll"
            // The notification list needs a maximum height to be independently scrollable.
            maxHeight={[null, `calc(100vh - ${DROPDOWN_CONTENT_HEIGHT}px)`]}
            pb={2}
          >
            <NotificationsListQueryRenderer mode={mode} />
          </Box>
        </>
      )}
    </Box>
  )
}
