import React from "react"
import { Flex, Button, Separator, Spacer } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export const AuthBanner: React.FC = () => {
  return (
    <>
      <Flex bg="white100" p={1}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to="/signup"
          variant="secondaryOutline"
          flex={1}
        >
          Sign up
        </Button>

        <Spacer ml={1} />

        <Button
          // @ts-ignore
          as={RouterLink}
          to="/login"
          flex={1}
        >
          Log in
        </Button>
      </Flex>

      <Separator />
    </>
  )
}
