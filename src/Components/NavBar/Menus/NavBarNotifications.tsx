import { Box } from "@artsy/palette"
import { Notifications } from "Components/Notifications/Notifications"

interface NavBarNotificationsProps {
  unreadCounts: number
  onHide: () => void
}

export const NavBarNotifications: React.FC<React.PropsWithChildren<
  NavBarNotificationsProps
>> = ({ onHide, ...rest }) => {
  return (
    <Box width={420}>
      <Notifications mode="dropdown" onHide={onHide} {...rest} />
    </Box>
  )
}
