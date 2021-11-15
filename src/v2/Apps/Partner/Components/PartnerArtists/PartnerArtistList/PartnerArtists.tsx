import { useEffect } from "react"
import * as React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerArtists_partner } from "v2/__generated__/PartnerArtists_partner.graphql"
import { PartnerArtistsQuery } from "v2/__generated__/PartnerArtistsQuery.graphql"
import { ScrollIntoViewProps } from "v2/Utils/scrollHelpers"
import { useSystemContext } from "v2/System"
import { usePartnerArtistsLoadingContext } from "v2/Apps/Partner/Utils/PartnerArtistsLoadingContext"
import { PartnerArtistListPlaceholder } from "./PartnerArtistListPlaceholder"
import { PartnerArtistListFragmentContainer } from "./PartnerArtistList"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

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
    displayFullPartnerPage,
  } = partner

  return (
    <Box mt={4}>
      <PartnerArtistListFragmentContainer
        partnerSlug={slug}
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        scrollTo={scrollTo}
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        artists={artists}
        distinguishRepresentedArtists={!!distinguishRepresentedArtists}
        displayFullPartnerPage={!!displayFullPartnerPage}
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
        displayFullPartnerPage
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
    <SystemQueryRenderer<PartnerArtistsQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistsQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtists_partner
          }
        }
      `}
      variables={{ partnerId }}
      placeholder={<PartnerArtistListPlaceholder />}
      render={({ error, props }) => {
        if (error || !props) return <PartnerArtistListPlaceholder />

        return (
          <PartnerArtistsFragmentContainer {...rest} partner={props.partner!} />
        )
      }}
    />
  )
}
