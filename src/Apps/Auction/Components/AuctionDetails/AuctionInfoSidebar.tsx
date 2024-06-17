import { Box, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { LiveAuctionToolTip } from "./LiveAuctionToolTip"
import { AuctionInfoSidebar_sale$data } from "__generated__/AuctionInfoSidebar_sale.graphql"

interface AuctionInfoSidebarProps {
  sale: AuctionInfoSidebar_sale$data
}

const AuctionInfoSidebar: React.FC<AuctionInfoSidebarProps> = ({ sale }) => {
  return (
    <Join separator={<Spacer y={2} />}>
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

      <Box>
        <Text variant="sm">
          Have a work you want to sell?
          <br />
          Submit to our team{" "}
          <RouterLink inline to="/sell" target="_blank">
            here
          </RouterLink>
        </Text>
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
