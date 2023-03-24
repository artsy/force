import { useFeatureFlag } from "System/useFeatureFlag"

export const useLinkToSaves = () => {
  const isArtworksListEnabled = useFeatureFlag("force-enable-artworks-list")

  if (isArtworksListEnabled) {
    return "/collector-profile/saves2"
  }

  return "/collector-profile/saves"
}
