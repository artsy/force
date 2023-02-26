import { captureException } from "@sentry/browser"
import { verifyEmail } from "./verifyEmail"
import { verifyID } from "./verifyID"
import { useCallback, useState } from "react"
import { useSystemContext } from "System/useSystemContext"
import { Environment } from "relay-runtime"

type verificationType = "ID" | "Email"

const IDVerificationBlockingStates = ["passed", "failed", "watchlist_hit"]

export const useHandleEmailVerification = () => {
  return useHandleVerification("Email")
}

export const useHandleIDVerification = () => {
  return useHandleVerification("ID")
}

const VERIFICATION_BANNER_TIMEOUT = 6000

const useHandleVerification = (type: verificationType) => {
  const [showVerificationBanner, setShowVerificationBanner] = useState(false)
  const { relayEnvironment } = useSystemContext()

  const handleVerification = useCallback(async () => {
    try {
      const response = await verify(type, relayEnvironment!)

      // if response as state from ID verification
      const IDVerificationState = !(
        response && IDVerificationBlockingStates.includes(response)
      )

      if (type === "Email" || IDVerificationState) {
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
  } else {
    const { sendIdentityVerificationEmail } = await verifyID(relayEnvironment)

    const confirmationOrError =
      sendIdentityVerificationEmail?.confirmationOrError
    return confirmationOrError?.identityVerificationEmail?.state
  }
}
