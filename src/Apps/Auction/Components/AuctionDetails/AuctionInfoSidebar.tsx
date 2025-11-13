import { RouterLink } from "System/Components/RouterLink"
import { useSaleWebsocket } from "Utils/Hooks/useSaleWebsocket"
import { Box, Join, Spacer, Text } from "@artsy/palette"
import type { AuctionInfoSidebar_sale$data } from "__generated__/AuctionInfoSidebar_sale.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { LiveAuctionToolTip } from "./LiveAuctionToolTip"

interface AuctionInfoSidebarProps {
  sale: AuctionInfoSidebar_sale$data
}

const AuctionInfoSidebar: React.FC<
  React.PropsWithChildren<AuctionInfoSidebarProps>
> = ({ sale }) => {
  const totalRaisedDisplay = sale.totalRaised?.display
  const [updatedTotalRaisedDisplay, setUpdatedTotalRaisedDisplay] =
    useState(totalRaisedDisplay)

  useSaleWebsocket({
    saleID: sale.internalID as string,
    onChange: data => {
      setUpdatedTotalRaisedDisplay(data.total_raised_display)
    },
  })

  return (
    <Join separator={<Spacer y={2} />}>
      {!sale.hideTotal && sale.totalRaised?.minor > 0 && (
        <Box>
          <Text variant="sm">Bid Total</Text>
          <Text variant="sm" fontWeight="bold">
            {updatedTotalRaisedDisplay}
          </Text>
        </Box>
      )}

      <LiveAuctionToolTip show={!!sale.liveStartAt} />

      <Box>
        <Text variant="sm">Questions?</Text>

        <RouterLink inline to="/how-auctions-work" target="_blank">
          <Text variant="sm">How to bid on Artsy</Text>
        </RouterLink>
      </Box>

      <Box>
        <Text variant="sm">Contact Us</Text>

        <RouterLink inline to="mailto:specialist@artsy.net">
          <Text variant="sm">specialist@artsy.net</Text>
        </RouterLink>
      </Box>

      <Box>
        <Text variant="sm">More Information</Text>

        <RouterLink inline to="/terms" target="_blank">
          <Text variant="sm">Terms</Text>
        </RouterLink>
        <RouterLink inline to="/supplemental-cos" target="_blank">
          <Text variant="sm">Supplemental Conditions of Sale</Text>
        </RouterLink>
      </Box>
    </Join>
  )
}

export const AuctionInfoSidebarFragmentContainer = createFragmentContainer(
  AuctionInfoSidebar,
  {
    sale: graphql`
      fragment AuctionInfoSidebar_sale on Sale {
        internalID
        liveStartAt
        hideTotal
        totalRaised {
          minor
          display
        }
      }
    `,
  }
)
