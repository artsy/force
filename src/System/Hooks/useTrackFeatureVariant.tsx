import { ActionType } from "@artsy/cohesion"
import { pathToOwnerType } from "System/Contexts/AnalyticsContext"
import { useRouter } from "System/Hooks/useRouter"
import { useEffect, useRef } from "react"

interface VariantTrackingProperties {
  experimentName: string
  variantName: string
  payload?: string
}

export function useTrackFeatureVariant({
  experimentName,
  variantName,
  payload,
}: VariantTrackingProperties) {
  const router = useRouter()
  const experimentViewTrackedForPath = useRef<string | null>(null)

  const trackFeatureVariant = () => {
    // HACK: Temporary hack while we refactor useAnalyticsContext
    // to update upon page navigation.
    const path = router?.match?.location?.pathname ?? ""

    if (!path) return

    const pageParts = path.split("/")
    const pageSlug = pageParts[2]
    const pageType = pathToOwnerType(path)

    if (
      experimentViewTrackedForPath.current !== path &&
      variantName !== "disabled"
    ) {
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

      experimentViewTrackedForPath.current = path
    }
  }

  return { trackFeatureVariant }
}

export const useTrackFeatureVariantOnMount = (
  props: Omit<VariantTrackingProperties, "variantName"> & {
    variantName?: string
  },
) => {
  const router = useRouter()
  const pathname = router?.match?.location?.pathname ?? ""

  const { trackFeatureVariant } = useTrackFeatureVariant({
    ...props,
    variantName: props.variantName ?? "",
  })

  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return
    if (props.variantName === "disabled") return
    if (lastTrackedPath.current === pathname) return

    trackFeatureVariant()
    lastTrackedPath.current = pathname
  }, [trackFeatureVariant, props.variantName, pathname])
}
