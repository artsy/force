import { Timer } from "Components/Timer"
import { RouterLink } from "System/Components/RouterLink"
import { Box, Button, Flex, Separator, Spacer, Text } from "@artsy/palette"
import type { ArtworkAuctionRegistrationPanel_artwork$data } from "__generated__/ArtworkAuctionRegistrationPanel_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkAuctionRegistrationPanelProps {
  artwork: ArtworkAuctionRegistrationPanel_artwork$data
}

const ArtworkAuctionRegistrationPanel: React.FC<
  React.PropsWithChildren<ArtworkAuctionRegistrationPanelProps>
> = ({ artwork }) => {
  const isCountingDown = !!artwork.sale?.registrationEndsAt
  const href = `/auction-registration/${artwork.sale?.slug}`
  const title = isCountingDown
    ? "Register ahead of time to bid in this auction and get notifications for this lot."
    : "Register to bid in this auction and get notifications for this lot."

  if (isCountingDown) {
    return (
      <Box>
        <Text variant="sm-display">{title}</Text>

        <Separator my={1} />

        <Flex
          flexDirection={["column", "row"]}
          alignItems={["flex-start", "center"]}
          justifyContent="space-between"
        >
          <Box>
            <Text variant="xs" color="mono60">
              Registration for this auction ends:
            </Text>

            <Timer
              variant="xs"
              color="mono100"
              endDate={artwork.sale?.registrationEndsAt}
            />
          </Box>

          <Spacer y={1} x={1} />

          <Button
            // @ts-expect-error
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
      <Text variant="sm-display">{title}</Text>

      <Spacer y={1} />

      <Button
        // @ts-expect-error
        as={RouterLink}
        to={href}
        size="small"
      >
        Register to Bid
      </Button>
    </Box>
  )
}

export const ArtworkAuctionRegistrationPanelFragmentContainer =
  createFragmentContainer(ArtworkAuctionRegistrationPanel, {
    artwork: graphql`
      fragment ArtworkAuctionRegistrationPanel_artwork on Artwork {
        sale {
          slug
          registrationEndsAt
          isRegistrationClosed
        }
      }
    `,
  })
