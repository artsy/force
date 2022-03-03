import { useSystemContext } from "v2/System"
import { Variant } from "unleash-client"

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

export function useFeatureVariant(featureName: string): Variant | null {
  const { featureVariants } = useSystemContext()
  const errorObject = {
    enabled: false,
    name: "false",
  }

  if (!featureVariants) {
    console.error("[Force] Error: no argument passed into useFeatureVariant")
    return errorObject
  }

  if (!featureName) {
    console.error("[Force] Error: no argument passed into useFeatureVariant")
    return errorObject
  }

  if (!featureVariants[featureName]) {
    console.error(
      "[Force] Error: the variant can't be found on featureVariants"
    )
    return errorObject
  }

  return featureVariants[featureName]
}