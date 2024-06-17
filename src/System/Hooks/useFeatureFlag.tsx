import { ActionType } from "@artsy/cohesion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Variant } from "unleash-client"
import { getENV } from "Utils/getENV"
import { pathToOwnerType } from "System/Contexts/AnalyticsContext"
import { useRef } from "react"
import { useRouter } from "System/Hooks/useRouter"

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
      `[Force] Warning: cannot find ${featureName} in featureFlags: `,
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

export const getFeatureFlag = (featureName: string): boolean | null => {
  const featureFlags = getENV("FEATURE_FLAGS")
  const flagEnabled = featureFlags?.[featureName]?.flagEnabled

  if (flagEnabled === undefined) {
    warnInDevelopment(
      `[Force] Warning: cannot find ${featureName} in featureFlags: `,
      featureFlags
    )

    return null
  }

  return flagEnabled
}

export function useTrackFeatureVariant({
  experimentName,
  variantName,
  payload,
}: VariantTrackingProperties) {
  const router = useRouter()
  const experimentViewTracked = useRef<boolean>(false)

  const trackFeatureVariant = () => {
    // HACK: Temporary hack while we refactor useAnalyticsContext
    // to update upon page navigation.
    const path = router.match.location.pathname

    if (!path) return

    const pageParts = path.split("/")
    const pageSlug = pageParts[2]
    const pageType = pathToOwnerType(path)

    if (!experimentViewTracked.current && variantName !== "disabled") {
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

      experimentViewTracked.current = true
    }
  }

  return { trackFeatureVariant }
}

const warnInDevelopment = (...args: Parameters<typeof console.warn>) => {
  if (getENV("NODE_ENV") === "development") {
    console.warn(...args)
  }
}
