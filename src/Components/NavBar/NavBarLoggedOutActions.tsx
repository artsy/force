import { Button, Flex, Spacer } from "@artsy/palette"
import { ModalType } from "Components/Authentication/Types"
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
            current: {
              mode: "Login",
              analytics: {
                contextModule: ContextModule.header,
                intent: Intent.login,
              },
            },
            legacy: {
              mode: ModalType.login,
              intent: Intent.login,
              contextModule: ContextModule.header,
              copy: "Log in to collect art by the world’s leading artists",
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
            current: {
              mode: "SignUp",
              analytics: {
                contextModule: ContextModule.header,
                intent: Intent.signup,
              },
            },
            legacy: {
              mode: ModalType.signup,
              intent: Intent.signup,
              contextModule: ContextModule.header,
              copy: "Sign up to collect art by the world’s leading artists",
              redirectTo: window.location.href,
            },
          })
        }}
      >
        {t`navbar.signup`}
      </Button>
    </Flex>
  )
}
