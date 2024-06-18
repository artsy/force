import * as React from "react"
import { PartnerArtistList_partner$data } from "__generated__/PartnerArtistList_partner.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Join, media, Spacer, Text } from "@artsy/palette"
import { compact } from "lodash"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"

export interface PartnerArtistListProps {
  partner: PartnerArtistList_partner$data
}

export const PartnerArtistList: React.FC<PartnerArtistListProps> = ({
  partner,
}) => {
  if (
    !partner.allArtistsConnection?.edges ||
    (partner.allArtistsConnection.edges.length ?? 0) === 0
  ) {
    return null
  }

  const edges = compact(partner.allArtistsConnection.edges)
  const represented = edges.filter(edge => edge.representedBy)
  const worksAvailableBy = edges.filter(edge => !edge.representedBy)

  const groups: {
    name: string | null
    edges: typeof edges
  }[] = partner.distinguishRepresentedArtists
    ? [
        ...(represented.length === 0
          ? []
          : [{ name: "Represented Artists", edges: represented }]),
        ...(worksAvailableBy.length === 0
          ? []
          : [{ name: "Works Available by", edges: worksAvailableBy }]),
      ]
    : [{ name: null, edges }]

  return (
    <Join separator={<Spacer y={4} />}>
      {groups.map(({ name, edges }, i) => {
        return (
          <Box key={name ?? i}>
            {name && (
              <>
                <Text variant="sm-display" fontWeight="bold">
                  {name}
                </Text>

                <Spacer y={2} />
              </>
            )}

            <Columns variant="sm">
              {edges.map(edge => {
                if (!edge.node) return null

                const artist = edge.node

                // No partner artworks for this artist
                if ((edge.counts?.artworks ?? 0) === 0) {
                  return (
                    <Box key={artist.internalID} color="black60" py={0.5}>
                      {artist.name}
                    </Box>
                  )
                }

                return (
                  <RouterLink
                    key={artist.internalID}
                    to={
                      partner.displayFullPartnerPage
                        ? `${partner.href}/artists/${artist.slug}`
                        : `${artist.href}`
                    }
                    display="block"
                    py={0.5}
                    textDecoration="none"
                  >
                    {artist.name}
                  </RouterLink>
                )
              })}
            </Columns>
          </Box>
        )
      })}
    </Join>
  )
}

export const PartnerArtistListFragmentContainer = createFragmentContainer(
  PartnerArtistList,
  {
    partner: graphql`
      fragment PartnerArtistList_partner on Partner {
        href
        distinguishRepresentedArtists
        displayFullPartnerPage
        allArtistsConnection(
          displayOnPartnerProfile: true
          hasNotRepresentedArtistWithPublishedArtworks: true
        ) {
          edges {
            representedBy
            counts {
              artworks
            }
            node {
              internalID
              slug
              name
              href
              counts {
                artworks
              }
            }
          }
        }
      }
    `,
  }
)

export const Columns = styled(Text)`
  column-count: 6;
  ${media.md`column-count: 4;`}
  ${media.xs`column-count: 2;`}
`
