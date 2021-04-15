import { Flex } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
// import { useSystemContext } from "v2/Artsy"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"

import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"

export interface Props {
  name?: string
}

export const FrameWithRecentlyViewed: React.SFC<Props> = ({ children }) => {
  // const { isEigen } = useSystemContext()
  // const showFooter = !isEigen

  return (
    <HorizontalPadding>
      <Flex flexDirection="column">
        {children}

        {typeof window !== "undefined" && (
          <LazyLoadComponent threshold={1000}>
            <RecentlyViewed />
          </LazyLoadComponent>
        )}
      </Flex>
    </HorizontalPadding>
  )
}
