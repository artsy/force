import React from "react"
import {
  Column,
  EntityHeader,
  GridColumns,
  HTML,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistSeriesHeader_artistSeries } from "v2/__generated__/ArtistSeriesHeader_artistSeries.graphql"
import { ContextModule } from "@artsy/cohesion"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries
}

const ArtistSeriesHeader: React.FC<ArtistSeriesHeaderProps> = ({
  artistSeries: {
    title,
    descriptionFormatted,
    artists,
    image,
    artworksCountMessage,
  },
}) => {
  if (artists === null) return null
  const [artist] = artists
  if (artist === null) return null

  return (
    <>
      {image?.url && <FullBleedHeader src={image.url} />}

      <Spacer mt={4} />

      <GridColumns>
        <Column span={6}>
          <Text variant="xl" as="h1">
            {title}
          </Text>

          <Text variant="xl" mb={1} color="black60">
            {artworksCountMessage}
          </Text>

          <EntityHeader
            smallVariant
            name={artist.name!}
            imageUrl={artist.image?.cropped?.src}
            href={artist.href!}
            FollowButton={
              <FollowArtistButton
                artist={artist}
                contextModule={ContextModule.featuredArtists}
                buttonProps={{ size: "small", variant: "secondaryOutline" }}
              />
            }
          />
        </Column>

        {descriptionFormatted && (
          <Column span={6}>
            <HTML variant="text">
              <ReadMore content={descriptionFormatted} maxChars={900} />
            </HTML>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

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
