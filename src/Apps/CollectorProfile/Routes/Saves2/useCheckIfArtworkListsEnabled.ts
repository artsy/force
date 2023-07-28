import { useFeatureFlag } from "System/useFeatureFlag"

export const useCheckIfArtworkListsEnabled = () => {
  return useFeatureFlag("force-enable-artworks-list")
}
