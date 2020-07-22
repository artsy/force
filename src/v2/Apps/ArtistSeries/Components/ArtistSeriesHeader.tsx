import React from "react"
import {
  Box,
  Col,
  EntityHeader,
  Flex,
  Grid,
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
import { Intent } from "@artsy/cohesion"
import { resize } from "v2/Utils/resizer"
import styled from "styled-components"
import { unitlessBreakpoints } from "@artsy/palette"

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries
}

interface ArtistsInfoProps {
  artist: ArtistSeriesHeader_artistSeries["artists"][0]
}

const ArtistInfo: React.FC<ArtistsInfoProps> = props => {
  /* Displays artist name, avatar and follow button. We currently assume
     that an artist series will have one artist. */
  const { user, mediator } = useSystemContext()
  const { artist } = props
  return (
    <EntityHeader
      smallVariant
      name={artist.name}
      imageUrl={artist.image?.url}
      href={artist.href}
      FollowButton={
        <FollowArtistButton
          artist={artist}
          user={user}
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
    artistSeries: { title, description, artists, image },
  } = props
  return (
    <>
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Flex position="absolute" left={3}>
          {artists.length && <ArtistInfo artist={artists[0]} />}
        </Flex>
        <Sans size="3">Series</Sans>
      </Flex>
      <Separator />
      <Box m={3}>
        <StyledGrid>
          <Row>
            <Col sm={6}>
              <Flex
                height="100%"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Sans size="8" element="h1" unstable_trackIn>
                  {title}
                </Sans>
                <Sans lineHeight={1.5} size="3t" pr={1}>
                  {description}
                </Sans>
              </Flex>
            </Col>
            <Col sm={6}>
              <Box
                height={"100%"}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <HeaderImage src={resize(image.url, { height: 400 })} />
              </Box>
            </Col>
          </Row>
        </StyledGrid>
      </Box>
    </>
  )
}

const ArtistSeriesHeaderSmall: React.FC<ArtistSeriesHeaderProps> = props => {
  const {
    artistSeries: { title, description, artists, image },
  } = props
  return (
    <>
      <Box textAlign="center" p={1}>
        <Sans size="3">Series</Sans>
      </Box>
      <Separator />
      <Box m={3}>
        <HeaderImage
          src={resize(image.url, { height: 180, width: 180 })}
          pb={1}
        />
        <Sans size="8" element="h1" my={1} unstable_trackIn>
          {title}
        </Sans>
        {artists.length && <ArtistInfo artist={artists[0]} />}
        <Box my={1}>
          <Sans lineHeight={1.5} size="3t">
            {description}
          </Sans>
        </Box>
      </Box>
    </>
  )
}

const StyledGrid = styled(Grid)`
  @media (max-width: ${unitlessBreakpoints.lg - 1}px) {
    max-width: 100%;
  }
`

export const HeaderImage = styled(Image)`
  border-radius: 2px;

  @media (max-width: ${unitlessBreakpoints.sm - 1}px) {
    max-width: 180px;
    max-height: 180px;
    margin: auto;
  }

  @media (min-width: ${unitlessBreakpoints.sm}px) {
    max-height: 400px;
    max-width: 100%;
  }
`

export const ArtistSeriesHeaderFragmentContainer = createFragmentContainer(
  ArtistSeriesHeader,
  {
    artistSeries: graphql`
      fragment ArtistSeriesHeader_artistSeries on ArtistSeries {
        title
        description
        image {
          url
        }
        artists(size: 1) {
          name
          image {
            url
          }
          href
          slug
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)
