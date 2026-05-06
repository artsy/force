import { ContextModule, Intent } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"

export const NavBarLoggedOutActions = () => {
  const { showAuthDialog } = useAuthDialog()
  const { match } = useRouter()
  const currentPath = match.location.pathname

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
        size="small"
        to={`/signup?redirectTo=${encodeURIComponent(currentPath)}`}
      >
        Sign Up
      </Button>
    </Flex>
  )
}
