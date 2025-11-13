import { PartnerArtistDetailsRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetails/PartnerArtistDetails"
import { PartnerArtistDetailsListRenderer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistDetailsList/PartnerArtistDetailsList"
import { PartnerArtistsFragmentContainer } from "Apps/Partner/Components/PartnerArtists/PartnerArtistList/PartnerArtists"
import { usePartnerArtistsLoadingContext } from "Apps/Partner/Utils/PartnerArtistsLoadingContext"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { Box, Join, Separator, Spacer, Text, THEME } from "@artsy/palette"
import type { ArtistsRoute_partner$data } from "__generated__/ArtistsRoute_partner.graphql"
import type { Match } from "found"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtistsRouteProps {
  partner: ArtistsRoute_partner$data
  match: Match
}

export const ArtistsRoute: React.FC<
  React.PropsWithChildren<ArtistsRouteProps>
> = ({ partner, match }) => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const { isLoaded } = usePartnerArtistsLoadingContext()

  const { jumpTo } = useJump()

  const artistId = match.location.hash
    ? match.location.hash.replace(/^#/, "")
    : undefined

  // biome-ignore lint/correctness/useExhaustiveDependencies: Jump to artist navigation managed by URL hash state
  useEffect(() => {
    if (artistId && isLoaded && isMobile !== null) {
      jumpTo("PartnerArtistDetails")
    }
  }, [isLoaded, isMobile, artistId])

  return (
    <Box mt={4}>
      <Join separator={<Spacer y={6} />}>
        <Text variant="lg-display">Artists</Text>

        <PartnerArtistsFragmentContainer partner={partner} />

        <Jump id="PartnerArtistDetails">
          <Separator />
        </Jump>

        {artistId ? (
          <PartnerArtistDetailsRenderer
            partnerId={match.params.partnerId}
            artistId={artistId}
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
