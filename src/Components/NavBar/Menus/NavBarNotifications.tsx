import { Box } from "@artsy/palette"
import { Notifications } from "Components/Notifications/Notifications"
import { useEffect } from "react"
import { useScrollLock } from "Utils/Hooks/useScrollLock"

interface NavBarNotificationsProps {
  unreadCounts: number
  onHide: () => void
}

export const NavBarNotifications: React.FC<NavBarNotificationsProps> = props => {
  const { lockScroll, unlockScroll } = useScrollLock()

  useEffect(() => {
    return () => {
      /**
       * unlock parent scroll when component unmounted
       * for example, when the user clicked on the notification and the dropdown menu was closed
       */
      unlockScroll()
    }
  }, [unlockScroll])

  return (
    <Box
      width={420}
      aria-live="assertive"
      onMouseEnter={lockScroll}
      onMouseLeave={unlockScroll}
    >
      <Notifications mode="dropdown" {...props} />
    </Box>
  )
}
