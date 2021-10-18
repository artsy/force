import React from "react"
import { RecentlyViewedQueryRenderer } from "./RecentlyViewed"
import { useSystemContext } from "v2/System"

export const RecentlyViewed: React.FC = () => {
  const { user } = useSystemContext()
  if (!user) return null
  return <RecentlyViewedQueryRenderer />
}
