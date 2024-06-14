import { useEffect } from "react"
import * as React from "react"
import { ErrorWithMetadata } from "Utils/errors"
import createLogger from "Utils/logger"
import { useToasts } from "@artsy/palette"

const logger = createLogger("Artsy/Router/NetworkTimeout")

const NETWORK_TIMEOUT_MS = 15000

export const NetworkTimeout: React.FC = () => {
  const { sendToast } = useToasts()

  useEffect(() => {
    const timeout = setTimeout(() => {
      logger.error(
        new ErrorWithMetadata(
          `[Router/NetworkTimeout] Error: Network request timed out after ${NETWORK_TIMEOUT_MS}ms`
        )
      )

      sendToast({
        variant: "error",
        message: "Network request timed out",
        action: {
          label: "Retry",
          onClick: () => {
            window.location.reload()
          },
        },
      })
    }, NETWORK_TIMEOUT_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [sendToast])

  return null
}
