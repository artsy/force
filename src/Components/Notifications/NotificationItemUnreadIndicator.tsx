import { Box } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

const UNREAD_INDICATOR_SIZE = 8

export const NotificationItemUnreadIndicator = styled(Box)`
  width: ${UNREAD_INDICATOR_SIZE}px;
  height: ${UNREAD_INDICATOR_SIZE}px;
  border-radius: ${UNREAD_INDICATOR_SIZE / 2}px;
  background-color: ${themeGet("colors.blue100")};
  flex-shrink: 0;
`

NotificationItemUnreadIndicator.defaultProps = {
  "aria-label": "Unread",
}
