import * as React from "react"
import { Shelf } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import { PartnerArtistsCarouselRendererQuery } from "__generated__/PartnerArtistsCarouselRendererQuery.graphql"
import { PartnerArtistsCarousel_partner } from "__generated__/PartnerArtistsCarousel_partner.graphql"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { CellArtistFragmentContainer } from "Components/Cells/CellArtist"
import { extractNodes } from "Utils/extractNodes"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"

const PAGE_SIZE = 20

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner
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

  const artists = extractNodes(partner.artistsConnection)

  return (
    <Shelf alignItems="flex-start">
      {artists.map(artist => (
        <CellArtistFragmentContainer
          key={artist.internalID}
          artist={artist}
          to={`/partner/${partner.slug}/artists/${artist.slug}`}
          FollowButton={
            <FollowArtistButtonQueryRenderer
              id={artist.internalID}
              contextModule={ContextModule.recommendedArtistsRail}
              size="small"
            />
          }
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
              ...CellArtist_artist
              internalID
              slug
            }
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
