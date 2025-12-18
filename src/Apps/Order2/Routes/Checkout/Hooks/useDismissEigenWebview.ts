import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback } from "react"

export function useDismissEigenWebview() {
  const { isEigen } = useSystemContext()

  const dismissWebview = useCallback(() => {
    if (!isEigen) {
      console.warn("dismissWebview called outside of Eigen context")
      return
    }

    const messagePayload = JSON.stringify({
      key: "dismissModal",
    })

    // iOS registers the ReactNativeWebView inside the webkit.messageHandlers
    if (window.webkit?.messageHandlers.ReactNativeWebView) {
      window.webkit.messageHandlers.ReactNativeWebView.postMessage(
        messagePayload,
      )
    } else {
      window.ReactNativeWebView?.postMessage(messagePayload)
    }
  }, [isEigen])

  return dismissWebview
}
