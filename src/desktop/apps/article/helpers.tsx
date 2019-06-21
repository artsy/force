import { get } from "lodash"
/**
 * For now ads, served by Hashtag Labs are only to viewable in the following instances:
 *  1) When the environment is NOT Production (HASHTAG_LAB_ADS_ENABLED set to false)
 */

export const areThirdPartyAdsEnabled = (sd: {}): boolean => {
  const areThirdPartyAdsEnabled = get(sd, "HASHTAG_LAB_ADS_ENABLED", false)

  return areThirdPartyAdsEnabled
}

// Helper method to determine how frequently ads should be rendered in Article components
export const shouldAdRender = (
  index: number,
  startIndex: number,
  frequency: number,
  articleType: string = null
): boolean => {
  // for Featured and Standard articles always return true
  if (articleType === "feature" || articleType === "standard") {
    return true
  }

  let position = index - startIndex
  return Math.abs(position) % frequency === 0
}
