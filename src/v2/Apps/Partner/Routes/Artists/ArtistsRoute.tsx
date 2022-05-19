import { useEffect } from "react"
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
import { usePartnerArtistsLoadingContext } from "../../Utils/PartnerArtistsLoadingContext"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

export interface ArtistsRouteProps {
  partner: ArtistsRoute_partner
  match: Match
}

export const ArtistsRoute: React.FC<ArtistsRouteProps> = ({
  partner,
  match,
}) => {
  const { mobile, desktop } = useNavBarHeight()
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const { isLoaded } = usePartnerArtistsLoadingContext()

  useEffect(() => {
    if (match.params.artistId && isLoaded && isMobile !== null) {
      scrollIntoArtistDetails()
    }
  }, [isLoaded, isMobile])

  const scrollIntoArtistDetails = () => {
    const offset = PARTNER_NAV_BAR_HEIGHT + (isMobile ? mobile : desktop) + 20

    scrollIntoView({
      offset: offset,
      selector: "#jump--PartnerArtistDetails",
    })
  }

  return (
    <Box mt={4}>
      <Text variant="lg-display" mb={6}>
        Artists
      </Text>
      <Media greaterThan="xs">
        <PartnerArtistsFragmentContainer
          scrollTo={{
            selector: "#jump--PartnerArtistDetails",
            offset: PARTNER_NAV_BAR_HEIGHT + desktop + 20,
          }}
          partner={partner}
        />
      </Media>
      <Media at="xs">
        <PartnerArtistsFragmentContainer
          scrollTo={{
            selector: "#jump--PartnerArtistDetails",
            offset: PARTNER_NAV_BAR_HEIGHT + mobile + 20,
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
