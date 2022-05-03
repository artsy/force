import React, { FC, useEffect } from "react"
import { navigate } from "@reach/router"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

const NewForYouApp: FC = () => {
  const featureFlagEnabled = useFeatureFlag("new_for_you")
  useEffect(() => {
    if (!featureFlagEnabled) {
      navigate("/")
    }
  })
  return <>NewForYouApp</>
}

export { NewForYouApp }
