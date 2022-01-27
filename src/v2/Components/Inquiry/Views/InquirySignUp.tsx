import { Box, Button, Input, Separator, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { createRelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { EnableRecaptcha } from "v2/Utils/EnableRecaptcha"
import { wait } from "v2/Utils/wait"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { useArtworkInquiryRequest } from "../Hooks/useArtworkInquiryRequest"
import { signUp } from "v2/Utils/auth"
import { logger } from "../util"
import {
  ActionType,
  AuthModalType,
  ContextModule,
  CreatedAccount,
  Intent,
} from "@artsy/cohesion"
import { useTracking } from "v2/System/Analytics/useTracking"
import { useMode } from "v2/Utils/Hooks/useMode"

type Mode = "Pending" | "Loading" | "Error" | "Done" | "Success"

interface InquirySignUpState {
  name: string
  email: string
  password: string
}

export const InquirySignUp: React.FC = () => {
  const [mode, setMode] = useMode<Mode>("Pending")
  const [error, setError] = useState("")

  const {
    artworkID,
    engine,
    inquiry,
    next,
    setContext,
    setRelayEnvironment,
  } = useInquiryContext()

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest()

  const [state, setState] = useState<InquirySignUpState>({
    name: inquiry.name ?? "",
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
      setError(err.message)
      setMode("Error")
      logger.error(err)
    }
  }

  const handleInputChange = (name: keyof InquirySignUpState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prevState => ({ ...prevState, [name]: event.target.value }))
    mode === "Error" && setMode("Pending")
  }

  return (
    <>
      <EnableRecaptcha />

      <Box as="form" onSubmit={handleSubmit}>
        <Text variant="lg" mr={4}>
          Create an account to send your message
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
          error={mode === "Error" && error}
          type="password"
          required
          my={1}
        />

        <Spacer mt={2} />

        <Button
          type="submit"
          display="block"
          width="100%"
          loading={mode === "Loading"}
          disabled={mode === "Success"}
        >
          Create Account and Send Message
        </Button>

        <Spacer mt={2} />

        <Text variant="xs" color="black60">
          By signing up, you agree to our{" "}
          <a href="/terms" target="_blank">
            Terms of Use
          </a>
          ,{" "}
          <a href="/privacy" target="_blank">
            Privacy Policy
          </a>
          ,{" "}
          <a href="/conditions-of-sale" target="_blank">
            Conditions of Sale
          </a>{" "}
          and to receiving emails from Artsy.
        </Text>

        <Text variant="xs" color="black60" mt={1}>
          This site is protected by reCAPTCHA and the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </Text>
      </Box>
    </>
  )
}
