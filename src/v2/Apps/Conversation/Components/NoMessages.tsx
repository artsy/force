import { Button, Flex, Sans } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"

export const NoMessages = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Sans size="6" weight="medium" mb={2}>
        You don't have any messages yet.
      </Sans>
      <RouterLink to="/collect">
        <Button>Explore Artworks</Button>
      </RouterLink>
    </Flex>
  )
}
