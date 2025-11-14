import {
  type AuthDialogMode,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogTitle } from "Components/AuthDialog/AuthDialogTitle"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { AuthDialogForgotPassword } from "Components/AuthDialog/Views/AuthDialogForgotPassword"
import { AuthDialogLogin } from "Components/AuthDialog/Views/AuthDialogLogin"
import { AuthDialogSignUp } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { AuthDialogWelcome } from "Components/AuthDialog/Views/AuthDialogWelcome"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { resized } from "Utils/resized"
import { Box, Image, ModalDialog } from "@artsy/palette"
import { type FC, useEffect } from "react"

export interface AuthDialogProps {
  onClose: () => void
}

export const AuthDialog: FC<React.PropsWithChildren<AuthDialogProps>> = ({
  onClose,
}) => {
  useRecaptcha()

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

  return (
    <ModalDialog
      onClose={isCloseable ? handleClose : () => {}}
      title={
        <AuthDialogTitle
          title={title}
          onClose={isCloseable ? handleClose : undefined}
          p={2}
        />
      }
      hasLogo
      m={[1, 2]}
      {...(options.image
        ? {
            width: ["100%", 900],
            leftPanel: <AuthDialogLeftPanel />,
          }
        : { width: ["100%", 450] })}
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

const IMAGE = {
  width: 900,
  height: 2030,
  src: "https://files.artsy.net/images/2x_Evergreen-Artist-Page-Sign-Up-Modal.jpg",
}

const AuthDialogLeftPanel: FC<React.PropsWithChildren<unknown>> = () => {
  const img = resized(IMAGE.src, { width: 450 })

  return (
    <Box display={["none", "block"]} width="100%">
      <Image
        {...img}
        width="100%"
        height="100%"
        lazyLoad
        alt=""
        style={{ objectFit: "cover" }}
      />
    </Box>
  )
}
