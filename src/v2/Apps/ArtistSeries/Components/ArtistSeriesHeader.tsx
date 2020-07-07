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

import { ArtistSeriesHeader_artistSeries } from "v2/__generated__/ArtistSeriesHeader_artistSeries.graphql"

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries
}

const ArtistInfo = (artist: ArtistSeriesHeader_artistSeries["artists"][0]) => {
  if (artist) {
    return (
      <EntityHeader
        smallVariant
        name={artist.name}
        imageUrl={artist.image?.url as string}
        FollowButton={
          <Sans style={{ textDecorationLine: "underline" }} size="3">
            {artist.isFollowed ? "Following" : "Follow"}
          </Sans>
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
  const artist = artists[0] ?? null
  return (
    <>
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Flex position="absolute" left={3}>
          {ArtistInfo(artist)}
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
    artistSeries: { title, description },
  } = props
  return (
    <>
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
      <Sans lineHeight={1.5} size="3t">
        {description}
      </Sans>
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
          id
          name
          isFollowed
          image {
            url
          }
        }
      }
    `,
  }
)
