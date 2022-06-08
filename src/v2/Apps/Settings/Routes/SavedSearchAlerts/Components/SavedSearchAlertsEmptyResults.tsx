import { Box, Button, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const SavedSearchAlertsEmptyResults = () => {
  return (
    <Box
      mx="auto"
      px={[2, 0]}
      justifyContent="center"
      maxWidth="540px"
      pt={6}
      pb={100}
    >
      <Flex flexDirection="column" alignItems="center">
        <Text textAlign="center" variant="xl">
          You haven't created any Alerts yet.
        </Text>
        <Text py={2} variant="sm" color="black60" textAlign="center">
          Filter for the artworks you love on an Artist Page and tap ‘Create
          Alert’ to be notified when new works are added to Artsy.
        </Text>
        <Button
          // @ts-ignore
          as={RouterLink}
          to="/artists"
          width="100%"
          size="large"
        >
          Explore Artists
        </Button>
      </Flex>
    </Box>
  )
}
