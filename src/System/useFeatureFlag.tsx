import { ActionType } from "@artsy/cohesion"
import { formatOwnerTypes } from "Server/getContextPage"
import { useSystemContext } from "System/useSystemContext"
import { Variant } from "unleash-client"
import { getENV } from "Utils/getENV"
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

interface DisabledVariant {
  enabled: false
  name: "disabled"
}

export function useFeatureFlag(featureName: string): boolean | null {
  const { featureFlags } = useSystemContext()
  const flagEnabled = featureFlags?.[featureName]?.flagEnabled

  if (flagEnabled === undefined) {
    warnInDevelopment(
      "[Force] Warning: cannot find flagName in featureFlags: ",
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
    warnInDevelopment(
      "[Force] Warning: cannot find variant on featureFlags: ",
      featureFlags
    )

    return null
  }

  return variant
}

export const getFeatureVariant = (
  featureName: string
): Variant | DisabledVariant | null => {
  const featureFlags = getENV("FEATURE_FLAGS")
  const variant = featureFlags?.[featureName]?.variant

  if (!variant) {
    warnInDevelopment(
      "[Force] Warning: cannot find variant on featureFlags: ",
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

    if (trackFeatureView && variantName !== "disabled") {
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

const warnInDevelopment = (...args: Parameters<typeof console.warn>) => {
  if (getENV("NODE_ENV") === "development") {
    console.warn(...args)
  }
}
