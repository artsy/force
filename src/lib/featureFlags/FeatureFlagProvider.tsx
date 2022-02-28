import { useSystemContext } from "v2/System"

export type EnabledFeatureFlags = Record<string, boolean>

export function useFeatureFlag(flagName) {
  const { featureFlags } = useSystemContext()
  if (featureFlags === undefined) {
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider")
  }

  if (!flagName) {
    return null
  }

  return Object.keys(featureFlags).indexOf(flagName) !== -1 && featureFlags[flagName]
}
