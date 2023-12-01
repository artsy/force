import * as React from "react"
import {
  Column,
  GridColumns,
  HTML,
  Image,
  ReadMore,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesHeader_artistSeries$data } from "__generated__/ArtistSeriesHeader_artistSeries.graphql"
import { TopContextBar } from "Components/TopContextBar"

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
  if (artists === null || !artists?.length) return null

  const [artist] = artists

  if (!artist) return null

  return (
    <>
      <TopContextBar
        href={artist.href}
        displayBackArrow
        src={artist.image?.url}
      >
        {artist.name}
      </TopContextBar>

      <Spacer y={4} />

      <GridColumns gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text variant="xs" mb={1}>
            Series
          </Text>

          <Text variant="xl" as="h1" mb={1}>
            {title}
          </Text>

          <Text variant="sm-display" mb={1}>
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
            url
          }
          href
          slug
          internalID
        }
      }
    `,
  }
)
