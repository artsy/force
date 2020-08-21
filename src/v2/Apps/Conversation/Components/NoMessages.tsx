import { Box, Button, Flex, Sans } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { EmptyInboxHeader } from "./EmptyInboxHeader"
import React from "react"

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
        <Sans size="6" weight="medium" mb={1} textAlign="center">
          You don't have any messages yet.
        </Sans>
        <Sans size="3" mb={2} maxWidth={["100%", "400px"]} textAlign="center">
          Contact galleries to purchase available work. You'll find your ongoing
          conversations here.
        </Sans>
        <RouterLink to="/collect">
          <Button>Explore artworks</Button>
        </RouterLink>
      </Flex>
    </Box>
  )
}
