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
        subscribeToInAppMessagesByPath()
        hasSubscribed.current = true
        return
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
