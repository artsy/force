import { useEffect, useRef } from "react"
import { useCheckoutContext } from "./useCheckoutContext"
import type { CheckoutStepName } from "../CheckoutContext/types"

export const useScrollToErrorBanner = (stepName: CheckoutStepName) => {
  const { messages } = useCheckoutContext()
  const errorBannerRef = useRef<HTMLDivElement>(null)
  const error = messages[stepName]?.error

  useEffect(() => {
    if (error) {
      // Small delay to allow DOM to update with error content
      setTimeout(() => {
        errorBannerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }
  }, [error])

  return errorBannerRef
}
