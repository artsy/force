import {
  Box,
  Button,
  Clickable,
  Input,
  Message,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import { wait } from "Utils/wait"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { signUp } from "Utils/auth"
import { logger } from "Components/Inquiry/util"
import {
  ActionType,
  AuthModalType,
  ContextModule,
  CreatedAccount,
  Intent,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useMode } from "Utils/Hooks/useMode"
import { RouterLink } from "System/Components/RouterLink"
import {
  Screen,
  useInquiryAccountContext,
} from "Components/Inquiry/Views/InquiryAccount"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

type Mode = "Pending" | "Loading" | "Error" | "Done" | "Success"

interface InquirySignUpState {
  name: string
  email: string
  password: string
}

export const InquirySignUp: React.FC = () => {
  const [mode, setMode] = useMode<Mode>("Pending")
  const [error, setError] = useState("")

  const { navigateTo } = useInquiryAccountContext()

  const {
    artworkID,
    engine,
    inquiry,
    next,
    setContext,
    setInquiry,
    setRelayEnvironment,
  } = useInquiryContext()

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest()

  const showNewDisclaimer = useFeatureFlag("diamond_new-terms-and-conditions")

  const [state, setState] = useState<InquirySignUpState>({
    name: "",
    email: inquiry.email ?? "",
    password: "",
  })

  const { trackEvent } = useTracking()

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    setMode("Loading")

    try {
      const { user } = await signUp(state)

      setContext({ isLoggedIn: true, requiresReload: true })

      // Creates an authenticated relay environment now that we have a user
      const relayEnvironment = createRelaySSREnvironment({ user })

      // Sets the authenicated environment so other steps can use it
      setRelayEnvironment(relayEnvironment)

      await submitArtworkInquiryRequest({
        artworkID,
        message: inquiry.message,
        contactGallery: !engine.decide("askSpecialist"),
      })

      setMode("Success")
      await wait(500)
      next()

      const options: CreatedAccount = {
        action: ActionType.createdAccount,
        auth_redirect: window.location.href,
        context_module: ContextModule.inquiry,
        intent: Intent.inquire,
        onboarding: false,
        service: "email",
        trigger: "click",
        type: AuthModalType.signup,
        user_id: user.id,
      }

      trackEvent(options)
    } catch (err) {
      setError(formatErrorMessage(err))
      setMode("Error")
      logger.error(err)
    }
  }

  const handleInputChange = (name: keyof InquirySignUpState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (name === "email") {
      setInquiry(prevState => ({ ...prevState, [name]: event.target.value }))
    }

    setState(prevState => ({ ...prevState, [name]: event.target.value }))
    mode === "Error" && setMode("Pending")
  }

  return (
    <>
      <EnableRecaptcha />

      <Box as="form" onSubmit={handleSubmit}>
        <Text variant="lg-display" mr={4}>
          Sign up to send your message
        </Text>

        <Separator my={2} />

        <Input
          name="name"
          title="Full Name"
          placeholder="Your full name"
          onChange={handleInputChange("name")}
          defaultValue={state.name}
          required
          autoFocus
          my={1}
        />

        <Input
          name="email"
          title="Email"
          placeholder="Your email address"
          onChange={handleInputChange("email")}
          defaultValue={state.email}
          type="email"
          required
          my={1}
        />

        <Input
          name="password"
          title="Password"
          placeholder="Your password"
          onChange={handleInputChange("password")}
          defaultValue={state.password}
          type="password"
          required
          my={1}
        />

        {mode === "Error" && <Message variant="error">{error}</Message>}

        <Spacer y={2} />

        <Button
          type="submit"
          display="block"
          width="100%"
          loading={mode === "Loading"}
          disabled={mode === "Success"}
        >
          Sign up and send message
        </Button>

        <Spacer y={2} />

        <Text variant="xs" color="black60" textAlign="center">
          Already have an account?{" "}
          <Clickable
            data-test="login"
            textDecoration="underline"
            onClick={() => {
              navigateTo(Screen.Login)
            }}
          >
            Log in.
          </Clickable>
        </Text>

        <Spacer y={2} />

        <Text variant="xs" color="black60" data-testid="disclaimer">
          By signing up, you agree to {showNewDisclaimer ? "Artsy's" : "our"}{" "}
          <RouterLink inline to="/terms" target="_blank">
            {showNewDisclaimer ? "Terms and Conditions" : "Terms of Use"}
          </RouterLink>
          ,{" "}
          <RouterLink inline to="/privacy" target="_blank">
            Privacy Policy
          </RouterLink>
          {!showNewDisclaimer && (
            <>
              {", "}
              <RouterLink inline to="/conditions-of-sale" target="_blank">
                Conditions of Sale
              </RouterLink>
            </>
          )}{" "}
          and to receiving emails from Artsy.
        </Text>

        <Text variant="xs" color="black60" mt={1}>
          This site is protected by reCAPTCHA and the{" "}
          <RouterLink
            inline
            to="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </RouterLink>{" "}
          and{" "}
          <RouterLink
            inline
            to="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </RouterLink>{" "}
          apply.
        </Text>
      </Box>
    </>
  )
}
