import React from "react"
import { Flex, Button, Separator, Spacer } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export const NavBarAuthBanner: React.FC = () => {
  return (
    <>
      <Flex bg="white100" p={1}>
        {/* @ts-ignore */}
        <Button as={RouterLink} to="/signup" flex={1}>
          Sign up
        </Button>

        <Spacer ml={1} />

        {/* @ts-ignore */}
        <Button as={RouterLink} to="/login" flex={1}>
          Log in
        </Button>
      </Flex>

      <Separator />
    </>
  )
}
