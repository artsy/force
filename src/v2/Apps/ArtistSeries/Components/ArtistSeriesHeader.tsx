import * as React from "react"
import {
  ChevronIcon,
  Clickable,
  Column,
  EntityHeader,
  Flex,
  GridColumns,
  HTML,
  Image,
  ReadMore,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistSeriesHeader_artistSeries$data } from "v2/__generated__/ArtistSeriesHeader_artistSeries.graphql"
import { ContextModule } from "@artsy/cohesion"
import { TopContextBar } from "v2/Components/TopContextBar"
import { RouterLink } from "v2/System/Router/RouterLink"

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries$data
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
      <TopContextBar>
        <Flex alignItems="center">
          <RouterLink
            to={artist.href!}
            style={{ display: "flex", alignItems: "center" }}
            tabIndex={-1}
          >
            <ChevronIcon direction="left" mr={1} />
          </RouterLink>

          <EntityHeader
            justifyContent="flex-start"
            smallVariant
            name={artist.name!}
            imageUrl={artist.image?.cropped?.src}
            href={artist.href!}
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
                      <Text variant="md">
                        {is_followed ? "Following" : "Follow"}
                      </Text>
                    </Clickable>
                  )
                }}
              />
            }
          />
        </Flex>
      </TopContextBar>

      <Spacer mt={4} />

      <GridColumns gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text variant="xs" textTransform="uppercase" mb={1}>
            Series
          </Text>

          <Text variant="xl" as="h1" mb={1}>
            {title}
          </Text>

          <Text variant="md" mb={1}>
            {artworksCountMessage}
          </Text>

          {descriptionFormatted && (
            <HTML variant="sm">
              <ReadMore content={descriptionFormatted} maxChars={1000} />
            </HTML>
          )}
        </Column>

        {image?.cropped?.src && (
          <Column span={6}>
            <ResponsiveBox
              aspectWidth={image.cropped.width}
              aspectHeight={image.cropped.height}
              maxWidth="100%"
            >
              <Image
                // When navigating from series to series, if this isn't keyed
                // the image will be stale for a moment while the new one loads
                key={image.cropped.src}
                src={image.cropped.src}
                srcSet={image.cropped.srcSet}
                width="100%"
                height="100%"
                alt={`${title} by ${artist.name}`}
                lazyLoad
              />
            </ResponsiveBox>
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
          cropped(width: 670, height: 500, version: "normalized") {
            src
            srcSet
            width
            height
          }
        }
        artists(size: 1) {
          name
          image {
            cropped(width: 60, height: 60) {
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
