import { useEffect } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerArtists_partner$data } from "__generated__/PartnerArtists_partner.graphql"
import { PartnerArtistsQuery } from "__generated__/PartnerArtistsQuery.graphql"
import { usePartnerArtistsLoadingContext } from "Apps/Partner/Utils/PartnerArtistsLoadingContext"
import { PartnerArtistListPlaceholder } from "./PartnerArtistListPlaceholder"
import { PartnerArtistListFragmentContainer } from "./PartnerArtistList"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"

export interface PartnerArtistsProps {
  partner: PartnerArtists_partner$data
}

export const PartnerArtists: React.FC<PartnerArtistsProps> = ({ partner }) => {
  const { setIsLoaded } = usePartnerArtistsLoadingContext()

  useEffect(() => {
    setIsLoaded && setIsLoaded(true)
  }, [setIsLoaded])

  if (!partner) {
    return <PartnerArtistListPlaceholder />
  }

  return <PartnerArtistListFragmentContainer partner={partner} />
}

export const PartnerArtistsFragmentContainer = createFragmentContainer(
  PartnerArtists,
  {
    partner: graphql`
      fragment PartnerArtists_partner on Partner {
        ...PartnerArtistList_partner
      }
    `,
  }
)

export const PartnerArtistsQueryRenderer: React.FC<{
  partnerId: string
}> = ({ partnerId, ...rest }) => {
  return (
    <SystemQueryRenderer<PartnerArtistsQuery>
      lazyLoad
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
        if (error) {
          return null
        }

        if (!props) {
          return <PartnerArtistListPlaceholder />
        }

        return (
          <PartnerArtistsFragmentContainer {...rest} partner={props.partner!} />
        )
      }}
    />
  )
}
