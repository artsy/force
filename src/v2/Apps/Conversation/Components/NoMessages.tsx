import { Box, Button, Flex, Text } from "@artsy/palette"

import { RouterLink } from "v2/System/Router/RouterLink"
import { EmptyInboxHeader } from "./EmptyInboxHeader"

export const NoMessages = () => {
  return (
    <Box>
      <EmptyInboxHeader />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={["calc(100vh - 250px)", "calc(100vh - 145px)"]}
        px={[2, 4, 1]}
      >
        <Text variant="lg-display" mb={1} textAlign="center">
          You don't have any messages yet.
        </Text>
        <Text
          variant="xs"
          mb={2}
          maxWidth={["100%", "400px"]}
          textAlign="center"
        >
          Contact galleries to purchase available work. You'll find your ongoing
          conversations here.
        </Text>
        <RouterLink to="/collect">
          <Button>Explore artworks</Button>
        </RouterLink>
      </Flex>
    </Box>
  )
}
