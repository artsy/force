import * as React from "react"
import { PartnerArtistList_artists$data } from "__generated__/PartnerArtistList_artists.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, GridColumns, Text } from "@artsy/palette"
import { groupArtists } from "Apps/Partner/Components/PartnerArtists/partnerArtistsUtils"
import { ColumnSpan } from "@artsy/palette/dist/elements/GridColumns/calculateGridColumn"
import { Media } from "Utils/Responsive"
import { PartnerArtistItemFragmentContainer as PartnerArtistItem } from "./PartnerArtistItem"
import { Carousel } from "Components/Carousel"
import { ScrollIntoViewProps } from "Utils/scrollHelpers"

export interface PartnerArtistListProps {
  artists: PartnerArtistList_artists$data
  distinguishRepresentedArtists: boolean
  partnerSlug: string
  scrollTo: ScrollIntoViewProps
  displayFullPartnerPage: boolean
}

export const PartnerArtistListContainer: React.FC = ({ children }) => {
  return (
    <>
      <Media greaterThan="xs">{children}</Media>
      <Media at="xs">
        <Carousel>{children as JSX.Element}</Carousel>
      </Media>
    </>
  )
}

export const PartnerArtistList: React.FC<PartnerArtistListProps> = ({
  artists,
  distinguishRepresentedArtists,
  partnerSlug,
  scrollTo,
  displayFullPartnerPage,
}) => {
  if (!artists) return null

  const groups = groupArtists(
    artists,
    distinguishRepresentedArtists && displayFullPartnerPage
  )

  return (
    <PartnerArtistListContainer>
      <GridColumns minWidth={["270vw", "auto"]} pr={[2, 0]} gridColumnGap={1}>
        {groups.map((group, i) => {
          return (
            <Column key={i} span={[(group.columnSize * 2) as ColumnSpan]}>
              {group.columnName && (
                <Text variant="sm-display" mb={2}>
                  {group.columnName}
                </Text>
              )}
              <Box style={{ columnCount: group.columnSize }}>
                {group.artists.map(({ node, counts }) => {
                  return (
                    <PartnerArtistItem
                      scrollTo={scrollTo}
                      key={node!.internalID}
                      artist={node!}
                      partnerSlug={partnerSlug}
                      hasPublishedArtworks={counts?.artworks > 0}
                      displayFullPartnerPage={displayFullPartnerPage}
                    />
                  )
                })}
              </Box>
            </Column>
          )
        })}
      </GridColumns>
    </PartnerArtistListContainer>
  )
}

export const PartnerArtistListFragmentContainer = createFragmentContainer(
  PartnerArtistList,
  {
    artists: graphql`
      fragment PartnerArtistList_artists on ArtistPartnerEdge
        @relay(plural: true) {
        representedBy
        counts {
          artworks
        }
        node {
          internalID
          ...PartnerArtistItem_artist
        }
      }
    `,
  }
)
