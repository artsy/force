import { Box } from "@artsy/palette"
import { Notifications } from "Components/Notifications/Notifications"
import { useScrollLock } from "Utils/Hooks/useScrollLock"

export const NavBarNewNotifications = () => {
  const { lockScroll, unlockScroll } = useScrollLock()

  return (
    <Box
      width={420}
      aria-live="assertive"
      onMouseEnter={lockScroll}
      onMouseLeave={unlockScroll}
    >
      <Notifications mode="dropdown" paginationType="infinite" />
    </Box>
  )
}
