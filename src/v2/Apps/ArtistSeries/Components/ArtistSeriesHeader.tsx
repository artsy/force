import React from "react"
import {
  Box,
  Col,
  EntityHeader,
  Flex,
  Grid,
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

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries
}

const ArtistsInfo = (artists: ArtistSeriesHeader_artistSeries["artists"]) => {
  const { user, mediator } = useSystemContext()
  // We're guaranteed to have at most one artist in an artist series for now.
  const artist = artists[0] ?? null
  if (artist) {
    return (
      <EntityHeader
        smallVariant
        name={artist.name}
        imageUrl={artist.image?.url}
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
  } else {
    return null
  }
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
    artistSeries: { title, description, artists },
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
          {ArtistsInfo(artists)}
        </Flex>
        <Sans size="3">Series</Sans>
      </Flex>
      <Separator />
      <Box m={3}>
        <Grid>
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
                // FIXME: Use Image
                bg="black10"
                width={1}
                height={400}
              ></Box>
            </Col>
          </Row>
        </Grid>
      </Box>
    </>
  )
}

const ArtistSeriesHeaderSmall: React.FC<ArtistSeriesHeaderProps> = props => {
  const {
    artistSeries: { title, description, artists },
  } = props
  return (
    <>
      <Box textAlign="center" p={1}>
        <Sans size="3">Series</Sans>
      </Box>
      <Separator />
      <Box m={3}>
        <Box
          // FIXME: Use Image
          mx="auto"
          bg="black10"
          width={180}
          height={180}
        ></Box>
        <Sans size="8" element="h1" my={1} unstable_trackIn>
          {title}
        </Sans>
        {ArtistsInfo(artists)}
        <Box my={1}>
          <Sans lineHeight={1.5} size="3t">
            {description}
          </Sans>
        </Box>
      </Box>
    </>
  )
}

export const ArtistSeriesHeaderFragmentContainer = createFragmentContainer(
  ArtistSeriesHeader,
  {
    artistSeries: graphql`
      fragment ArtistSeriesHeader_artistSeries on ArtistSeries {
        title
        description
        artists(size: 1) {
          name
          isFollowed
          image {
            url
          }
          slug
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)
