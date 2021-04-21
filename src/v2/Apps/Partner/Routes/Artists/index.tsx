import React from "react"
import { Box, Text } from "@artsy/palette"
import { Match } from "found"
import {
  PartnerArtistDetailsListRenderer,
  PartnerArtistDetailsRenderer,
  PartnerArtistsPaginationContainer,
} from "../../Components/PartnerArtists"
import { Artists_partner } from "v2/__generated__/Artists_partner.graphql"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { PARTHER_NAV_BAR_HEIGHT } from "../../Components/NavigationTabs"
import { graphql } from "lib/graphql"
import { createFragmentContainer } from "react-relay"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

export interface ArtistsRouteProps {
  partner: Artists_partner
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  const navBarHeight = useNavBarHeight()

  const handleArtistClick = () => {
    const offset = PARTHER_NAV_BAR_HEIGHT + navBarHeight + 20

    scrollIntoView({
      offset: offset,
      selector: "#jump--PartnerArtistDetails",
    })
  }

  return (
    <Box mt={4}>
      <Text variant="title" mb={6}>
        Artists
      </Text>

      <PartnerArtistsPaginationContainer
        onArtistClick={handleArtistClick}
        partner={partner}
      />

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
