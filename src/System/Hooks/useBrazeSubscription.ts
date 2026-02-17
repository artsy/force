import { subscribeToInAppMessagesByPath } from "Server/analytics/brazeMessagingIntegration"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useEffect, useRef } from "react"

export const useBrazeSubscription = () => {
  const { isLoggedIn } = useSystemContext()
  const hasSubscribed = useRef(false)

  useEffect(() => {
    if (!isLoggedIn) {
      // Reset flag on logout to allow re-subscription if user logs back in
      hasSubscribed.current = false
      return
    }

    if (hasSubscribed.current) return

    let cancelled = false
    let attempt = 0

    const maxAttempts = 20 // 20 * 100ms = 2s total
    const intervalMs = 100

    const trySubscribe = () => {
      if (cancelled || hasSubscribed.current) return

      const analyticsReady = !!(window as any)?.analytics
      const brazeReady = !!(window as any)?.braze?.subscribeToInAppMessage

      if (analyticsReady && brazeReady) {
        try {
          subscribeToInAppMessagesByPath()
          hasSubscribed.current = true
          return
        } catch (error) {
          // Braze not fully initialized yet, will retry
          console.debug("Braze not ready, retrying...", error)
        }
      }

      attempt += 1
      if (attempt < maxAttempts) {
        setTimeout(trySubscribe, intervalMs)
      }
      // else: give up quietly (or add a debug log if you want)
    }

    trySubscribe()

    return () => {
      cancelled = true
    }
  }, [isLoggedIn])
}
