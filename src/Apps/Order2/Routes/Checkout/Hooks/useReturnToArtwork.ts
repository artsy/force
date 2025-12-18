import {
  handleBackNavigation,
  preventHardReload,
} from "Apps/Order2/Utils/navigationGuards"
import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { useDismissEigenWebview } from "Apps/Order2/Routes/Checkout/Hooks/useDismissEigenWebview"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback } from "react"

export function useReturnToArtwork() {
  // Get router and orderData directly from the store to avoid action wrapper types
  const router = Order2CheckoutContext.useStoreState(state => state.router)
  const orderData = Order2CheckoutContext.useStoreState(
    state => state.orderData,
  )
  const { isEigen } = useSystemContext()
  const dismissWebview = useDismissEigenWebview()
  const artworkSlug = orderData?.lineItems?.[0]?.artwork?.slug

  const returnToArtwork = useCallback(
    (options?: { force?: boolean }) => {
      const force = options?.force ?? false

      if (!artworkSlug) {
        console.warn("No artwork slug found, cannot return to artwork")
        return
      }

      if (isEigen) {
        // For Eigen (mobile app webview), dismiss the webview
        dismissWebview()
      } else {
        // For web, navigate directly to the artwork
        if (force) {
          // Remove navigation guards before navigating
          window.removeEventListener("beforeunload", preventHardReload)
          window.removeEventListener("popstate", handleBackNavigation)
        }

        router.push(`/artwork/${artworkSlug}`)
      }
    },
    [artworkSlug, isEigen, router, dismissWebview],
  )

  return returnToArtwork
}
