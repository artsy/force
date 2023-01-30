import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"

const FEATURE_FLAG_NAME = "auth-page"

export const useAuthPage = () => {
  const {
    match: { location },
  } = useRouter()

  return (
    useFeatureFlag(FEATURE_FLAG_NAME) ||
    location.search.includes("authPage=enabled")
  )
}
