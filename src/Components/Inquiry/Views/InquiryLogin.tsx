import {
  ActionType,
  AuthModalType,
  ContextModule,
  Intent,
  type SuccessfullyLoggedIn,
} from "@artsy/cohesion"
import {
  Box,
  Button,
  Clickable,
  Flex,
  Input,
  Message,
  Separator,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { logger } from "Components/Inquiry/util"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { login } from "Utils/auth"
import { wait } from "Utils/wait"
import { useState } from "react"
import type * as React from "react"
import { useTracking } from "react-tracking"
import { Screen, useInquiryAccountContext } from "./InquiryAccount"

type Mode =
  | "Pending"
  | "Loading"
  | "TwoFactor"
  | "OnDemand"
  | "Error"
  | "Success"

interface InquiryLoginState {
  email: string
  password: string
  authenticationCode: string
}

export const InquiryLogin: React.FC<React.PropsWithChildren<unknown>> = () => {
  const {
    artworkID,
    engine,
    inquiry,
    next,
    setContext,
    setInquiry,
    setRelayEnvironment,
  } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  const { sendToast } = useToasts()

  const [mode, setMode] = useState<Mode>("Pending")

  const [state, setState] = useState<InquiryLoginState>({
    password: "",
    authenticationCode: "",
    email: inquiry.email ?? "",
  })

  const [error, setError] = useState("")

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest()

  const { trackEvent } = useTracking()

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    setMode("Loading")

    try {
      const { user } = await login({ ...state })

      setContext({
        collectorLevel: user.collector_level,
        isLoggedIn: true,
        location: {
          city: user.location?.city,
          state: user.location?.state,
          postalCode: user.location?.postalCode,
          country: user.location?.country,
        },
        profession: user.profession,
        requiresReload: true,
      })

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

      sendToast({
        variant: "success",
        message: "Message sent",
        description: "Expect a response within 1-3 business days.",
      })

      next()

      const options: SuccessfullyLoggedIn = {
        action: ActionType.successfullyLoggedIn,
        auth_redirect: window.location.href,
        context_module: ContextModule.inquiry,
        intent: Intent.inquire,
        service: "email",
        trigger: "click",
        type: AuthModalType.login,
        user_id: user.id,
      }

      trackEvent(options)
    } catch (err) {
      if (err.message === "missing on-demand authentication code") {
        setMode("OnDemand")
        return
      }

      if (
        err.message === "missing two-factor authentication code" ||
        err.message === "invalid two-factor authentication code"
      ) {
        setMode("TwoFactor")
        return
      }

      setMode("Error")
      setError(formatErrorMessage(err))
      logger.error(err)
    }
  }

  const handleInputChange =
    (name: keyof InquiryLoginState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "email") {
        setInquiry(prevState => ({ ...prevState, [name]: event.target.value }))
      }
      setState(prevState => ({ ...prevState, [name]: event.target.value }))
      mode === "Error" && setMode("Pending")
    }

  const handleClick = () => {
    navigateTo(Screen.ResetPassword)
  }

  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <Text variant="lg-display" mr={4}>
          Log in to send your message
        </Text>

        <Separator my={2} />

        <Input
          name="email"
          title="Email"
          defaultValue={inquiry.email}
          placeholder="Your email address"
          onChange={handleInputChange("email")}
          type="email"
          required
          autoFocus
          my={1}
        />

        <Input
          name="password"
          title="Password"
          placeholder="Enter your password"
          onChange={handleInputChange("password")}
          type="password"
          required
          my={1}
        />

        {mode === "OnDemand" && (
          <Message mt={2} mb={1}>
            Your safety and security are important to us. Please check your
            email for a one-time authentication code to complete your login.
          </Message>
        )}

        {(mode === "TwoFactor" || mode === "OnDemand") && (
          <Input
            name="authenticationCode"
            title="Authentication Code"
            placeholder="Enter an authentication code"
            onChange={handleInputChange("authenticationCode")}
            required
            autoFocus
            my={1}
          />
        )}

        {mode === "Error" && <Message variant="error">{error}</Message>}

        <Spacer y={2} />

        <Button
          type="submit"
          display="block"
          width="100%"
          loading={mode === "Loading"}
          disabled={mode === "Success"}
        >
          Login and Send Message
        </Button>

        <Spacer y={2} />

        <Text variant="xs" color="mono60" textAlign="center">
          Don't have an account?{" "}
          <Clickable
            data-test="login"
            textDecoration="underline"
            onClick={() => {
              navigateTo(Screen.SignUp)
            }}
          >
            Sign up.
          </Clickable>
        </Text>

        <Spacer y={2} />

        <Flex alignItems="center" justifyContent="flex-end">
          <Clickable textDecoration="underline" onClick={handleClick}>
            <Text variant="sm">Forgot your password?</Text>
          </Clickable>
        </Flex>
      </Box>
    </>
  )
}
