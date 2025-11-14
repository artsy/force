/** biome-ignore-all lint/correctness/useHookAtTopLevel: This is our wrapper */

import { useSystemContext } from "System/Hooks/useSystemContext"
import { useFlag as useUnleashFlag } from "@unleash/proxy-client-react"

export function useFlag(flagName: string): boolean {
  const systemContext = useSystemContext()

  if (typeof window === "undefined") {
    return systemContext.featureFlags?.isEnabled(flagName) ?? false
  }

  return useUnleashFlag(flagName)
}
