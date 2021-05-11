import { sendErrorToService } from "v2/Utils/errors"

export const shouldCaptureError = (environment: string) =>
  environment === "staging" || environment === "production"

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
      const error = errors.find(e => e instanceof Error)

      // @ts-expect-error STRICT_NULL_CHECK
      if (error && shouldCaptureError(process.env.NODE_ENV)) {
        sendErrorToService(error)
      }

      console.error(formattedNamespace, ...errors, "\n")
    },
  }
}
