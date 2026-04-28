import { ContextModule, Intent } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"

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
        // @ts-ignore
        as={RouterLink}
        to={`/signup?intent=${Intent.signup}&contextModule=${ContextModule.header}`}
        size="small"
      >
        Sign Up
      </Button>
    </Flex>
  )
}
