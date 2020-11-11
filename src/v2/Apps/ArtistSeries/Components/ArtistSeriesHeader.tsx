import React from "react"
import {
  Box,
  Clickable,
  Col,
  EntityHeader,
  Flex,
  HTML,
  Image,
  ReadMore,
  Row,
  Separator,
  Text,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistSeriesHeader_artistSeries } from "v2/__generated__/ArtistSeriesHeader_artistSeries.graphql"
import { ContextModule } from "@artsy/cohesion"
import styled from "styled-components"
import { unitlessBreakpoints } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries
}

interface ArtistsInfoProps {
  artist: ArtistSeriesHeader_artistSeries["artists"][0]
  contextOwnerId: string
  contextOwnerSlug: string
}

const ArtistInfo: React.FC<ArtistsInfoProps> = props => {
  /* Displays artist name, avatar and follow button. We currently assume
     that an artist series will have one artist. */
  const { artist } = props

  return (
    <EntityHeader
      smallVariant
      name={artist.name}
      imageUrl={artist.image?.cropped?.src}
      href={artist.href}
      FollowButton={
        <FollowArtistButton
          artist={artist}
          contextModule={ContextModule.featuredArtists}
          render={({ is_followed }) => {
            return (
              <Clickable
                data-test="followArtistButton"
                textDecoration="underline"
              >
                <Text variant="text">
                  {is_followed ? "Following" : "Follow"}
                </Text>
              </Clickable>
            )
          }}
        />
      }
    />
  )
}

const ArtistSeriesHeader: React.FC<ArtistSeriesHeaderProps> = props => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <ArtistSeriesHeaderLarge {...props} />
      </Media>

      <Media lessThan="sm">
        <ArtistSeriesHeaderSmall {...props} />
      </Media>
    </>
  )
}

const ArtistSeriesHeaderLarge: React.FC<ArtistSeriesHeaderProps> = props => {
  const {
    artistSeries: {
      title,
      descriptionFormatted,
      artists,
      image,
      artworksCountMessage,
      internalID,
      slug,
    },
  } = props
  return (
    <>
      <Box m={2}>
        <AppContainer>
          <Flex alignItems="center" justifyContent="center" position="relative">
            <Flex position="absolute" left={0}>
              {artists.length && (
                <ArtistInfo
                  contextOwnerId={internalID}
                  contextOwnerSlug={slug}
                  artist={artists[0]}
                />
              )}
            </Flex>

            <Text variant="text">Series</Text>
          </Flex>
        </AppContainer>
      </Box>

      <Separator />

      <Box m={3}>
        <AppContainer>
          <Row>
            <Col sm={6}>
              <Flex
                height="100%"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box>
                  <Text as="h1" variant="largeTitle">
                    {title}
                  </Text>

                  <Text variant="text" color="black60">
                    {artworksCountMessage}
                  </Text>
                </Box>

                <HTML pr={[0, 2]} variant="text">
                  <ReadMore content={descriptionFormatted} maxChars={320} />
                </HTML>
              </Flex>
            </Col>

            <Col sm={6}>
              <Box
                height={"100%"}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                {/** The max width for the image is ~600px, so we need that */}
                <HeaderImage src={image?.sm?.url} />
              </Box>
            </Col>
          </Row>
        </AppContainer>
      </Box>
    </>
  )
}

const ArtistSeriesHeaderSmall: React.FC<ArtistSeriesHeaderProps> = props => {
  const {
    artistSeries: {
      title,
      descriptionFormatted,
      artists,
      image,
      slug,
      internalID,
    },
  } = props
  return (
    <>
      <Box textAlign="center" p={1}>
        <Text variant="text">Series</Text>
      </Box>

      <Separator />

      <Box m={3}>
        <HeaderImage src={image?.xs?.url} pb={1} />

        <Text as="h1" variant="largeTitle" my={1}>
          {title}
        </Text>

        {artists.length && (
          <ArtistInfo
            contextOwnerId={internalID}
            contextOwnerSlug={slug}
            artist={artists[0]}
          />
        )}

        <HTML variant="text" my={1}>
          <ReadMore content={descriptionFormatted} maxChars={200} />
        </HTML>
      </Box>
    </>
  )
}

export const HeaderImage = styled(Image)`
  border-radius: 2px;

  @media (max-width: ${unitlessBreakpoints.sm - 1}px) {
    max-width: 180px;
    max-height: 180px;
    margin: auto;
  }

  @media (min-width: ${unitlessBreakpoints.sm}px) {
    max-height: 400px;
    width: 100%;
    object-fit: cover;
  }
`

export const ArtistSeriesHeaderFragmentContainer = createFragmentContainer(
  ArtistSeriesHeader,
  {
    artistSeries: graphql`
      fragment ArtistSeriesHeader_artistSeries on ArtistSeries {
        title
        slug
        internalID
        artworksCountMessage
        descriptionFormatted(format: HTML)
        image {
          xs: cropped(height: 360, width: 360, version: "large") {
            url
          }
          sm: resized(width: 1200, version: "normalized") {
            url
          }
          url
        }
        artists(size: 1) {
          name
          image {
            cropped(width: 30, height: 30) {
              src
            }
          }
          href
          slug
          internalID
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)
