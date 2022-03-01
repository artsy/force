import { useSystemContext } from "v2/System"

export type EnabledFeatureFlags = Record<string, boolean>

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
    Object.keys(featureFlags).indexOf(flagName) !== -1 && featureFlags[flagName]
  )
}
