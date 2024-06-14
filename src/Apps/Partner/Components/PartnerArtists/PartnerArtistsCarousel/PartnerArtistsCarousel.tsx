import * as React from "react"
import { Shelf } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { PartnerArtistsCarouselRendererQuery } from "__generated__/PartnerArtistsCarouselRendererQuery.graphql"
import { PartnerArtistsCarousel_partner$data } from "__generated__/PartnerArtistsCarousel_partner.graphql"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { CellPartnerArtistFragmentContainer } from "Components/Cells/CellPartnerArtist"
import { compact } from "lodash"

const PAGE_SIZE = 20

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner$data
}

export const PartnerArtistsCarousel: React.FC<PartnerArtistsCarouselProps> = ({
  partner,
}) => {
  if (
    !partner ||
    !partner.artistsConnection ||
    !partner.artistsConnection.edges
  ) {
    return null
  }
  const artists = compact(partner.artistsConnection.edges)

  return (
    <Shelf alignItems="flex-start">
      {artists.map(artist => (
        <CellPartnerArtistFragmentContainer
          key={artist.node?.internalID}
          artistPartnerEdge={artist}
        />
      ))}
    </Shelf>
  )
}

export const PartnerArtistsCarouselFragmentContainer = createFragmentContainer(
  PartnerArtistsCarousel,
  {
    partner: graphql`
      fragment PartnerArtistsCarousel_partner on Partner {
        slug
        artistsConnection(
          first: 20
          hasPublishedArtworks: true
          displayOnPartnerProfile: true
        ) {
          edges {
            node {
              internalID
              slug
            }
            ...CellPartnerArtist_partnerArtist
          }
        }
      }
    `,
  }
)

export const PartnerArtistsCarouselRenderer: React.FC<{
  partnerId: string
}> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PartnerArtistsCarouselRendererQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistsCarouselRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtistsCarousel_partner
          }
        }
      `}
      variables={{ partnerId }}
      placeholder={<PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />}
      render={({ error, props }) => {
        if (error || !props)
          return <PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />

        return (
          <PartnerArtistsCarouselFragmentContainer
            {...rest}
            partner={props.partner!}
          />
        )
      }}
    />
  )
}
