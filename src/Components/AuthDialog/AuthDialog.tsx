import { ModalDialog, Image, Box } from "@artsy/palette"
import {
  AuthDialogMode,
  AUTH_MODAL_TYPES,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogLogin } from "Components/AuthDialog/Views/AuthDialogLogin"
import { AuthDialogForgotPassword } from "Components/AuthDialog/Views/AuthDialogForgotPassword"
import { AuthDialogSignUpQueryRenderer } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { FC, useEffect } from "react"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { resized } from "Utils/resized"
import { useTracking } from "react-tracking"
import { ActionType, AuthImpression } from "@artsy/cohesion"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"

export interface AuthDialogProps {
  onClose: () => void
}

export const AuthDialog: FC<AuthDialogProps> = ({ onClose }) => {
  useRecaptcha()

  const {
    state: { mode, options, analytics },
  } = useAuthDialogContext()

  const title = options.title || DEFAULT_TITLES[mode]

  const { trackEvent } = useTracking()
  const { isElligibleForOnboarding } = useElligibleForOnboarding()

  useEffect(() => {
    if (!analytics.intent || !analytics.trigger) return

    const payload: AuthImpression = {
      action: ActionType.authImpression,
      context_module: analytics.contextModule,
      intent: analytics.intent,
      modal_copy: title,
      onboarding: isElligibleForOnboarding,
      trigger: analytics.trigger,
      type: AUTH_MODAL_TYPES[mode],
    }

    trackEvent(payload)
  }, [
    analytics.contextModule,
    analytics.intent,
    analytics.trigger,
    isElligibleForOnboarding,
    mode,
    title,
    trackEvent,
  ])

  return (
    <ModalDialog
      onClose={onClose}
      title={title}
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
