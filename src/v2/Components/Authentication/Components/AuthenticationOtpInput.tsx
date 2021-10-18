import { Input, Message } from "@artsy/palette"
import { useFormikContext } from "formik"
import React, { useState } from "react"
import { isMissingOnDemandOtpError, isOtpError } from "../helpers"
import { InputValues } from "../Types"

interface AuthenticationOtpInputProps {
  error: string
}

export const AuthenticationOtpInput: React.FC<AuthenticationOtpInputProps> = ({
  error,
}) => {
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [showOtpOnDemandPrompt, setShowOtpOnDemandPrompt] = useState(false)

  const { errors, values, handleBlur, handleChange } = useFormikContext<
    InputValues
  >()

  if (!showOtpInput) {
    if (isOtpError(error)) setShowOtpInput(true)
    if (isMissingOnDemandOtpError(error)) setShowOtpOnDemandPrompt(true)
  }

  return (
    <>
      {showOtpOnDemandPrompt && (
        <Message>
          Your safety and security are important to us. Please check your email
          for a one-time authentication code to complete your login.
        </Message>
      )}

      {showOtpInput && (
        <Input
          error={errors.otp_attempt}
          name="otp_attempt"
          placeholder="Enter an authentication code"
          value={values.otp_attempt}
          title="Authentication Code"
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </>
  )
}
