import React, { useEffect } from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  PartnerArtistListFragmentContainer,
  PartnerArtistListPlaceholder,
} from "../../Components/PartnerArtists"
import { PartnerArtists_partner } from "v2/__generated__/PartnerArtists_partner.graphql"
import { ScrollIntoViewProps } from "v2/Utils/scrollHelpers"
import { usePartnerArtistsLoadingContext } from "../../Utils/PartnerArtistsLoadingContext"

export interface PartnerArtistsProps {
  partner: PartnerArtists_partner
  scrollTo?: ScrollIntoViewProps
}

export const PartnerArtists: React.FC<PartnerArtistsProps> = ({
  partner,
  scrollTo,
}) => {
  const { setIsLoaded } = usePartnerArtistsLoadingContext()
  useEffect(() => {
    setIsLoaded && setIsLoaded(true)
  }, [])

  if (!partner || !partner.allArtistsConnection) {
    return <PartnerArtistListPlaceholder />
  }

  const {
    allArtistsConnection: { edges: artists },
    distinguishRepresentedArtists,
    slug,
  } = partner

  return (
    <Box mt={4}>
      <PartnerArtistListFragmentContainer
        partnerSlug={slug}
        scrollTo={scrollTo}
        artists={artists}
        distinguishRepresentedArtists={distinguishRepresentedArtists}
      />
    </Box>
  )
}

export const PartnerArtistsFragmentContainer = createFragmentContainer(
  PartnerArtists,
  {
    partner: graphql`
      fragment PartnerArtists_partner on Partner {
        slug
        distinguishRepresentedArtists
        allArtistsConnection(
          displayOnPartnerProfile: true
          hasNotRepresentedArtistWithPublishedArtworks: true
        ) {
          edges {
            ...PartnerArtistList_artists
          }
        }
      }
    `,
  }
)
