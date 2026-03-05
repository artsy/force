import { useVariant } from "@unleash/proxy-client-react"
import { CHECKOUT_REDESIGN_FLAG } from "Apps/Order/redirects"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import type * as React from "react"

export const Order2App: React.FC<React.PropsWithChildren> = ({ children }) => {
  const variant = useVariant(CHECKOUT_REDESIGN_FLAG)

  useTrackFeatureVariantOnMount({
    experimentName: CHECKOUT_REDESIGN_FLAG,
    variantName: variant?.name,
  })

  return children
}
