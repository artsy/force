import { ContextModule, Intent } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
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
        // @ts-expect-error
        as={RouterLink}
        to="/signup-new"
        size="small"
      >
        Sign Up
      </Button>
    </Flex>
  )
}
