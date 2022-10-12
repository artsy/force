import { Box, Button, Flex, Separator, Text } from "@artsy/palette"
import { Timer } from "Components/Timer"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkAuctionRegistrationPanel_artwork$data } from "__generated__/ArtworkAuctionRegistrationPanel_artwork.graphql"
import { RouterLink } from "System/Router/RouterLink"

interface ArtworkAuctionRegistrationPanelProps {
  artwork: ArtworkAuctionRegistrationPanel_artwork$data
}

const ArtworkAuctionRegistrationPanel: React.FC<ArtworkAuctionRegistrationPanelProps> = ({
  artwork,
}) => {
  return (
    <Box width={410}>
      <Separator my={1} />

      <Flex alignItems="center" justifyContent="space-between">
        <Box mr={1}>
          <Text variant="xs" color="black60">
            Registration for this auction ends:
          </Text>
          <Timer variant="xs" endDate={artwork.sale?.registrationEndsAt!} />
        </Box>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={`/auction-registration/${artwork.sale?.slug}`}
          size="small"
        >
          Register to Bid
        </Button>
      </Flex>
    </Box>
  )
}

export const ArtworkAuctionRegistrationPanelFragmentContainer = createFragmentContainer(
  ArtworkAuctionRegistrationPanel,
  {
    artwork: graphql`
      fragment ArtworkAuctionRegistrationPanel_artwork on Artwork {
        sale {
          slug
          registrationEndsAt
          isRegistrationClosed
        }
      }
    `,
  }
)
