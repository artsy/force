import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistsRail_partner } from "v2/__generated__/ArtistsRail_partner.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerArtistsPaginationContainer } from "../PartnerArtists"

interface ArtistsRailProps {
  partner: ArtistsRail_partner
}

const ArtistsRail: React.FC<ArtistsRailProps> = ({ partner }) => {
  return (
    <Box mt={4} mb={[4, 80]}>
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <Text variant="title">Artists</Text>
        <RouterLink to={`/partner2/${partner.slug}/artists`}>
          <Text variant="text" color="black">
            View all
          </Text>
        </RouterLink>
      </Flex>

      <PartnerArtistsPaginationContainer partner={partner} />
    </Box>
  )
}

export const ArtistsRailFragmentContainer = createFragmentContainer(
  ArtistsRail,
  {
    partner: graphql`
      fragment ArtistsRail_partner on Partner {
        slug
        profileArtistsLayout
        ...PartnerArtists_partner
      }
    `,
  }
)
