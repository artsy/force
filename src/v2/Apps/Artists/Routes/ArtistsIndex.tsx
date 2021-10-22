import * as React from "react";
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
import { ArtistsArtistCardFragmentContainer } from "../Components/ArtistsArtistCard"
import { ArtistsCarouselCellFragmentContainer } from "../Components/ArtistsCarouselCell"
import { ArtistsLetterNav } from "../Components/ArtistsLetterNav"
import { Media } from "v2/Utils/Responsive"

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
            {/*  @ts-expect-error STRICT_NULL_CHECK */}
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
          </Shelf>
        )}
      </Media>

      <Spacer mt={6} />

      {genes && (
        <Join separator={<Spacer mt={6} />}>
          {genes?.map(gene => {
            // @ts-expect-error STRICT_NULL_CHECK
            if (gene.trendingArtists?.length === 0) return null

            return (
              // @ts-expect-error STRICT_NULL_CHECK
              <React.Fragment key={gene.name}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  <RouterLink to={gene.href} noUnderline>
                    <Text variant="lg" as="h2">
                      {/* @ts-expect-error STRICT_NULL_CHECK */}
                      {gene.name}
                    </Text>
                  </RouterLink>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  <RouterLink to={gene.href} noUnderline>
                    <Text variant="md" color="black60">
                      View
                    </Text>
                  </RouterLink>
                </Box>

                <GridColumns gridRowGap={[2, 0]}>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {gene.trendingArtists.map(artist => {
                    return (
                      // @ts-expect-error STRICT_NULL_CHECK
                      <Column key={artist.internalID} span={[12, 6, 3, 3]}>
                        {/* @ts-expect-error STRICT_NULL_CHECK */}
                        <ArtistsArtistCardFragmentContainer artist={artist} />
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
              internalID
              ...ArtistsArtistCard_artist
            }
          }
        }
      }
    `,
  }
)
