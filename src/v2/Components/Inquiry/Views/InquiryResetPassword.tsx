import { Button, Skeleton, SkeletonText, Spacer, Text } from "@artsy/palette"
import React, { useState, useEffect } from "react"
import { useInquiryContext } from "../InquiryContext"
import { resetPassword } from "v2/Utils/auth"
import { useInquiryAccountContext, Screen } from "./InquiryAccount"

enum Mode {
  Resetting,
  Error,
  Done,
}

export const InquiryResetPassword: React.FC = () => {
  const { inquiry } = useInquiryContext()
  const { navigateTo } = useInquiryAccountContext()

  const [mode, setMode] = useState<Mode>(Mode.Resetting)

  useEffect(() => {
    const init = async () => {
      try {
        await resetPassword({ email: inquiry.email! })
        setMode(Mode.Done)
      } catch (err) {
        setMode(Mode.Error)
      }
    }

    init()
  }, [inquiry.email])

  const handleClick = () => {
    navigateTo(Screen.Login)
  }

  const message = {
    [Mode.Resetting]: `Please check your email (${inquiry.email}) for instructions on how to reset your password.`,
    [Mode.Done]: `Please check your email (${inquiry.email}) for instructions on how to reset your password.`,
    [Mode.Error]: "There was an error resetting your password.",
  }[mode]

  return (
    <>
      {mode === Mode.Resetting ? (
        <Skeleton>
          <SkeletonText variant="lg" mr={4}>
            {message}
          </SkeletonText>
        </Skeleton>
      ) : (
        <Text variant="lg" mr={4}>
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
