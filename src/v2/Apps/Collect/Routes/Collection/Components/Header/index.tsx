import { ContextModule } from "@artsy/cohesion"
import { EntityHeader, ReadMore, Text, breakpoints } from "@artsy/palette"
import { Box, Col, Flex, Grid, Row, Spacer, color, media } from "@artsy/palette"
import { Header_artworks } from "v2/__generated__/Header_artworks.graphql"
import { Header_collection } from "v2/__generated__/Header_collection.graphql"
import { CollectionDefaultHeaderFragmentContainer as CollectionDefaultHeader } from "v2/Apps/Collect/Routes/Collection/Components/Header/DefaultHeader"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { unica } from "v2/Assets/Fonts"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { Link } from "found"
import { filter, take } from "lodash"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { resize } from "v2/Utils/resizer"
import { Responsive } from "v2/Utils/Responsive"
import { FeaturedArtists } from "./FeaturedArtists"

export interface Props {
  collection: Header_collection
  artworks: Header_artworks
}

export const getFeaturedArtists = (
  artistsCount: number,
  collection: Header_collection,
  merchandisableArtists: Header_artworks["merchandisableArtists"]
): Header_artworks["merchandisableArtists"] => {
  if (collection.query.artistIDs?.length > 0) {
    return filter(merchandisableArtists, artist =>
      collection.query.artistIDs.includes(artist.internalID)
    )
  }

  if (merchandisableArtists?.length > 0) {
    const filteredArtistsIds = merchandisableArtists.filter(artist => {
      return !collection.featuredArtistExclusionIds.includes(artist.internalID)
    })
    return take(filteredArtistsIds, artistsCount)
  }

  // No artists
  return []
}

export const featuredArtistsEntityCollection: (
  artists: Header_artworks["merchandisableArtists"]
) => JSX.Element[] = artists => {
  return artists.map((artist, index) => {
    const hasArtistMetaData = artist.nationality && artist.birthday
    return (
      <Box
        width={["100%", "33%", "33%", "25%"]}
        key={index}
        pb={20}
        data-test={ContextModule.featuredArtistsRail}
      >
        <EntityHeader
          imageUrl={artist.image.resized.url}
          name={artist.name}
          meta={
            hasArtistMetaData
              ? `${artist.nationality}, b. ${artist.birthday}`
              : undefined
          }
          href={`/artist/${artist.slug}`}
          FollowButton={
            <FollowArtistButton
              artist={artist}
              contextModule={ContextModule.featuredArtistsRail}
              render={({ is_followed }) => {
                return (
                  <Text
                    data-test="followArtistButton"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {is_followed ? "Following" : "Follow"}
                  </Text>
                )
              }}
            />
          }
        />
      </Box>
    )
  })
}

const maxChars = {
  xs: 350,
  sm: 730,
  md: 670,
  lg: 660,
  xl: 820,
}

const imageWidthSizes = {
  xs: 320,
  sm: 688,
  md: 820,
  lg: 944,
  xl: 1112,
}

const imageHeightSizes = {
  xs: 160,
  sm: 250,
}

