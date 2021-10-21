import { Box, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { SettingsAuctionsRoute_me } from "v2/__generated__/SettingsAuctionsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { UserBidHistory } from "./Components/UserBidHistory"
import { UserRegistrationAuctions } from "./Components/UserRegistrationAuctions"
import { UserActiveBid } from "./Components/UserActiveBid"

interface SettingsAuctionsRouteProps {
  me: SettingsAuctionsRoute_me
}

const SettingsAuctionsRoute: React.FC<SettingsAuctionsRouteProps> = ({
  me,
}) => {
  const userLots = me?.lotStandings ?? []

  return (
    <>
      <Box
        id="user-active-bids"
        mt={16}
        mb={16}
        borderBottom="1px solid"
        borderColor="black10"
      >
        <Text variant={["sm", "lg"]} mt={4} mb={[2, 4]}>
          Active Bids
        </Text>

        {!userLots.length ? (
          <Text mb={2} color="black60" variant="sm">
            Nothing to Show
          </Text>
        ) : (
          <GridColumns mb={6}>
            {userLots.map((lot, i) => (
              <UserActiveBid
                key={lot?.activeBid?.id}
                lot={lot}
                shouldDisplayBorderBottom={i + 1 < userLots.length}
              />
            ))}
          </GridColumns>
        )}
      </Box>

      <Box
        id="user-bid-history"
        mt={16}
        mb={16}
        borderBottom="1px solid"
        borderColor="black10"
      >
        <Text variant={["sm", "lg"]} mt={4} mb={[2, 4]}>
          Bid History
        </Text>

        <UserBidHistory />
      </Box>

      <Box id="user-registeration-for-upcoming-auctions" mt={16} mb={16}>
        <Text variant={["sm", "lg"]} mt={4} mb={[2, 4]}>
          Registration for Upcoming Auctions
        </Text>

        <UserRegistrationAuctions />
      </Box>
    </>
  )
}

export const SettingsAuctionsRouteFragmentContainer = createFragmentContainer(
  SettingsAuctionsRoute,
  {
    me: graphql`
      fragment SettingsAuctionsRoute_me on Me {
        name
        lotStandings {
          isLeadingBidder
          activeBid {
            id
          }
          saleArtwork {
            lotLabel
            highestBid {
              display
            }
            counts {
              bidderPositions
            }
            artwork {
              title
              href
              image {
                url
              }
              artist {
                name
              }
            }
          }
        }
      }
    `,
  }
)
