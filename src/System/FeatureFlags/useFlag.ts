import { useFlag as useUnleashFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

export function useFlag(flagName: string): boolean {
  const systemContext = useSystemContext()

  if (typeof window === "undefined") {
    return systemContext.featureFlags?.isEnabled(flagName) ?? false
  }

  return useUnleashFlag(flagName)
}
