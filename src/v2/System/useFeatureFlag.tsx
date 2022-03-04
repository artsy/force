import { useSystemContext } from "v2/System"
import { Variant } from "unleash-client"

export type FeatureFlags = Record<string, FeatureFlagDetails>

interface FeatureFlagDetails {
  flagEnabled: boolean
  variant: Variant
}

export function useFeatureFlag(flagName: string): boolean | null {
  const { featureFlags } = useSystemContext()

  if (featureFlags === undefined) {
    console.error("[Force] Error: featureFlags is undefined in SystemContext")
    return null
  }

  if (!flagName) {
    console.error("[Force] Error: no argument passed into useFeatureFlag")
    return null
  }

  return (
    Object.keys(featureFlags).indexOf(flagName) !== -1 &&
    featureFlags[flagName].flagEnabled
  )
}

export function useFeatureVariant(featureName: string): Variant {
  const { featureFlags } = useSystemContext()
  const errorObject = {
    enabled: false,
    name: "false",
  }

  if (featureFlags === undefined) {
    console.error(
      "[Force] Error: featureFlags is undefined in SystemContext in UseFeatureVariant"
    )
    return errorObject
  }

  if (!featureName) {
    console.error("[Force] Error: no argument passed into useFeatureVariant")
    return errorObject
  }

  if (!featureFlags[featureName]) {
    console.error("[Force] Error: the variant can't be found on featureFlags")
    return errorObject
  }

  return featureFlags[featureName].variant
}
