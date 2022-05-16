import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  GridColumns,
  Column,
  Text,
  Breadcrumbs,
  Shelf,
  Join,
  Spacer,
} from "@artsy/palette"
import { ArtistsIndex_featuredArtists } from "v2/__generated__/ArtistsIndex_featuredArtists.graphql"
import { ArtistsIndex_featuredGenes } from "v2/__generated__/ArtistsIndex_featuredGenes.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArtistsIndexMeta } from "../Components/ArtistsIndexMeta"
import { ArtistsCarouselCellFragmentContainer } from "../Components/ArtistsCarouselCell"
import { ArtistsLetterNav } from "../Components/ArtistsLetterNav"
import { Media } from "v2/Utils/Responsive"
import { compact } from "lodash"
import { CellArtistFragmentContainer } from "v2/Components/Cells/CellArtist"

interface ArtistsIndexProps {
  featuredArtists: ArtistsIndex_featuredArtists
  featuredGenes: ArtistsIndex_featuredGenes
}

export const ArtistsIndex: React.FC<ArtistsIndexProps> = ({
  featuredArtists,
  featuredGenes,
}) => {
  const [{ name: headline, artists }] = featuredArtists
  const [{ genes }] = featuredGenes

  return (
    <>
      <ArtistsIndexMeta />

      <GridColumns mt={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={1}>
            {headline}
          </Text>

          <Breadcrumbs>
            <RouterLink to="">Browse over 100,000 artists</RouterLink>
          </Breadcrumbs>
        </Column>

        <Column span={6}>
          <ArtistsLetterNav />
        </Column>
      </GridColumns>

      <Media greaterThan="xs">
        <Spacer mt={6} />

        {artists && (
          <Shelf my={2}>
            {compact(
              artists.map((featuredLink, index) => {
                if (!featuredLink?.internalID) return null

                return (
                  <ArtistsCarouselCellFragmentContainer
                    key={featuredLink.internalID}
                    featuredLink={featuredLink}
                    index={index}
                  />
                )
              })
            )}
          </Shelf>
        )}
      </Media>

      <Spacer mt={6} />

      {genes && (
        <Join separator={<Spacer mt={6} />}>
          {genes?.map((gene, i) => {
            if (
              !gene ||
              !gene.trendingArtists ||
              gene.trendingArtists.length === 0
            )
              return null

            return (
              <React.Fragment key={gene.name ?? i}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <RouterLink to={gene.href!} noUnderline>
                    <Text variant="lg-display" as="h2">
                      {gene.name}
                    </Text>
                  </RouterLink>

                  <RouterLink to={gene.href!} noUnderline>
                    <Text variant="sm-display" color="black60">
                      View
                    </Text>
                  </RouterLink>
                </Box>

                <GridColumns>
                  {gene.trendingArtists.map(artist => {
                    if (!artist) return null

                    return (
                      <Column key={artist.internalID} span={[12, 6, 3, 3]}>
                        <CellArtistFragmentContainer
                          mode="GRID"
                          artist={artist}
                        />
                      </Column>
                    )
                  })}
                </GridColumns>
              </React.Fragment>
            )
          })}
        </Join>
      )}
    </>
  )
}

export const ArtistsIndexFragmentContainer = createFragmentContainer(
  ArtistsIndex,
  {
    featuredArtists: graphql`
      fragment ArtistsIndex_featuredArtists on OrderedSet @relay(plural: true) {
        name
        artists: items {
          ... on FeaturedLink {
            internalID
          }
          ...ArtistsCarouselCell_featuredLink
        }
      }
    `,
    featuredGenes: graphql`
      fragment ArtistsIndex_featuredGenes on OrderedSet @relay(plural: true) {
        name
        genes: items {
          ... on Gene {
            internalID
            name
            href
            trendingArtists(sample: 4) {
              ...CellArtist_artist
              internalID
            }
          }
        }
      }
    `,
  }
)
