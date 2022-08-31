import { Flex } from "@artsy/palette"
import { Notifications } from "Components/Notifications/Notifications"
import { useScrollLock } from "Utils/Hooks/useScrollLock"

export const NavBarNewNotifications = () => {
  const { lockScroll, unlockScroll } = useScrollLock()

  return (
    <Flex
      width={420}
      p={2}
      maxHeight="90vh"
      overflowY="scroll"
      flexDirection="column"
      aria-live="assertive"
      onMouseEnter={lockScroll}
      onMouseLeave={unlockScroll}
    >
      <Notifications paginationType="infinite" />
    </Flex>
  )
}
