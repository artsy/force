import React, { useEffect } from "react"
import { Box, Text, themeProps } from "@artsy/palette"
import { Match } from "found"
import {
  PartnerArtistDetailsListRenderer,
  PartnerArtistDetailsRenderer,
  PartnerArtistsFragmentContainer,
} from "../../Components/PartnerArtists"
import { ArtistsRoute_partner } from "v2/__generated__/ArtistsRoute_partner.graphql"
import { PARTNER_NAV_BAR_HEIGHT } from "../../Components/NavigationTabs"
import { graphql } from "lib/graphql"
import { createFragmentContainer } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { usePartnerArtistsLoadingContext } from "../../Utils/PartnerArtistsLoadingContext"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

export interface ArtistsRouteProps {
  partner: ArtistsRoute_partner
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)
  const { isLoaded } = usePartnerArtistsLoadingContext()

  useEffect(() => {
    if (match.params.artistId && isLoaded && isMobile !== null) {
      scrollIntoArtistDetails()
    }
  }, [isLoaded, isMobile])

  const scrollIntoArtistDetails = () => {
    const offset =
      PARTNER_NAV_BAR_HEIGHT +
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
      <Media greaterThan="xs">
        <PartnerArtistsFragmentContainer
          scrollTo={{
            selector: "#jump--PartnerArtistDetails",
            offset: PARTNER_NAV_BAR_HEIGHT + NAV_BAR_HEIGHT + 20,
          }}
          partner={partner}
        />
      </Media>
      <Media at="xs">
        <PartnerArtistsFragmentContainer
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
      fragment ArtistsRoute_partner on Partner {
        ...PartnerArtists_partner
      }
    `,
  }
)
