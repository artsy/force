import { Clickable, Flex, Text } from "@artsy/palette"

export const MARK_ALL_AS_READ_PANEL_HEIGHT = 40

export const MarkAllAsReadPanel = () => {
  const handleMarkAsRead = () => {}

  return (
    <Flex
      height={MARK_ALL_AS_READ_PANEL_HEIGHT}
      p={2}
      alignItems="center"
      borderBottom="1px solid"
      borderBottomColor="black15"
      bg="white100"
    >
      <Clickable onClick={handleMarkAsRead}>
        <Text variant="xs" color="black60">
          Mark all as read
        </Text>
      </Clickable>
    </Flex>
  )
}
