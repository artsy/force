import { ModalDialog } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import {
  type AuthDialogMode,
  type AuthDialogOptions,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogLeftPanel } from "Components/AuthDialog/AuthDialogLeftPanel"
import { AuthDialogTitle } from "Components/AuthDialog/AuthDialogTitle"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { MODAL_WIDTH } from "Components/AuthDialog/Utils/authDialogConstants"
import { AuthDialogForgotPassword } from "Components/AuthDialog/Views/AuthDialogForgotPassword"
import { AuthDialogLogin } from "Components/AuthDialog/Views/AuthDialogLogin"
import { AuthDialogSignUp } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { AuthDialogWelcome } from "Components/AuthDialog/Views/AuthDialogWelcome"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { type FC, useEffect } from "react"

export interface AuthDialogProps {
  onClose: () => void
}

export const AuthDialog: FC<React.PropsWithChildren<AuthDialogProps>> = ({
  onClose,
}) => {
  useRecaptcha()
  const newSignupEnabled = useFlag("onyx_new-signup-modal")

  const {
    state: { mode, options },
  } = useAuthDialogContext()

  const track = useAuthDialogTracking()

  const title =
    (typeof options.title === "function"
      ? options.title(mode)
      : options.title) || DEFAULT_TITLES[mode]

  useEffect(() => {
    track.impression({ title })
  }, [title, track])

  const handleClose = () => {
    onClose()
    options.onClose?.()
  }

  const isCloseable = options.isCloseable ?? true
  const modalProps = getModalProps(options, newSignupEnabled)

  return (
    <ModalDialog
      onClose={isCloseable ? handleClose : () => {}}
      minHeight={["auto", 760]}
      title={
        <AuthDialogTitle
          title={title}
          onClose={isCloseable ? handleClose : undefined}
          p={2}
        />
      }
      hasLogo
      m={[1, 2]}
      {...modalProps}
    >
      <AuthDialogView />
    </ModalDialog>
  )
}

export const AuthDialogView: FC<React.PropsWithChildren<unknown>> = () => {
  const { state } = useAuthDialogContext()

  switch (state.mode) {
    case "Login":
      return <AuthDialogLogin />
    case "SignUp":
      return <AuthDialogSignUp />
    case "ForgotPassword":
      return <AuthDialogForgotPassword />
    case "Welcome":
      return <AuthDialogWelcome />
  }
}

export const DEFAULT_TITLES: Record<AuthDialogMode, string> = {
  Login: "Welcome back to Artsy!",
  SignUp: "Welcome to Artsy — Create an account",
  ForgotPassword: "Reset your password", // pragma: allowlist secret
  Welcome: "Sign up or log in",
}

const getModalProps = (
  options: AuthDialogOptions,
  newSignupEnabled: boolean,
) => {
  if (!!options.image || !!options.imageUrl || newSignupEnabled) {
    return {
      width: ["100%", MODAL_WIDTH],
      leftPanel: <AuthDialogLeftPanel />,
    }
  }

  return {
    width: ["100%", 450],
  }
}
