import { useSystemContext } from "System/Hooks/useSystemContext"
import type * as React from "react"
import { RecentlyViewedQueryRenderer } from "./RecentlyViewed"

export const RecentlyViewed: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { user } = useSystemContext()
  if (!user) return null
  return <RecentlyViewedQueryRenderer />
}
