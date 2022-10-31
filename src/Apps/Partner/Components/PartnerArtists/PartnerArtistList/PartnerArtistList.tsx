import * as React from "react"
import { PartnerArtistList_partner$data } from "__generated__/PartnerArtistList_partner.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, media, Text, THEME_V3 } from "@artsy/palette"
import { compact } from "lodash"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"

// Values here used to implement column headers in CSS
const PADDING = 0.5
const OFFSET =
  parseInt(THEME_V3.textVariants.sm.lineHeight, 10) + PADDING * 10 * 2

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
      ].sort((a, b) => b.edges.length - a.edges.length)
    : [{ name: null, edges }]

  return (
    <Columns
      variant="sm"
      pt={partner.distinguishRepresentedArtists ? OFFSET : 0}
    >
      {groups.map(({ name, edges }, i) => {
        return (
          <React.Fragment key={name ?? i}>
            {name && (
              <Text
                variant="sm"
                height={OFFSET}
                overflow="visible"
                style={{
                  breakBefore: "column",
                  whiteSpace: "nowrap",
                  transform: `translateY(-${OFFSET}px)`,
                }}
              >
                {name}
              </Text>
            )}

            {edges.map((edge, i) => {
              if (!edge.node) return null

              const artist = edge.node
              const mt = !!name && i === 0 ? -OFFSET : 0

              // No partner artworks for this artist
              if ((edge.counts?.artworks ?? 0) === 0) {
                return (
                  <Box
                    key={artist.internalID}
                    color="black60"
                    py={PADDING}
                    mt={mt}
                  >
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
                  py={PADDING}
                  mt={mt}
                  textDecoration="none"
                >
                  {artist.name}
                </RouterLink>
              )
            })}
          </React.Fragment>
        )
      })}
    </Columns>
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
