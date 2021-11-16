import { useToasts } from "@artsy/palette"
import { useEffect, useRef } from "react"

export const useNetworkOfflineMonitor = () => {
  const toastID = useRef<string | null>(null)

  const { sendToast, retractToast } = useToasts()

  useEffect(() => {
    const handleOffline = () => {
      if (toastID.current) return

      const { id } = sendToast({
        message: "Network offline",
        description:
          "You are currently offline. Please check your internet connection.",
        variant: "message",
        ttl: Infinity,
      })

      toastID.current = id
    }

    const handleOnline = () => {
      if (!toastID.current) return

      retractToast(toastID.current)
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [retractToast, sendToast, toastID])
}
