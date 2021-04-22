import React from "react"
import { Box, Text } from "@artsy/palette"
import { Match } from "found"
import {
  PartnerArtistDetailsListRenderer,
  PartnerArtistDetailsRenderer,
  PartnerArtistsPaginationContainer,
} from "../../Components/PartnerArtists"
import { Artists_partner } from "v2/__generated__/Artists_partner.graphql"
import { PARTNER_NAV_BAR_HEIGHT } from "../../Components/NavigationTabs"
import { graphql } from "lib/graphql"
import { createFragmentContainer } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"

export interface ArtistsRouteProps {
  partner: Artists_partner
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  return (
    <Box mt={4}>
      <Text variant="title" mb={6}>
        Artists
      </Text>

      <Media greaterThan="xs">
        <PartnerArtistsPaginationContainer
          scrollTo={{
            selector: "#jump--PartnerArtistDetails",
            offset: PARTNER_NAV_BAR_HEIGHT + NAV_BAR_HEIGHT + 20,
          }}
          partner={partner}
        />
      </Media>
      <Media at="xs">
        <PartnerArtistsPaginationContainer
          scrollTo={{
            selector: "#jump--PartnerArtistDetails",
            offset: PARTNER_NAV_BAR_HEIGHT + MOBILE_NAV_HEIGHT + 20,
          }}
          partner={partner}
        />
      </Media>

      {match.params.artistId ? (
        <PartnerArtistDetailsRenderer
          partnerId={match.params.partnerId}
          artistId={match.params.artistId}
        />
      ) : (
        <PartnerArtistDetailsListRenderer partnerId={match.params.partnerId} />
      )}
    </Box>
  )
}

export const ArtistsRouteFragmentContainer = createFragmentContainer(
  ArtistsRoute,
  {
    partner: graphql`
      fragment Artists_partner on Partner {
        ...PartnerArtists_partner
      }
    `,
  }
)
