import { Box, Text } from "@artsy/palette"

export const ConversationsSidebarHeader: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Box
      p={2}
      px={2}
      position="sticky"
      top={0}
      flexDirection="column"
      backgroundColor="mono0"
      borderBottom="1px solid"
      borderBottomColor="mono15"
      zIndex={1}
    >
      <Text variant="lg">Conversations</Text>
    </Box>
  )
}
