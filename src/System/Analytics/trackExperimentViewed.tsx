import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { data as sd } from "sharify"

export const trackExperimentViewed = (name: string, trackingData = {}) => {
  if (typeof window.analytics !== "undefined") {
    const variation = sd[name.toUpperCase()]
    if (!Boolean(variation)) {
      return console.warn(`experiment value for ${name} not found, skipping`)
    }

    window.analytics.track(
      DeprecatedSchema.ActionType.ExperimentViewed,
      {
        experiment_id: name,
        experiment_name: name,
        variation_id: variation,
        variation_name: variation,
        nonInteraction: 1,
      },
      {
        page: {
          ...trackingData,
        },
      }
    )
  }
}
