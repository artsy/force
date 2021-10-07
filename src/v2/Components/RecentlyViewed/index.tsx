import React from "react"
import { useThemeConfig } from "@artsy/palette"
import { RecentlyViewedV2QueryRenderer } from "./RecentlyViewedV2"
import { RecentlyViewedQueryRenderer } from "./RecentlyViewed"
import { useSystemContext } from "v2/System"

export const RecentlyViewed: React.FC = () => {
  const { user } = useSystemContext()

  const { Component } = useThemeConfig({
    v2: {
      Component: RecentlyViewedV2QueryRenderer,
    },
    v3: {
      Component: RecentlyViewedQueryRenderer,
    },
  })

  if (!user) return null

  return <Component />
}
