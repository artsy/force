import { ArtistsCarouselCellFragmentContainer } from "Apps/Artists/Components/ArtistsCarouselCell"
import { ArtistsIndexMeta } from "Apps/Artists/Components/ArtistsIndexMeta"
import { ArtistsLetterNav } from "Apps/Artists/Components/ArtistsLetterNav"
import { CellArtistFragmentContainer } from "Components/Cells/CellArtist"
import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import { Media } from "Utils/Responsive"
import {
  Box,
  Breadcrumbs,
  Column,
  GridColumns,
  Join,
  Shelf,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArtistsIndex_featuredArtists$data } from "__generated__/ArtistsIndex_featuredArtists.graphql"
import type { ArtistsIndex_featuredGenes$data } from "__generated__/ArtistsIndex_featuredGenes.graphql"
import { compact } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistsIndexProps {
  featuredArtists: ArtistsIndex_featuredArtists$data | null
  featuredGenes: ArtistsIndex_featuredGenes$data | null
}

export const ArtistsIndex: React.FC<
  React.PropsWithChildren<ArtistsIndexProps>
> = ({ featuredArtists, featuredGenes }) => {
  const [featuredArtistsSet] = featuredArtists ?? []
  const [featuredGenesSet] = featuredGenes ?? []

  const headline = featuredArtistsSet?.name ?? "Artists"
  const artists = compact(featuredArtistsSet?.artists) ?? []
  const genes = compact(featuredGenesSet?.genes) ?? []

  const isMobile = getENV("IS_MOBILE")

  return (
    <>
      <ArtistsIndexMeta />

      <Spacer y={4} />

      <Join separator={<Spacer y={6} />}>
        <GridColumns gridRowGap={[2, 0]}>
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

        {artists.length > 0 && (
          <Media greaterThan="xs">
            <Shelf>
              {artists.map((featuredLink, index) => {
                if (!featuredLink?.internalID) return <></>

                return (
                  <ArtistsCarouselCellFragmentContainer
                    key={featuredLink.internalID}
                    featuredLink={featuredLink}
                    index={index}
                    // Improves LCP for above the fold content
                    lazyLoad={!!isMobile}
                  />
                )
              })}
            </Shelf>
          </Media>
        )}

        {genes.length > 0 && (
          <Join separator={<Spacer y={6} />}>
            {genes.map((gene, geneIndex) => {
              if (
                !gene ||
                !gene.trendingArtists ||
                gene.trendingArtists.length === 0
              ) {
                return null
              }

              return (
                <Box key={gene.name ?? geneIndex}>
                  <Box display="flex" justifyContent="space-between">
                    <RouterLink
                      to={gene.href}
                      textDecoration="none"
                      display="block"
                    >
                      <Text variant="lg-display" as="h2" lineClamp={2}>
                        {gene.name}
                      </Text>
                    </RouterLink>

                    <Spacer x={2} />

                    <RouterLink
                      to={gene.href}
                      textDecoration="none"
                      display="block"
                    >
                      <Text variant="sm-display" color="mono60">
                        View
                      </Text>
                    </RouterLink>
                  </Box>

                  <Spacer y={2} />

                  <GridColumns gridRowGap={4}>
                    {gene.trendingArtists.map((artist, artistsIndex) => {
                      if (!artist) return null

                      return (
                        <Column key={artist.internalID} span={[12, 6, 3, 3]}>
                          <CellArtistFragmentContainer
                            mode="GRID"
                            artist={artist}
                            // LCP above the fold optimization for mobile
                            lazyLoad={
                              !(
                                isMobile &&
                                geneIndex === 0 &&
                                artistsIndex === 0
                              )
                            }
                          />
                        </Column>
                      )
                    })}
                  </GridColumns>
                </Box>
              )
            })}
          </Join>
        )}
      </Join>
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
