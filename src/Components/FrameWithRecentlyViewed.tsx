import { Flex, Spacer } from "@artsy/palette"
import * as React from "react"
import { RecentlyViewed } from "Components/RecentlyViewed"

export interface FrameWithRecentlyViewedProps {
  name?: string
}

export const FrameWithRecentlyViewed: React.FC<FrameWithRecentlyViewedProps> = ({
  children,
}) => {
  return (
    <Flex flexDirection="column">
      {children}

      <Spacer mt={6} />

      <RecentlyViewed />
    </Flex>
  )
}
