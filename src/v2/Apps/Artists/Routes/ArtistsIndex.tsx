import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, GridColumns, Column, Text, Image } from "@artsy/palette"
import { ArtistsIndex_featuredArtists } from "v2/__generated__/ArtistsIndex_featuredArtists.graphql"
import { ArtistsIndex_featuredGenes } from "v2/__generated__/ArtistsIndex_featuredGenes.graphql"
import { Media } from "v2/Utils/Responsive"
import { Carousel } from "v2/Components/Carousel"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ArtistsIndexMeta } from "../Components/ArtistsIndexMeta"
import { ArtistsTopNav } from "../Components/ArtistsTopNav"
import { ArtistsArtistCardFragmentContainer } from "../Components/ArtistsArtistCard"
import { ArtistsCarouselCellFragmentContainer } from "../Components/ArtistsCarouselCell"

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

      <ArtistsTopNav my={3}>
        <Text>Browse over 100,000 artists</Text>
      </ArtistsTopNav>

      <Media greaterThanOrEqual="sm">
        <Text as="h1" variant="largeTitle" my={2}>
          {headline}
        </Text>

        {artists && (
          <Carousel my={2} arrowHeight={410}>
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            {artists.map((featuredLink, index) => {
              // @ts-expect-error STRICT_NULL_CHECK
              if (!featuredLink.internalID) return null

              return (
                <ArtistsCarouselCellFragmentContainer
                  // @ts-expect-error STRICT_NULL_CHECK
                  key={featuredLink.internalID}
                  // @ts-expect-error STRICT_NULL_CHECK
                  featuredLink={featuredLink}
                  index={index}
                />
              )
            })}
          </Carousel>
        )}
      </Media>

      <Media lessThan="sm">
        <Text variant="largeTitle" as="h2" my={3}>
          Artists by category
        </Text>
      </Media>

      {genes?.map(gene => {
        // @ts-expect-error STRICT_NULL_CHECK
        if (gene.trendingArtists?.length === 0) return null

        return (
          // @ts-expect-error STRICT_NULL_CHECK
          <React.Fragment key={gene.name}>
            <Media greaterThanOrEqual="sm">
              <Box my={4}>
                <Box display="flex" justifyContent="space-between" my={2}>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  <RouterLink to={gene.href} noUnderline>
                    <Text as="h2" variant="subtitle">
                      {/* @ts-expect-error STRICT_NULL_CHECK */}
                      {gene.name}
                    </Text>
                  </RouterLink>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  <RouterLink to={gene.href} noUnderline>
                    <Text variant="subtitle" color="black60">
                      View
                    </Text>
                  </RouterLink>
                </Box>

                <GridColumns>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {gene.trendingArtists.map(artist => {
                    return (
                      // @ts-expect-error STRICT_NULL_CHECK
                      <Column key={artist.internalID} span={[12, 6, 6, 3]}>
                        {/* @ts-expect-error STRICT_NULL_CHECK */}
                        <ArtistsArtistCardFragmentContainer artist={artist} />
                      </Column>
                    )
                  })}
                </GridColumns>
              </Box>
            </Media>

            <Media lessThan="sm">
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              <RouterLink to={gene.href} noUnderline>
                <Box
                  borderTop="1px solid"
                  borderColor="black10"
                  py={1}
                  display="flex"
                  alignItems="center"
                >
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {gene.image && (
                    <Image
                      // @ts-expect-error STRICT_NULL_CHECK
                      src={gene.image.thumb.src}
                      // @ts-expect-error STRICT_NULL_CHECK
                      srcSet={gene.image.thumb.srcSet}
                      // @ts-expect-error STRICT_NULL_CHECK
                      width={gene.image.thumb.width}
                      // @ts-expect-error STRICT_NULL_CHECK
                      height={gene.image.thumb.height}
                      // @ts-expect-error STRICT_NULL_CHECK
                      alt={gene.name}
                    />
                  )}

                  <Text ml={2} variant="subtitle">
                    {/* @ts-expect-error STRICT_NULL_CHECK */}
                    {gene.name}
                  </Text>
                </Box>
              </RouterLink>
            </Media>
          </React.Fragment>
        )
      })}
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
            image {
              thumb: cropped(width: 80, height: 80) {
                width
                height
                src
                srcSet
              }
            }
            trendingArtists(sample: 4) {
              internalID
              ...ArtistsArtistCard_artist
            }
          }
        }
      }
    `,
  }
)
