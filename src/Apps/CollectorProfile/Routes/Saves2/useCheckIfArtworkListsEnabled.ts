import { useSystemContext } from "System/SystemContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { isArtsyEmail } from "Utils/isArtsyEmail"

export const useCheckIfArtworkListsEnabled = () => {
  const isFeatureFlagEnabled = useFeatureFlag("force-enable-artworks-list")
  const { user } = useSystemContext()
  const isArtsyEmployee = isArtsyEmail(user?.email ?? "")
  const isIntegrityUser = user?.email === "cypress+test@example.com"

  return isFeatureFlagEnabled && (isArtsyEmployee || isIntegrityUser)
}
