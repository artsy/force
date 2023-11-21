import { Text, Box } from "@artsy/palette"

export const ConversationsSidebarHeader: React.FC = () => {
  return (
    <Box
      p={2}
      px={2}
      position="sticky"
      top={0}
      flexDirection="column"
      backgroundColor="white100"
      borderBottom="1px solid"
      borderBottomColor="black15"
      zIndex={1}
    >
      <Text variant="lg">Conversations</Text>
    </Box>
  )
}
