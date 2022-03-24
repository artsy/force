import { useSystemContext, useTracking } from "v2/System"
import { Variant } from "unleash-client"

import { useEffect } from "react"
import { ActionType, OwnerType } from "@artsy/cohesion"

export type FeatureFlags = Record<string, FeatureFlagDetails>

interface FeatureFlagDetails {
  flagEnabled: boolean
  variant: Variant
}

interface VariantTrackingProperties {
  experimentName: string
  variantName: string
  payload?: string
  contextOwnerType: OwnerType
  contextOwnerId?: string
  contextOwnerSlug?: string
  shouldTrackExperiment?: boolean
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
  experimentName,
  variantName,
  payload,
  contextOwnerType,
  contextOwnerId,
  contextOwnerSlug,
  shouldTrackExperiment = true,
}: VariantTrackingProperties) {
  const { trackEvent } = useTracking()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const trackFeatureView = shouldTrack(experimentName, variantName)

      if (trackFeatureView && shouldTrackExperiment) {
        trackEvent({
          action: ActionType.experimentViewed,
          service: "unleash",
          experiment_name: experimentName,
          variant_name: variantName,
          payload,
          context_owner_type: contextOwnerType,
          context_owner_id: contextOwnerId,
          context_owner_slug: contextOwnerSlug,
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
  try {
    window.localStorage.setItem(
      "experimentsViewed",
      JSON.stringify(experiments)
    )
  } catch (error) {
    console.error(
      "[Force] Error: unable to set experimentsViewed on local storage: ",
      error
    )
  }
}
