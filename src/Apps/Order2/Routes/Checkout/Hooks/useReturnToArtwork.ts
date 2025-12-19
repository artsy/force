import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { useCallback } from "react"

export function useReturnToArtwork() {
  // Get router and orderData directly from the store to avoid action wrapper types
  const router = Order2CheckoutContext.useStoreState(state => state.router)
  const orderData = Order2CheckoutContext.useStoreState(
    state => state.orderData,
  )
  const artworkSlug = orderData?.lineItems?.[0]?.artwork?.slug

  const returnToArtwork = useCallback(() => {
    if (!artworkSlug) {
      console.warn("No artwork slug found, cannot return to artwork")
      return
    }

    router.push(`/artwork/${artworkSlug}`)
  }, [artworkSlug, router])

  return returnToArtwork
}
