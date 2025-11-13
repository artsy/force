import { HomeAuctionLotsForYouRailQueryRenderer } from "Apps/Home/Components/HomeAuctionLotsForYouRail"
import { HomeAuctionLotsRailQueryRenderer } from "Apps/Home/Components/HomeAuctionLotsRail"
import { trackEvent } from "Server/analytics/helpers"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Flex, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import type * as React from "react"

export const HomeAuctionLotsTabBar: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { user } = useSystemContext()

  return (
    <>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1} mr={1}>
          <Text variant="lg-display">At Auction</Text>
        </Flex>

        <RouterLink
          to="/auctions"
          onClick={() => {
            const trackingEvent: ClickedArtworkGroup = {
              action: ActionType.clickedArtworkGroup,
              context_module: ContextModule.auctionLots,
              context_page_owner_type: OwnerType.home,
              destination_page_owner_type: OwnerType.auctions,
              type: "viewAll",
            }
            trackEvent(trackingEvent)
          }}
        >
          <Text variant="sm" mt={0.5}>
            View All Auctions
          </Text>
        </RouterLink>
      </Flex>
      <Spacer y={4} />
      <Tabs>
        {!user ? null : (
          <Tab name="Lots for You">
            <HomeAuctionLotsForYouRailQueryRenderer />
          </Tab>
        )}
        <Tab name="Curators’ Picks">
          <HomeAuctionLotsRailQueryRenderer />
        </Tab>
      </Tabs>
    </>
  )
}
