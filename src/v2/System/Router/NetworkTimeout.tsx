import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { useEffect, useState } from "react";
import * as React from "react";
import { ErrorWithMetadata } from "v2/Utils/errors"
import createLogger from "v2/Utils/logger"

const logger = createLogger("Artsy/Router/NetworkTimeout")

const NETWORK_TIMEOUT_MS = 15000

export const NetworkTimeout: React.FC = () => {
  const [showErrorModal, toggleErrorModal] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!showErrorModal) {
        logger.error(
          new ErrorWithMetadata(
            `[Router/NetworkTimeout] Error: Network request timed out after ${NETWORK_TIMEOUT_MS}ms`
          )
        )
        toggleErrorModal(true)
      }
    }, NETWORK_TIMEOUT_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [showErrorModal])

  if (!showErrorModal) {
    return null
  }

  return (
    <ErrorModal
      headerText="Network timeout"
      show={showErrorModal}
      closeText="Retry"
      ctaAction={() => {
        location.reload()
      }}
    />
  )
}
