import { Box, Button, Input, Separator, Spacer, Text } from "@artsy/palette"
import React from "react"
import { useState } from "react"
import { createRelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { ReCaptchaContainer } from "v2/Utils/ReCaptchaContainer"
import { wait } from "v2/Utils/wait"
import { useInquiryContext } from "../InquiryContext"
import { useArtworkInquiryRequest } from "../useArtworkInquiryRequest"
import { signUp } from "v2/Utils/auth"
import { logger } from "../util"

enum Mode {
  Pending,
  Loading,
  Error,
  Done,
  Success,
}

interface InquirySignUpState {
  name: string
  email: string
  password: string
}

export const InquirySignUp: React.FC = () => {
  const [mode, setMode] = useState<Mode>(Mode.Pending)
  const [error, setError] = useState("")

  const { inquiry, artworkID, next } = useInquiryContext()

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest({
    artworkID,
    message: inquiry.message,
  })

  const [state, setState] = useState<InquirySignUpState>({
    name: inquiry.name ?? "",
    email: inquiry.email ?? "",
    password: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    setMode(Mode.Loading)

    try {
      const { user } = await signUp(state)

      await submitArtworkInquiryRequest({
        relayEnvironment: createRelaySSREnvironment({ user }),
      })

      setMode(Mode.Success)
      await wait(500)
      next()
    } catch (err) {
      setError(err.message)
      setMode(Mode.Error)
      logger.error(err)
    }
  }

  const handleInputChange = (name: keyof InquirySignUpState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prevState => ({ ...prevState, [name]: event.target.value }))
    mode === Mode.Error && setMode(Mode.Pending)
  }

  return (
    <>
      <ReCaptchaContainer />

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
          error={mode === Mode.Error && error}
          type="password"
          required
          my={1}
        />

        <Spacer mt={2} />

        <Button
          type="submit"
          display="block"
          width="100%"
          loading={mode === Mode.Loading}
          disabled={mode === Mode.Success}
        >
          Create Account and Send Message
        </Button>

        <Spacer mt={2} />

        <Text variant="xs" color="black60">
          By signing up, you agree to our{" "}
          <a href="/terms" target="_blank">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank">
            Privacy Policy
          </a>
          .
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
