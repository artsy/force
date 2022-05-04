import React, { FC, useEffect } from "react"
import { useRouter } from "v2/System/Router/useRouter"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

export const NewForYouApp: FC = () => {
  const featureFlagEnabled = useFeatureFlag("new_for_you")
  const { router } = useRouter()

  useEffect(() => {
    if (!featureFlagEnabled) {
      router.replace("/")
    }
  })

  return <>NewForYouApp</>
}
