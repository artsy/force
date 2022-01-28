import { Box, Text } from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"

export const SavedSearchAlertsApp: React.FC = ({ children }) => {
  return (
    <Box>
      <MetaTags title="Your Alerts | Artsy" pathname="/alerts" />
      <Text variant="xl" my={4}>
        Your Alerts
      </Text>
      {children}
    </Box>
  )
}
