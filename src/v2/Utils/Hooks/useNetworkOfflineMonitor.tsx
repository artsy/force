import { useToasts } from "@artsy/palette"
import { throttle } from "lodash"
import { useEffect, useState } from "react"

export const useNetworkOfflineMonitor = () => {
  const [offline, _setOffline] = useState(false)

  const setOffline = throttle(() => _setOffline(true), 200)
  const setOnline = throttle(() => _setOffline(false), 200)

  useEffect(() => {
    window.addEventListener("offline", setOffline)
    window.addEventListener("online", setOnline)

    return () => {
      window.removeEventListener("offline", setOffline)
      window.removeEventListener("online", setOnline)
    }
  }, [setOffline, setOnline])

  const { sendToast } = useToasts()

  useEffect(() => {
    if (offline) {
      sendToast({
        message: "Network offline",
        description:
          "You are currently offline. Please check your internet connection.",
        variant: "message",
        ttl: 60000,
      })
    }
  }, [offline, sendToast])
}
