import { captureException } from "@sentry/browser"
import { verifyEmail } from "./verifyEmail"
import { useCallback, useState } from "react"
import { useSystemContext } from "System/useSystemContext"
import { Environment } from "relay-runtime"

type verificationType = "Email"

export const useHandleEmailVerification = () => {
  return useHandleVerification("Email")
}

const VERIFICATION_BANNER_TIMEOUT = 6000

const useHandleVerification = (type: verificationType) => {
  const [showVerificationBanner, setShowVerificationBanner] = useState(false)
  const { relayEnvironment } = useSystemContext()

  const handleVerification = useCallback(async () => {
    try {
      await verify(type, relayEnvironment!)

      if (type === "Email") {
        setShowVerificationBanner(true)
      }
    } catch (error) {
      captureException(error)
      setShowVerificationBanner(false)
    } finally {
      // Allow the user some time to read the message
      setTimeout(() => {
        setShowVerificationBanner(false)
      }, VERIFICATION_BANNER_TIMEOUT)
    }
  }, [relayEnvironment, type])

  return { showVerificationBanner, handleVerification }
}

const verify = async (
  type: verificationType,
  relayEnvironment: Environment
) => {
  if (type === "Email") {
    const { sendConfirmationEmail } = await verifyEmail(relayEnvironment)

    const confirmationOrError = sendConfirmationEmail?.confirmationOrError
    return confirmationOrError?.unconfirmedEmail
  }
}
