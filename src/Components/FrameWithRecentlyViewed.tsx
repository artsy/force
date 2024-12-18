import { Flex, Spacer } from "@artsy/palette"
import type * as React from "react"
import { RecentlyViewed } from "Components/RecentlyViewed"

export interface FrameWithRecentlyViewedProps {
  name?: string
}

export const FrameWithRecentlyViewed: React.FC<
  React.PropsWithChildren<FrameWithRecentlyViewedProps>
> = ({ children }) => {
  return (
    <Flex flexDirection="column">
      {children}

      <Spacer y={6} />

      <RecentlyViewed />
    </Flex>
  )
}
