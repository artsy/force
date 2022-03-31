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

export function useTrackVariantView({
  experimentName,
  variantName,
  payload,
}: VariantTrackingProperties) {
  const router = useRouter()

  const trackVariantView = () => {
    // HACK: Temporary hack while we refactor useAnalyticsContext
    // to update upon page navigation. Currently it requires a
    // context provider to be manually added as a parent component,
    // which doesn't support components used accross various pageTypes
    const path = router.match.location.pathname
    const pageParts = path.split("/")
    const pageSlug = pageParts[2]
    const pageType = formatOwnerTypes(path)

    const trackFeatureView = shouldTrack(experimentName, variantName)

    if (trackFeatureView) {
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

  return { trackVariantView }
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
