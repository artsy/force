import { sendErrorToService } from "Utils/errors"

export const shouldCaptureError = (
  environment: string = "development"
): boolean => environment === "staging" || environment === "production"

export default function createLogger(namespace = "") {
  const formattedNamespace = namespace ? `${namespace} |` : ""

  return {
    log: (...messages) => {
      // eslint-disable-next-line no-console
      console.log(formattedNamespace, ...messages, "\n")
    },
    warn: (...warnings) => {
      console.warn(formattedNamespace, ...warnings, "\n")
    },
    error: (...errors) => {
      const error = errors.find(
        e => e instanceof Error || e?.shouldLogErrorToSentry
      )

      if (error && shouldCaptureError(process.env.NODE_ENV)) {
        sendErrorToService(error)
      }

      console.error(formattedNamespace, ...errors, "\n")
    },
  }
}
