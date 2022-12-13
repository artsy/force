import { ModalDialog, Image, Box } from "@artsy/palette"
import {
  AuthDialogMode,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogLogin } from "Components/AuthDialog/Views/AuthDialogLogin"
import { AuthDialogForgotPassword } from "Components/AuthDialog/Views/AuthDialogForgotPassword"
import { AuthDialogSignUpQueryRenderer } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { FC } from "react"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { resized } from "Utils/resized"

export interface AuthDialogProps {
  onClose: () => void
}

export const AuthDialog: FC<AuthDialogProps> = ({ onClose }) => {
  useRecaptcha()

  const {
    state: { mode, options },
  } = useAuthDialogContext()

  return (
    <ModalDialog
      onClose={onClose}
      title={options.title || DEFAULT_TITLES[mode]}
      hasLogo
      {...(options.image
        ? {
            width: 900,
            leftPanel: <AuthDialogLeftPanel />,
          }
        : { width: 450 })}
    >
      <AuthDialogView />
    </ModalDialog>
  )
}

const AuthDialogView: FC = () => {
  const { state } = useAuthDialogContext()

  switch (state.mode) {
    case "Login":
      return <AuthDialogLogin />
    case "SignUp":
      return <AuthDialogSignUpQueryRenderer />
    case "ForgotPassword":
      return <AuthDialogForgotPassword />
  }
}

const DEFAULT_TITLES: Record<AuthDialogMode, string> = {
  Login: "Log in to collect art by the world’s leading artists",
  SignUp: "Sign up to collect art by the world’s leading artists",
  ForgotPassword: "Reset your password", // pragma: allowlist secret
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
