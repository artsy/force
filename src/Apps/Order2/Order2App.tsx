import { useVariant } from "@unleash/proxy-client-react"
import { CHECKOUT_REDESIGN_FLAG } from "Apps/Order/redirects"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"
import { useRouter } from "System/Hooks/useRouter"
import { type FC, type PropsWithChildren, useEffect, useRef } from "react"

let navigationGuardsEnabled = true

export const setNavigationGuardsEnabled = (enabled: boolean) => {
  navigationGuardsEnabled = enabled
}

export const preventHardReload = (event: BeforeUnloadEvent) => {
  if (!navigationGuardsEnabled) {
    return
  }

  // Don't block navigation for details page, as we've completed the flow
  if (window.location.pathname.includes("/details")) {
    return false
  }

  event.preventDefault()
  event.returnValue = true
}

export const Order2App: FC<PropsWithChildren> = ({ children }) => {
  const variant = useVariant(CHECKOUT_REDESIGN_FLAG)

  useTrackFeatureVariantOnMount({
    experimentName: CHECKOUT_REDESIGN_FLAG,
    variantName: variant?.name,
  })

  const { router, match } = useRouter()

  const removeNavigationListenerRef = useRef<null | (() => void)>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time setup
  useEffect(() => {
    navigationGuardsEnabled = true

    if (!removeNavigationListenerRef.current) {
      removeNavigationListenerRef.current =
        router.addNavigationListener(handleTransition())
    }

    window.addEventListener("beforeunload", preventHardReload)

    return () => {
      if (removeNavigationListenerRef.current) {
        removeNavigationListenerRef.current()
        removeNavigationListenerRef.current = null
      }
      window.removeEventListener("beforeunload", preventHardReload)
    }
  }, [])

  const handleTransition =
    () => (newLocation: { pathname?: string; action?: string } | null) => {
      if (!navigationGuardsEnabled) {
        return true
      }

      // Regex to test for both 'orders' and 'orders2' pages
      // as we plan to do a staged release where Order and Order2
      // will exist in parallel in production for some time
      const isToTheSameApp = /\/orders?2?\//.test(newLocation?.pathname ?? "")
      const isRedirect = newLocation?.action === "PUSH"

      if (isToTheSameApp || isRedirect) {
        return true
      }

      // leaving the order page, closing, or refreshing
      const route = findCurrentRoute(match)

      if (route?.shouldWarnBeforeLeaving) {
        return "Are you sure you want to leave? Your changes will not be saved."
      }

      return true
    }

  return children
}
