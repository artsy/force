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
} from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { wait } from "Utils/wait"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { login } from "Utils/auth"
import { useInquiryAccountContext, Screen } from "./InquiryAccount"
import { logger } from "Components/Inquiry/util"
import { useTracking } from "react-tracking"
import {
  ActionType,
  AuthModalType,
  ContextModule,
  Intent,
  SuccessfullyLoggedIn,
} from "@artsy/cohesion"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"

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

export const InquiryLogin: React.FC = () => {
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
          stateCode: user.location?.stateCode,
          postalCode: user.location?.postalCode,
          country: user.location?.country,
        },
        profession: user.profession,
        requiresReload: true,
        shareFollows: user.share_follows,
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

  const handleInputChange = (name: keyof InquiryLoginState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
            inputMode={"numeric"}
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

        <Text variant="xs" color="black60" textAlign="center">
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
