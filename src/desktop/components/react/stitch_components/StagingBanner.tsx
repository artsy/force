import React from "react"
import { Banner } from "@artsy/palette"
import { data as sd } from "sharify"

export const StagingBanner = () => {
  return (
    <Banner
      backgroundColor="purple100"
      message={sd.APP_URL.replace("https://", "").replace("http://", "")}
    />
  )
}
