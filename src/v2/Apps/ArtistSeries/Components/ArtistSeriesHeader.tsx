import React from "react"
import {
  Box,
  Col,
  EntityHeader,
  Flex,
  HTML,
  Image,
  Row,
  Sans,
  Separator,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { ArtistSeriesHeader_artistSeries } from "v2/__generated__/ArtistSeriesHeader_artistSeries.graphql"
import { useSystemContext } from "v2/Artsy"
import {
  ContextModule,
  Intent,
  OwnerType,
  followedArtist,
} from "@artsy/cohesion"
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
  const { user, mediator } = useSystemContext()
  const { artist, contextOwnerId, contextOwnerSlug } = props
  const { slug, internalID } = artist

  const trackingData = followedArtist({
    contextModule: ContextModule.featuredArtists,
    contextOwnerType: OwnerType.artistSeries,
    contextOwnerId,
    contextOwnerSlug,
    ownerId: internalID,
    ownerSlug: slug,
  })

  return (
    <EntityHeader
      smallVariant
      name={artist.name}
      imageUrl={artist.image?.url}
      href={artist.href}
      FollowButton={
        <FollowArtistButton
          artist={artist}
          useNewAnalyticsSchema
          user={user}
          trackingData={trackingData}
          onOpenAuthModal={() =>
            openAuthToFollowSave(mediator, {
              entity: artist,
              // FIXME: Add artist series to Cohesion
              contextModule: null,
              intent: Intent.followArtist,
            })
          }
          render={({ is_followed }) => {
            return (
              <Sans
                size="3"
                color="black"
                data-test="followArtistButton"
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {is_followed ? "Following" : "Follow"}
              </Sans>
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
      <Box m={3}>
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
            <Sans size="3">Series</Sans>
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
                  <Sans size="8" element="h1" unstable_trackIn>
                    {title}
                  </Sans>
                  <Sans size="3" color="black60">
                    {artworksCountMessage}
                  </Sans>
                </Box>
                <Box pr={[0, 2]}>
                  <HTML variant="text" html={descriptionFormatted} />
                </Box>
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
        <Sans size="3">Series</Sans>
      </Box>
      <Separator />
      <Box m={3}>
        <HeaderImage src={image?.xs?.url} pb={1} />
        <Sans size="8" element="h1" my={1} unstable_trackIn>
          {title}
        </Sans>
        {artists.length && (
          <ArtistInfo
            contextOwnerId={internalID}
            contextOwnerSlug={slug}
            artist={artists[0]}
          />
        )}
        <Box my={1}>
          <HTML variant="text" html={descriptionFormatted} />
        </Box>
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
            url
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
