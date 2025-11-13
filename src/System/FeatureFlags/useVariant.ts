/** biome-ignore-all lint/correctness/useHookAtTopLevel: This is our wrapper */

import { useSystemContext } from "System/Hooks/useSystemContext"
// biome-ignore lint/style/noRestrictedImports: Feature flag wrapper implementation
import { useVariant as useUnleashVariant } from "@unleash/proxy-client-react"

export function useVariant(flagName: string) {
  const systemContext = useSystemContext()

  if (typeof window === "undefined") {
    return (
      systemContext.featureFlags?.getVariant(flagName) ?? {
        name: "disabled",
        enabled: false,
      }
    )
  }

  return useUnleashVariant(flagName)
}
