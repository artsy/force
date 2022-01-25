import { Box, Text } from "@artsy/palette"

export const SavedSearchAlertsApp: React.FC = ({ children }) => {
  return (
    <Box>
      <Text variant="xl" my={4}>
        Your Alerts
      </Text>
      {children}
    </Box>
  )
}
