import {
  ArtsyLogoBlackIcon,
  Spacer,
  Button,
  Flex,
  Join,
  Text,
  PasswordInput,
  useToasts,
} from "@artsy/palette"
import React, { useState } from "react"
import { MetaTags } from "v2/Components/MetaTags"
import { useRouter } from "v2/System/Router/useRouter"
import { resetPassword } from "v2/Utils/auth"
import { useMode } from "v2/Utils/Hooks/useMode"

interface ResetPasswordRouteProps {}

type Mode = "Pending" | "Loading" | "Success" | "Error"

export const ResetPasswordRoute: React.FC<ResetPasswordRouteProps> = () => {
  const { match } = useRouter()

  const query = match?.location?.query ?? {}

  const { sendToast } = useToasts()

  const [mode, setMode] = useMode<Mode>("Pending")
  const [state, setState] = useState({ password: "", passwordConfirmation: "" })

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (!("reset_password_token" in query)) {
      sendToast({
        variant: "error",
        message: "Reset password token is missing.",
        description:
          "Check your email for instructions for resetting your password.",
      })

      return
    }

    setMode("Loading")

    try {
      await resetPassword({
        ...state,
        resetPasswordToken: query.reset_password_token,
      })

      sendToast({
        variant: "success",
        message: "Password successfully reset. Redirecting...",
        ttl: 10000,
      })

      setMode("Success")

      window.location.assign(query.reset_password_redirect_to || "/login")
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })

      setMode("Error")
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const verb = query.set_password ? "Set" : "Change"

  const label = {
    ["Pending"]: `${verb} My Password`,
    ["Loading"]: `${verb} My Password`,
    ["Success"]: "Password Updated",
    ["Error"]: `${verb} My Password`,
  }[mode]

  return (
    <>
      <MetaTags title="Reset Password | Artsy" />

      <Flex
        as="form"
        data-test="ResetPasswordForm"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        justifyContent="center"
        mx="auto"
        py={4}
        maxWidth={440}
        // @ts-ignore
        onSubmit={handleSubmit}
      >
        <Join separator={<Spacer mt={2} />}>
          <ArtsyLogoBlackIcon />

          <Text variant="lg">{verb} Your Password</Text>

          <PasswordInput
            name="password"
            title="New Password"
            placeholder="New Password"
            width="100%"
            onChange={handleChange}
            required
            autoFocus
            pattern=".{8,}"
            autoComplete="new-password"
          />

          <PasswordInput
            name="passwordConfirmation"
            title="Confirm New Password"
            placeholder="Confirm New Password"
            width="100%"
            onChange={handleChange}
            required
            pattern=".{8,}"
            autoComplete="new-password"
          />

          <Button
            width="100%"
            loading={mode === "Loading"}
            disabled={mode === "Success"}
          >
            {label}
          </Button>
        </Join>
      </Flex>
    </>
  )
}
