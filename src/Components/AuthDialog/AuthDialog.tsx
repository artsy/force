import { ModalDialog, Image, Box } from "@artsy/palette"
import {
  AuthDialogMode,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogLogin } from "Components/AuthDialog/Views/AuthDialogLogin"
import { AuthDialogForgotPassword } from "Components/AuthDialog/Views/AuthDialogForgotPassword"
import { AuthDialogSignUp } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { FC, useEffect } from "react"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { resized } from "Utils/resized"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { AuthDialogWelcome } from "Components/AuthDialog/Views/AuthDialogWelcome"
import { AuthDialogTitle } from "Components/AuthDialog/AuthDialogTitle"

export interface AuthDialogProps {
  onClose: () => void
}

export const AuthDialog: FC<AuthDialogProps> = ({ onClose }) => {
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

  return (
    <ModalDialog
      onClose={handleClose}
      title={<AuthDialogTitle title={title} onClose={handleClose} p={2} />}
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

export const AuthDialogView: FC = () => {
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
  src:
    "https://files.artsy.net/images/2x_Evergreen-Artist-Page-Sign-Up-Modal.jpg",
}

const AuthDialogLeftPanel: FC = () => {
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
