import { useEffect, useRef } from "react"
import { subscribeToInAppMessagesByPath } from "Server/analytics/brazeMessagingIntegration"
import { useSystemContext } from "System/Hooks/useSystemContext"

/**
 * Hook to subscribe to Braze in-app messages for logged-in users only.
 *
 * This hook:
 * - Only subscribes when the user is logged in
 * - Waits for analytics and Braze SDK to be ready
 * - Prevents duplicate subscriptions using a ref
 * - Handles mid-session login (user logs in after page load)
 */
export const useBrazeSubscription = () => {
  const { isLoggedIn } = useSystemContext()
  const hasSubscribed = useRef(false)

  useEffect(() => {
    // Only subscribe once when user is logged in
    if (isLoggedIn && !hasSubscribed.current) {
      // Wait for analytics and braze to be ready
      if (window?.analytics && window?.braze) {
        subscribeToInAppMessagesByPath()
        hasSubscribed.current = true
      }
    }
  }, [isLoggedIn])
}
