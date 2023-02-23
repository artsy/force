import { Button, Flex, Spacer } from "@artsy/palette"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useTranslation } from "react-i18next"
import { useAuthDialog } from "Components/AuthDialog"

export const NavBarLoggedOutActions = () => {
  const { t } = useTranslation()

  const { showAuthDialog } = useAuthDialog()

  return (
    <Flex alignItems="center">
      <Button
        variant="secondaryBlack"
        size="small"
        onClick={() => {
          showAuthDialog({
            mode: "Login",
            analytics: {
              contextModule: ContextModule.header,
              intent: Intent.login,
            },
          })
        }}
      >
        {t`navbar.login`}
      </Button>

      <Spacer x={1} />

      <Button
        size="small"
        onClick={() => {
          showAuthDialog({
            mode: "SignUp",
            analytics: {
              contextModule: ContextModule.header,
              intent: Intent.signup,
            },
          })
        }}
      >
        {t`navbar.signup`}
      </Button>
    </Flex>
  )
}
