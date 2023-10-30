import {
  useFeatureVariant,
  useTrackFeatureVariant,
} from "System/useFeatureFlag"
import { useEffect } from "react"

const EXPERIMENT_NAME = "diamond_revised-artwork-filters"
const EXPERIMENT_VARIANTS = { enabled: "experiment", disabled: "control" }

export const useRevisedArtworkFilters = () => {
  const variant = useFeatureVariant(EXPERIMENT_NAME)

  const variantName = variant?.name || EXPERIMENT_VARIANTS.disabled

  const { trackFeatureVariant } = useTrackFeatureVariant({
    experimentName: EXPERIMENT_NAME,
    variantName,
  })

  useEffect(trackFeatureVariant, [trackFeatureVariant])

  return {
    experimentName: EXPERIMENT_NAME,
    variantName: variantName,
    enabled: variantName === EXPERIMENT_VARIANTS.enabled,
  }
}
