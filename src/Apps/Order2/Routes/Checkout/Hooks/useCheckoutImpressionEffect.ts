import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useEffect } from "react"
import type { DependencyList, EffectCallback } from "react"

export const useCheckoutImpressionEffect = (
  effect: EffectCallback,
  deps: DependencyList,
) => {
  const { isLoading } = useCheckoutContext()

  // biome-ignore lint/correctness/useExhaustiveDependencies: effect deps are supplied by the caller
  useEffect(() => {
    if (isLoading) {
      return
    }

    return effect()
  }, [...deps, isLoading])
}
