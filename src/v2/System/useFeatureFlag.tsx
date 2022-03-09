import * as Schema from "v2/System/Analytics"
import { useSystemContext } from "v2/System"
import { Variant } from "unleash-client"
import { useTracking } from "react-tracking"
import { useEffect } from "react"

export type FeatureFlags = Record<string, FeatureFlagDetails>

interface FeatureFlagDetails {
  flagEnabled: boolean
  variant: Variant
}

export function useFeatureFlag(featureName: string): boolean | null {
  const { featureFlags } = useSystemContext()
  const flagEnabled = featureFlags?.[featureName]?.flagEnabled

  if (flagEnabled === undefined) {
    console.error(
      "[Force] Error: cannot find flagName in featureFlags: ",
      featureFlags
    )
    return null
  }

  return flagEnabled
}

export function useFeatureVariant(featureName: string): Variant | null {
  const { featureFlags } = useSystemContext()
  const variant = featureFlags?.[featureName]?.variant

  if (!variant) {
    console.error(
      "[Force] Error: cannot find variant on featureFlags: ",
      featureFlags
    )
    return null
  }

  return variant
}

export function useTrackVariantView({
  experiment_name,
  variant_name,
  payload,
  context_owner_type,
  context_owner_id,
  context_owner_slug,
}) {
  const { trackEvent } = useTracking()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const trackFeatureView = shouldTrack(experiment_name, variant_name)

      if (trackFeatureView) {
        trackEvent({
          action: Schema.ActionType.ExperimentViewed,
          service: "unleash",
          experiment_name,
          variant_name,
          payload,
          context_owner_type,
          context_owner_id,
          context_owner_slug,
        })
      }
    }
  }, [])
}

function shouldTrack(featureName: string, variantName: string): boolean {
  // Value to set and read from the experimentsViewed key in localStorage.
  const experimentName = `${featureName}+${variantName}`
  const viewedExperiments = getExperimentsViewed()

  if (viewedExperiments.includes(experimentName)) {
    return false
  }

  viewedExperiments.push(experimentName)
  setExperimentsViewed(viewedExperiments)

  return true
}

function getExperimentsViewed(): string[] {
  let experimentsViewed = window.localStorage.getItem("experimentsViewed")

  return experimentsViewed === null ? [] : JSON.parse(experimentsViewed)
}

function setExperimentsViewed(experiments: string[]) {
  window.localStorage.setItem("experimentsViewed", JSON.stringify(experiments))
}
