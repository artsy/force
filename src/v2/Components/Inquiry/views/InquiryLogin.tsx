import {
  Box,
  Button,
  Clickable,
  Flex,
  Input,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import React, { useState } from "react"
import { createRelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { wait } from "v2/Utils/wait"
import { useInquiryContext } from "../InquiryContext"
import { useArtworkInquiryRequest } from "../useArtworkInquiryRequest"
import { login } from "v2/Utils/auth"
import { useInquiryAccountContext, Screen } from "./InquiryAccount"
import { logger } from "../util"

enum Mode {
  Pending,
  Loading,
  TwoFactor,
  Error,
  Success,
}

interface InquiryLoginState {
  password: string
  authenticationCode: string
}

export const InquiryLogin: React.FC = () => {
  const { inquiry, artworkID, next } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  const [mode, setMode] = useState<Mode>(Mode.Pending)

  const [state, setState] = useState<InquiryLoginState>({
    password: "",
    authenticationCode: "",
  })

  const { submitArtworkInquiryRequest } = useArtworkInquiryRequest({
    artworkID,
    message: inquiry.message,
  })

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    setMode(Mode.Loading)

    try {
      const { user } = await login({ email: inquiry.email!, ...state })

      await submitArtworkInquiryRequest({
        relayEnvironment: createRelaySSREnvironment({ user }),
      })

      setMode(Mode.Success)
      await wait(500)
      next()
    } catch (err) {
      if (
        err.message === "missing two-factor authentication code" ||
        err.message === "invalid two-factor authentication code"
      ) {
        setMode(Mode.TwoFactor)
        return
      }

      // TODO: Improve error messaging
      setMode(Mode.Error)
      logger.error(err)
    }
  }

  const handleInputChange = (name: keyof InquiryLoginState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prevState => ({ ...prevState, [name]: event.target.value }))
    mode === Mode.Error && setMode(Mode.Pending)
  }

  const handleClick = () => {
    navigateTo(Screen.ResetPassword)
  }

  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <Text variant="lg" mr={4}>
          We found an Artsy account associated with {inquiry.email}.
        </Text>

        <Text variant="lg" mr={4} my={1}>
          Please log in to continue.
        </Text>

        <Separator my={2} />

        <Input
          name="password"
          title="Password"
          placeholder="Enter your password"
          onChange={handleInputChange("password")}
          type="password"
          error={mode === Mode.Error && "Invalid password"}
          required
          autoFocus
          my={1}
        />

        {mode === Mode.TwoFactor && (
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

        <Spacer mt={2} />

        <Button
          type="submit"
          display="block"
          width="100%"
          loading={mode === Mode.Loading}
          disabled={mode === Mode.Success}
        >
          Login and Send Message
        </Button>

        <Spacer mt={2} />

        <Flex alignItems="center" justifyContent="flex-end">
          <Clickable textDecoration="underline" onClick={handleClick}>
            <Text variant="sm">Forgot your password?</Text>
          </Clickable>
        </Flex>
      </Box>
    </>
  )
}
