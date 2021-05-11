import React, { useEffect } from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import {
  PartnerArtistListFragmentContainer,
  PartnerArtistListPlaceholder,
} from "../../Components/PartnerArtists"
import { PartnerArtists_partner } from "v2/__generated__/PartnerArtists_partner.graphql"
import { PartnerArtistsQuery } from "v2/__generated__/PartnerArtistsQuery.graphql"
import { ScrollIntoViewProps } from "v2/Utils/scrollHelpers"
import { usePartnerArtistsLoadingContext } from "../../Utils/PartnerArtistsLoadingContext"
import { useSystemContext } from "v2/Artsy"

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
        // @ts-expect-error STRICT_NULL_CHECK
        scrollTo={scrollTo}
        // @ts-expect-error STRICT_NULL_CHECK
        artists={artists}
        // @ts-expect-error STRICT_NULL_CHECK
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

export const PartnerArtistsRenderer: React.FC<{
  partnerId: string
  scrollTo?: ScrollIntoViewProps
}> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<PartnerArtistsQuery>
      //  @ts-expect-error STRICT_NULL_CHECK
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistsQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtists_partner
          }
        }
      `}
      variables={{ partnerId }}
      render={({ error, props }) => {
        if (error || !props) return <PartnerArtistListPlaceholder />
        // @ts-expect-error STRICT_NULL_CHECK
        return <PartnerArtistsFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
