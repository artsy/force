import { useSystemContext } from "v2/System"
import { Variant } from "unleash-client"
import { ActionType } from "@artsy/cohesion"
import { formatOwnerTypes } from "lib/getContextPage"
import { useRouter } from "./Router/useRouter"

export type FeatureFlags = Record<string, FeatureFlagDetails>

interface FeatureFlagDetails {
  flagEnabled: boolean
  variant: Variant
}

interface VariantTrackingProperties {
  experimentName: string
  variantName: string
  payload?: string
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

export function useTrackFeatureVariant({
  experimentName,
  variantName,
  payload,
}: VariantTrackingProperties) {
  const router = useRouter()

  const trackFeatureVariant = () => {
    // HACK: Temporary hack while we refactor useAnalyticsContext
    // to update upon page navigation.
    const path = router.match.location.pathname
    const pageParts = path.split("/")
    const pageSlug = pageParts[2]
    const pageType = formatOwnerTypes(path)

    const trackFeatureView = shouldTrack(experimentName, variantName)

    if (trackFeatureView) {
      // HACK: We are using window.analytics.track over trackEvent from useTracking because
      // the trackEvent wasn't behaving as expected, it was never firing the event and
      // moving to using the solution below fixed the issue.
      window?.analytics?.track(ActionType.experimentViewed, {
        service: "unleash",
        experiment_name: experimentName,
        variant_name: variantName,
        payload,
        context_owner_type: pageType,
        context_owner_slug: pageSlug,
      })
    }
  }

  return { trackFeatureVariant }
}

export function shouldTrack(featureName: string, variantName: string): boolean {
  // Value to set and read from the experimentsViewed key in localStorage.
  const experimentName = `${featureName}:${variantName}`
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
