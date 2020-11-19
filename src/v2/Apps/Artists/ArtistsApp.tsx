import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  GridColumns,
  Column,
  Separator,
  Text,
  Image,
} from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ArtistsApp_featuredArtists } from "v2/__generated__/ArtistsApp_featuredArtists.graphql"
import { ArtistsApp_featuredGenes } from "v2/__generated__/ArtistsApp_featuredGenes.graphql"
import { Carousel } from "v2/Components/Carousel"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ArtistsLetterNav } from "./Components/ArtistsLetterNav"
import { ArtistsArtistCardFragmentContainer } from "./Components/ArtistsArtistCard"
import { ArtistsCarouselCellFragmentContainer } from "./Components/ArtistsCarouselCell"
import { ArtistsMeta } from "./Components/ArtistsMeta"
import { Media } from "v2/Utils/Responsive"

interface ArtistsAppProps {
  featuredArtists: ArtistsApp_featuredArtists
  featuredGenes: ArtistsApp_featuredGenes
}

export const ArtistsApp: React.FC<ArtistsAppProps> = ({
  featuredArtists,
  featuredGenes,
}) => {
  const [{ name: headline, artists }] = featuredArtists
  const [{ genes }] = featuredGenes

  return (
    <>
      <ArtistsMeta />

      <AppContainer>
        <HorizontalPadding>
          <ArtistsLetterNav my={3} />

          <Media greaterThanOrEqual="sm">
            <Text as="h1" variant="largeTitle" my={2} textAlign="center">
              {headline}
            </Text>

            {artists && (
              <Carousel my={2} arrowHeight={410}>
                {artists.map((featuredLink, index) => {
                  if (!featuredLink.internalID) return null

                  return (
                    <ArtistsCarouselCellFragmentContainer
                      key={featuredLink.internalID}
                      featuredLink={featuredLink}
                      index={index}
                    />
                  )
                })}
              </Carousel>
            )}
          </Media>

          {genes?.map(gene => {
            if (gene.trendingArtists?.length === 0) return null

            return (
              <React.Fragment key={gene.name}>
                <Media greaterThanOrEqual="sm">
                  <Box my={4}>
                    <Box display="flex" justifyContent="space-between" my={2}>
                      <RouterLink to={gene.href} noUnderline>
                        <Text as="h2" variant="subtitle">
                          {gene.name}
                        </Text>
                      </RouterLink>

                      <RouterLink to={gene.href} noUnderline>
                        <Text variant="subtitle" color="black60">
                          View
                        </Text>
                      </RouterLink>
                    </Box>

                    <GridColumns>
                      {gene.trendingArtists.map(artist => {
                        return (
                          <Column key={artist.internalID} span={[12, 6, 6, 3]}>
                            <ArtistsArtistCardFragmentContainer
                              artist={artist}
                            />
                          </Column>
                        )
                      })}
                    </GridColumns>
                  </Box>
                </Media>

                <Media lessThan="sm">
                  <RouterLink to={gene.href} noUnderline>
                    <Box
                      borderTop="1px solid"
                      borderColor="black10"
                      py={1}
                      display="flex"
                      alignItems="center"
                    >
                      {gene.image && (
                        <Image
                          src={gene.image.thumb.src}
                          srcSet={gene.image.thumb.srcSet}
                          width={gene.image.thumb.width}
                          height={gene.image.thumb.height}
                          alt={gene.name}
                        />
                      )}

                      <Text ml={2} variant="subtitle">
                        {gene.name}
                      </Text>
                    </Box>
                  </RouterLink>
                </Media>
              </React.Fragment>
            )
          })}

          <Separator as="hr" my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ArtistsApp, {
  featuredArtists: graphql`
    fragment ArtistsApp_featuredArtists on OrderedSet @relay(plural: true) {
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
    fragment ArtistsApp_featuredGenes on OrderedSet @relay(plural: true) {
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
})
