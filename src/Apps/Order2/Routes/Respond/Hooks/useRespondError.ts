import createLogger from "Utils/logger"
import { useState } from "react"

const logger = createLogger("Order2Respond")

const GENERIC_ERROR = "Something went wrong. Please try again."

/**
 * Shared error state for the Respond flow’s submission handlers.
 *
 * `handleSubmitError` surfaces a failure to the buyer and logs it: both
 * server-returned mutation errors and thrown/network errors funnel through it
 * so neither path goes unlogged. `clearError` resets the message before a new
 * attempt.
 *
 * TODO: proper error handling is tracked in EMI-3175.
 */
export const useRespondError = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmitError = (error: unknown, message?: string | null) => {
    logger.error(error)
    setErrorMessage(message ?? GENERIC_ERROR)
  }

  const clearError = () => {
    setErrorMessage(null)
  }

  return { errorMessage, handleSubmitError, clearError }
}
