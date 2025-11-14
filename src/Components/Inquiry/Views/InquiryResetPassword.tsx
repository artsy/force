import {
  ActionType,
  AuthModalType,
  ContextModule,
  Intent,
  type ResetYourPassword,
} from "@artsy/cohesion"
import {
  Box,
  Button,
  Clickable,
  Input,
  Message,
  Spacer,
  Text,
} from "@artsy/palette"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { forgotPassword } from "Utils/auth"
import { useState } from "react"
import type * as React from "react"
import { useTracking } from "react-tracking"
import { Screen, useInquiryAccountContext } from "./InquiryAccount"

type Mode = "Resetting" | "Error" | "Done"

export const InquiryResetPassword: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { inquiry, setInquiry } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  const [mode, setMode] = useState<Mode>("Resetting")
  const [state, setState] = useState({
    email: inquiry.email ?? "",
  })

  const { trackEvent } = useTracking()

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    try {
      await forgotPassword({ ...state })
      setMode("Done")

      const options: ResetYourPassword = {
        action: ActionType.resetYourPassword,
        auth_redirect: window.location.href,
        context_module: ContextModule.inquiry,
        intent: Intent.inquire,
        service: "email",
        trigger: "click",
        type: AuthModalType.forgot,
      }

      trackEvent(options)
    } catch (err) {
      setMode("Error")
    }
  }

  const handleInputChange =
    name => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInquiry(prevState => ({ ...prevState, [name]: event.target.value }))
      setState(prevState => ({ ...prevState, [name]: event.target.value }))
    }

  const message = {
    ["Done"]: `We've sent a link to reset your password if an account is associated with this email.`,
    ["Error"]: "There was an error resetting your password.",
  }[mode]

  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <Text variant="lg-display" mr={4}>
          Reset your password
        </Text>

        <Spacer y={2} />

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

        {mode === "Done" && (
          <Message mt={2} mb={1} variant="success">
            {message}
          </Message>
        )}

        {mode === "Error" && (
          <Message mt={2} mb={1} variant="error">
            {message}
          </Message>
        )}

        <Spacer y={2} />

        {mode === "Done" ? (
          <Button
            display="block"
            width="100%"
            onClick={() => navigateTo(Screen.Login)}
          >
            Login
          </Button>
        ) : (
          <Button type="submit" display="block" width="100%">
            Send me reset instructions
          </Button>
        )}
      </Box>

      <Spacer y={2} />

      <Text variant="xs" textAlign="center" color="mono60">
        Don’t need to reset?{" "}
        <Clickable
          textDecoration="underline"
          data-test="login"
          onClick={() => navigateTo(Screen.Login)}
        >
          Log in
        </Clickable>{" "}
        or{" "}
        <Clickable
          textDecoration="underline"
          data-test="signup"
          onClick={() => navigateTo(Screen.SignUp)}
        >
          sign up.
        </Clickable>
      </Text>
    </>
  )
}
