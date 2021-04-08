import { Box } from "@artsy/palette"
import React from "react"
import { useSystemContext } from "v2/Artsy"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { PartnerArtistDetailsFragmentContainer } from "../../Components/PartnerArtists"
import { PartnerArtistDetailsList_edges } from "v2/__generated__/PartnerArtistDetailsList_edges.graphql"
import { PartnerArtistDetailsListQuery } from "v2/__generated__/PartnerArtistDetailsListQuery.graphql"

export interface PartnerArtistDetailsListProps {
  edges: PartnerArtistDetailsList_edges
}

// TODO: Rewrite to using infinite scroll
export const PartnerArtistDetailsList: React.FC<PartnerArtistDetailsListProps> = ({
  edges,
}) => {
  return (
    <Box mt={4}>
      {edges
        .filter(artist => artist.isDisplayOnPartnerProfile)
        .filter(artists => artists.counts.artworks > 0)
        .map(edge => {
          return (
            <PartnerArtistDetailsFragmentContainer
              key={edge.node.id}
              artist={edge.node}
            />
          )
        })}
    </Box>
  )
}

export const PartnerArtistDetailsListFragmentContainer = createFragmentContainer(
  PartnerArtistDetailsList,
  {
    edges: graphql`
      fragment PartnerArtistDetailsList_edges on ArtistPartnerEdge
        @relay(plural: true) {
        isDisplayOnPartnerProfile
        representedBy
        counts {
          artworks
        }
        node {
          id
          ...PartnerArtistDetails_artist
        }
      }
    `,
  }
)

export const PartnerArtistDetailsListRenderer: React.FC<{
  partnerId: string
}> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<PartnerArtistDetailsListQuery>
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistDetailsListQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            artists: artistsConnection(first: 10) {
              edges {
                ...PartnerArtistDetailsList_edges
              }
            }
          }
        }
      `}
      variables={{ partnerId }}
      render={({ error, props }) => {
        if (error || !props) return null // TODO: Add placeholder

        return (
          <PartnerArtistDetailsListFragmentContainer
            {...rest}
            edges={props.partner.artists.edges}
          />
        )
      }}
    />
  )
}
