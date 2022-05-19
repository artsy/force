import { Button, Skeleton, SkeletonText, Spacer, Text } from "@artsy/palette"
import { useState, useEffect } from "react"
import * as React from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { forgotPassword } from "v2/Utils/auth"
import { useInquiryAccountContext, Screen } from "./InquiryAccount"
import { useTracking } from "v2/System/Analytics/useTracking"
import {
  ActionType,
  AuthModalType,
  ContextModule,
  Intent,
  ResetYourPassword,
} from "@artsy/cohesion"

type Mode = "Resetting" | "Error" | "Done"

export const InquiryResetPassword: React.FC = () => {
  const { inquiry } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  const [mode, setMode] = useState<Mode>("Resetting")

  const { trackEvent } = useTracking()

  useEffect(() => {
    const init = async () => {
      try {
        await forgotPassword({ email: inquiry.email! })
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

    init()
  }, [inquiry.email, trackEvent])

  const handleClick = () => {
    navigateTo(Screen.Login)
  }

  const message = {
    ["Resetting"]: `Please check your email (${inquiry.email}) for instructions on how to reset your password.`,
    ["Done"]: `Please check your email (${inquiry.email}) for instructions on how to reset your password.`,
    ["Error"]: "There was an error resetting your password.",
  }[mode]

  return (
    <>
      {mode === "Resetting" ? (
        <Skeleton>
          <SkeletonText variant="lg-display" mr={4}>
            {message}
          </SkeletonText>
        </Skeleton>
      ) : (
        <Text variant="lg-display" mr={4}>
          {message}
        </Text>
      )}

      <Spacer mt={2} />

      <Button
        display="block"
        width="100%"
        variant="secondaryOutline"
        onClick={handleClick}
      >
        Login
      </Button>
    </>
  )
}
