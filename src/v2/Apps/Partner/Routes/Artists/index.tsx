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
import { PartnerArtistsLoadingContextProvider } from "../../Utils/PartnerArtistsLoadingContext"

export interface ArtistsRouteProps {
  partner: Artists_partner
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  const scrollIntoArtistDetails = () => {
    const offset =
      PARTHER_NAV_BAR_HEIGHT +
      (isMobile ? MOBILE_NAV_HEIGHT : NAV_BAR_HEIGHT) +
      20

    scrollIntoView({
      offset: offset,
      selector: "#jump--PartnerArtistDetails",
    })
  }

  const handleArtistsLoaded = () => {
    if (match.params.artistId) {
      scrollIntoArtistDetails()
    }
  }

  return (
    <PartnerArtistsLoadingContextProvider onArtistsLoaded={handleArtistsLoaded}>
      <Box mt={4}>
        <Text variant="title" mb={6}>
          Artists
        </Text>

        <PartnerArtistsPaginationContainer
          onArtistClick={scrollIntoArtistDetails}
          partner={partner}
        />

        {match.params.artistId ? (
          <PartnerArtistDetailsRenderer
            partnerId={match.params.partnerId}
            artistId={match.params.artistId}
          />
        ) : (
          <PartnerArtistDetailsListRenderer
            partnerId={match.params.partnerId}
          />
        )}
      </Box>
    </PartnerArtistsLoadingContextProvider>
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
