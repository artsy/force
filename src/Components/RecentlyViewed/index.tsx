import * as React from "react"
import { RecentlyViewedQueryRenderer } from "./RecentlyViewed"
import { useSystemContext } from "System/useSystemContext"

export const RecentlyViewed: React.FC = () => {
  const { user } = useSystemContext()
  if (!user) return null
  return <RecentlyViewedQueryRenderer />
}
