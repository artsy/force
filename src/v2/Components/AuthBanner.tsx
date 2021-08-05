import React from "react"
import { Flex, Button, Spacer, FlexProps } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const AuthBanner: React.FC<FlexProps> = props => {
  return (
    <Flex {...props}>
      <Button
        // @ts-ignore
        as={RouterLink}
        to="/signup"
        variant="secondaryOutline"
        flex={1}
        size="small"
      >
        Sign up
      </Button>

      <Spacer ml={1} />

      <Button
        // @ts-ignore
        as={RouterLink}
        to="/login"
        flex={1}
        size="small"
      >
        Log in
      </Button>
    </Flex>
  )
}
