import { useVariant as useUnleashVariant } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

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
