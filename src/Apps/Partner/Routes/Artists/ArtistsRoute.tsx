import { useEffect } from "react"
import { Box, Join, Separator, Spacer, Text, THEME } from "@artsy/palette"
import { Match } from "found"
import { ArtistsRoute_partner$data } from "__generated__/ArtistsRoute_partner.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { usePartnerArtistsLoadingContext } from "Apps/Partner/Utils/PartnerArtistsLoadingContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { PartnerArtistsFragmentContainer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistList/PartnerArtists"
import { PartnerArtistDetailsRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails/PartnerArtistDetails"
import { PartnerArtistDetailsListRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetailsList/PartnerArtistDetailsList"

export interface ArtistsRouteProps {
  partner: ArtistsRoute_partner$data
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const { isLoaded } = usePartnerArtistsLoadingContext()

  const { jumpTo } = useJump()

  useEffect(() => {
    if (match.params.artistId && isLoaded && isMobile !== null) {
      jumpTo("PartnerArtistDetails")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isMobile, match.params.artistId])

  return (
    <Box mt={4}>
      <Join separator={<Spacer y={6} />}>
        <Text variant="lg-display">Artists</Text>

        <PartnerArtistsFragmentContainer partner={partner} />

        <Jump id="PartnerArtistDetails">
          <Separator />
        </Jump>

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
      </Join>
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
