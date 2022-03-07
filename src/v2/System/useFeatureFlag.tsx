import * as Schema from "v2/System/Analytics"
import { useSystemContext } from "v2/System"
import { Variant } from "unleash-client"
import { useTracking } from "react-tracking"

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
  const { trackEvent } = useTracking()
  const variant = featureFlags?.[featureName]?.variant

  if (!variant) {
    console.error(
      "[Force] Error: cannot find variant on featureFlags: ",
      featureFlags
    )
    return null
  }

  // detremine if we should track the experimentView
  if (typeof window !== "undefined") {
    let trackFeatureView = maybeTrackFeatureView(featureName, variant.name)

    if (trackFeatureView) {
      trackEvent({
        action: Schema.ActionType.ExperimentViewed,
        service: "unleash",
        experiment_name: featureName,
        variant_name: variant.name,
        payload: variant.payload,
      })
    }
  }

  return variant
}

function maybeTrackFeatureView(featureName, variantName) {
  const experimentName = `${featureName}+${variantName}`
  let viewedExperiments = getExperimentsViewed()

  if (viewedExperiments.includes(experimentName)) {
    return false
  }

  viewedExperiments.push(experimentName)
  setExperimentsViewed(viewedExperiments)

  return true
}

function getExperimentsViewed() {
  let experimentsViewed = window.localStorage.getItem("experimentsViewed")

  return experimentsViewed === null ? [] : JSON.parse(experimentsViewed)
}

function setExperimentsViewed(_viewedExperiments) {
  window.localStorage.setItem(
    "experimentsViewed",
    JSON.stringify(_viewedExperiments)
  )
}
