import React from "react"
import { Flex, Button, Separator, Spacer } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const AuthBanner: React.FC = () => {
  return (
    <>
      <Flex bg="white100" p={1}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to="/login"
          variant="secondaryOutline"
          flex={1}
        >
          Log in
        </Button>

        <Spacer ml={1} />

        <Button
          // @ts-ignore
          as={RouterLink}
          to="/signup"
          flex={1}
        >
          Sign up
        </Button>
      </Flex>

      <Separator />
    </>
  )
}
