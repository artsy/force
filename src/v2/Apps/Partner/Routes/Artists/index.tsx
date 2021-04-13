import React from "react"
import { Box, Text, themeProps } from "@artsy/palette"
import { Match } from "found"
import {
  PartnerArtistDetailsListRenderer,
  PartnerArtistDetailsRenderer,
  PartnerArtistsPaginationContainer,
} from "../../Components/PartnerArtists"
import { Artists_partner } from "v2/__generated__/Artists_partner.graphql"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { PARTHER_NAV_BAR_HEIGHT } from "../../Components/NavigationTabs"
import { graphql } from "lib/graphql"
import { createFragmentContainer } from "react-relay"

export interface ArtistsRouteProps {
  partner: Artists_partner
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  const handleArtistClick = () => {
    const offset =
      PARTHER_NAV_BAR_HEIGHT +
      (isMobile ? MOBILE_NAV_HEIGHT : NAV_BAR_HEIGHT) +
      20

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