export const CollectionHeader: FC<Props> = ({ artworks, collection }) => {
  const hasMultipleArtists =
    artworks.merchandisableArtists && artworks.merchandisableArtists.length > 1

  const htmlUnsafeDescription = collection.description && (
    <span dangerouslySetInnerHTML={{ __html: collection.description }} />
  )

  return (
    <Responsive>
      {({ xs, sm, md, lg }) => {
        const size = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : "xl"
        const imageWidth = imageWidthSizes[size]
        const smallerScreen = xs || sm
        const imageHeight = smallerScreen
          ? imageHeightSizes.xs
          : imageHeightSizes.sm
        const chars = maxChars[size]
        const categoryTarget = `/collections#${slugify(collection.category)}`
        const artistsCount = xs ? 9 : 12
        const featuredArtists = featuredArtistsEntityCollection(
          getFeaturedArtists(
            artistsCount,
            collection,
            artworks.merchandisableArtists
          )
        )
        const resizedHeaderImage =
          collection.headerImage &&
          resize(collection.headerImage, {
            width: imageWidth * (xs ? 2 : 1),
            height: imageHeight * (xs ? 2 : 1),
            quality: 80,
            convert_to: "jpg",
          })

        return (
          <header>
            <Flex flexDirection="column">
              <Box>
                {resizedHeaderImage ? (
                  <CollectionSingleImageHeader
                    p={2}
                    headerImageUrl={resizedHeaderImage}
                    height={imageHeight}
                    key="singleImageHeader"
                  >
                    <Overlay />

                    {collection.credit && (
                      <ImageCaption
                        dangerouslySetInnerHTML={{ __html: collection.credit }}
                      />
                    )}
                  </CollectionSingleImageHeader>
                ) : (
                  <CollectionDefaultHeader
                    headerArtworks={artworks}
                    collectionId={collection.id}
                    collectionSlug={collection.slug}
                    key={collection.slug}
                  />
                )}

                <Box
                  mt={[2, 3]}
                  maxWidth={breakpoints.xl}
                  mx="auto"
                  width="100%"
                >
                  <HorizontalPadding>
                    <MetaContainer my={2}>
                      <BreadcrumbContainer mt={[2, 0]}>
                        <Link to="/collect">All works</Link> /{" "}
                        <Link to={categoryTarget}>{collection.category}</Link>
                      </BreadcrumbContainer>

                      <Spacer mt={1} />

                      <Text variant="largeTitle" as="h1">
                        {collection.title}
                      </Text>
                    </MetaContainer>

                    <Grid>
                      <Row>
                        <Col sm="12" md="8">
                          <Flex>
                            <ExtendedText size="3">
                              {smallerScreen ? (
                                <ReadMore
                                  maxChars={chars}
                                  content={htmlUnsafeDescription || ""}
                                />
                              ) : (
                                htmlUnsafeDescription
                              )}
                              {collection.description && <Spacer mt={2} />}
                            </ExtendedText>
                          </Flex>
                        </Col>

                        <Col sm={12} md={12}>
                          {featuredArtists && hasMultipleArtists && (
                            <FeaturedArtists
                              breakpointSize={size}
                              featuredArtists={featuredArtists}
                              hasMultipleArtists={hasMultipleArtists}
                            />
                          )}
                        </Col>
                      </Row>
                    </Grid>
                  </HorizontalPadding>
                </Box>

                <Spacer mb={1} />
              </Box>
            </Flex>

            <Spacer mb={2} />
          </header>
        )
      }}
    </Responsive>
  )
}

const CollectionSingleImageHeader = styled(Box)<{
  headerImageUrl: string
  height: number
}>`
  position: relative;
  background: ${color("black30")};
  height: ${props => props.height}px;
  background-image: url(${props => props.headerImageUrl});
  background-size: cover;
  background-position: center;

  ${media.xs`
    margin-left: -20px;
    margin-right: -20px;
  `};
`
export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25)
  );
  z-index: 0;
`

const MetaContainer = styled(Box)`
  position: relative;
  z-index: 1;
`

const BreadcrumbContainer = styled(Text)`
  a {
    text-decoration: none;
  }
`

const ImageCaption = styled(Box)`
  ${unica("s12")};
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  text-align: right;
  color: ${color("white100")};
  z-index: 7;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`

const ExtendedText = styled(Text)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
      ${unica("s12")};
    }
  }
`

export const CollectionFilterFragmentContainer = createFragmentContainer(
  CollectionHeader as FC<Props>,
  {
    collection: graphql`
      fragment Header_collection on MarketingCollection {
        category
        credit
        description
        featuredArtistExclusionIds
        headerImage
        id
        query {
          artistIDs
        }
        slug
        title
      }
    `,
    artworks: graphql`
      fragment Header_artworks on FilterArtworksConnection {
        ...DefaultHeader_headerArtworks
        merchandisableArtists {
          slug
          internalID
          name
          image {
            resized(width: 45, height: 45, version: "square") {
              url
            }
          }
          birthday
          nationality
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)
