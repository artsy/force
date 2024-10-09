import { Button, Flex, Spacer } from "@artsy/palette"
import { ContextModule, Intent } from "@artsy/cohesion"

import { useAuthDialog } from "Components/AuthDialog"

export const NavBarLoggedOutActions = () => {
  const { showAuthDialog } = useAuthDialog()

  return (
    <Flex alignItems="center">
      <Button
        variant="secondaryBlack"
        size="small"
        onClick={() => {
          showAuthDialog({
            analytics: {
              contextModule: ContextModule.header,
              intent: Intent.login,
            },
          })
        }}
      >
        Log In
      </Button>

      <Spacer x={1} />

      <Button
        size="small"
        onClick={() => {
          showAuthDialog({
            analytics: {
              contextModule: ContextModule.header,
              intent: Intent.signup,
            },
          })
        }}
      >
        Sign Up
      </Button>
    </Flex>
  )
}
