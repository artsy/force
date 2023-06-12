import { useFeatureFlag } from "System/useFeatureFlag"

export const useCheckIfArtworkListsEnabled = () => {
  const isFeatureFlagEnabled = useFeatureFlag("force-enable-artworks-list")
  return isFeatureFlagEnabled
}
