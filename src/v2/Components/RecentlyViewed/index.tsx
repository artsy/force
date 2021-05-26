import React from "react"
import { useThemeConfig } from "@artsy/palette"
import { RecentlyViewedV2QueryRenderer } from "./RecentlyViewedV2"
import { RecentlyViewedQueryRenderer } from "./RecentlyViewed"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { RecentlyViewedV2Placeholder } from "./RecentlyViewedV2Placeholder"
import { RecentlyViewedPlaceholder } from "./RecentlyViewedPlaceholder"
import { useSystemContext } from "v2/Artsy"

export const RecentlyViewed: React.FC = () => {
  const { user } = useSystemContext()

  const { Component, Placeholder } = useThemeConfig({
    v2: {
      Component: RecentlyViewedV2QueryRenderer,
      Placeholder: RecentlyViewedV2Placeholder,
    },
    v3: {
      Component: RecentlyViewedQueryRenderer,
      Placeholder: RecentlyViewedPlaceholder,
    },
  })

  const { isEnteredView, Waypoint } = useLazyLoadComponent({ threshold: 1000 })

  if (!user) return null

  return (
    <>
      <Waypoint />

      {isEnteredView ? <Component /> : <Placeholder />}
    </>
  )
}
