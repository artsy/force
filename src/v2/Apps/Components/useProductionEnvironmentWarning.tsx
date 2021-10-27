import { useToasts } from "@artsy/palette"
import { useEffect, useRef } from "react"
import { data as sd } from "sharify"

const shouldWarnProductionEnvironment =
  sd.NODE_ENV === "development" &&
  (sd.API_URL === "https://api.artsy.net" ||
    sd.METAPHYSICS_ENDPOINT === "https://metaphysics-production.artsy.net")

export const useProductionEnvironmentWarning = () => {
  const { sendToast } = useToasts()

  // Only warn once per full page load
  const alreadyWarned = useRef(false)

  useEffect(() => {
    if (shouldWarnProductionEnvironment && !alreadyWarned.current) {
      sendToast({
        message: "You are running a production environment.",
        description: `API_URL: ${sd.API_URL}, METAPHYSICS_ENDPOINT: ${sd.METAPHYSICS_ENDPOINT}`,
        variant: "error",
        ttl: 60000,
      })

      alreadyWarned.current = true
    }
  }, [sendToast])
}
