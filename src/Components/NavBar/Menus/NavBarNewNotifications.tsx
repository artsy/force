import { Flex } from "@artsy/palette"
import { Notifications } from "Components/Notifications/Notifications"

export const NavBarNewNotifications = () => {
  return (
    <Flex
      width={420}
      p={2}
      maxHeight="90vh"
      overflowY="scroll"
      flexDirection="column"
      aria-live="assertive"
    >
      <Notifications paginationType="infinite" />
    </Flex>
  )
}
