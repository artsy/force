import { Box, Button, Flex, Separator, Spacer, Text } from "@artsy/palette"
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
  const { registrationEndsAt } = artwork.sale ?? {}
  const shouldDisplayTimer = !!registrationEndsAt
  const href = `/auction-registration/${artwork.sale?.slug}`

  if (shouldDisplayTimer) {
    return (
      <Box>
        <Separator my={1} />
        <Flex
          flexDirection={["column", "row"]}
          alignItems={["flex-start", "center"]}
          justifyContent="space-between"
        >
          <Box>
            <Text variant="xs" color="black60">
              Registration for this auction ends:
            </Text>
            <Timer variant="xs" color="black100" endDate={registrationEndsAt} />
          </Box>

          <Spacer y={1} x={1} />

          <Button
            // @ts-ignore
            as={RouterLink}
            to={href}
            size="small"
          >
            Register to Bid
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <Box>
      <Spacer y={1} />
      <Button
        // @ts-ignore
        as={RouterLink}
        to={href}
        size="small"
      >
        Register to Bid
      </Button>
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
