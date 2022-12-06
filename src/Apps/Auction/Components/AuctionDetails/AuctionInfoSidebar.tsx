import { Box, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { LiveAuctionToolTip } from "./LiveAuctionToolTip"
import { AuctionInfoSidebar_sale$data } from "__generated__/AuctionInfoSidebar_sale.graphql"

interface AuctionInfoSidebarProps {
  sale: AuctionInfoSidebar_sale$data
}

const AuctionInfoSidebar: React.FC<AuctionInfoSidebarProps> = ({ sale }) => {
  return (
    <Join separator={<Spacer y={1} />}>
      <LiveAuctionToolTip show={!!sale.liveStartAt} />

      <Box>
        <Text variant="sm">Questions?</Text>

        <RouterLink to="/how-auctions-work" target="_blank">
          <Text variant="sm">How to bid on Artsy?</Text>
        </RouterLink>
      </Box>

      <Box>
        <Text variant="sm">Contact Us</Text>

        <a href="mailto:specialist@artsy.net">
          <Text variant="sm">specialist@artsy.net</Text>
        </a>
        <Text variant="sm">+1-845-582-3967</Text>
      </Box>
    </Join>
  )
}

export const AuctionInfoSidebarFragmentContainer = createFragmentContainer(
  AuctionInfoSidebar,
  {
    sale: graphql`
      fragment AuctionInfoSidebar_sale on Sale {
        liveStartAt
      }
    `,
  }
)
