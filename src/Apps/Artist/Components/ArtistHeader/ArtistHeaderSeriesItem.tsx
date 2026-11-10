import { Box, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtistHeaderSeriesItem_artistSeries$key } from "__generated__/ArtistHeaderSeriesItem_artistSeries.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import type { ResponsiveValue } from "styled-system"

interface ArtistHeaderSeriesItemProps {
  artistSeries: ArtistHeaderSeriesItem_artistSeries$key
  width: ResponsiveValue<number>
}

export const ArtistHeaderSeriesItem: FC<ArtistHeaderSeriesItemProps> = ({
  artistSeries,
  width,
}) => {
  const series = useFragment(FRAGMENT, artistSeries)

  const image = series.image?.cropped

  return (
    <RouterLink
      to={`/artist-series/${series.slug}`}
      display="flex"
      flexDirection="column"
      gap={1}
      textDecoration="none"
      width={width}
      flexShrink={0}
    >
      <ResponsiveBox
        aspectWidth={4}
        aspectHeight={3}
        maxWidth="100%"
        bg="mono10"
      >
        {image && (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
          />
        )}
      </ResponsiveBox>

      <Box>
        <Text variant="xs" color="mono100" lineClamp={2}>
          {series.title}
        </Text>

        <Text variant="xs" color="mono60">
          {series.forSaleArtworksCount} available
        </Text>
      </Box>
    </RouterLink>
  )
}

const FRAGMENT = graphql`
  fragment ArtistHeaderSeriesItem_artistSeries on ArtistSeries {
    slug
    title
    forSaleArtworksCount
    image {
      cropped(width: 280, height: 210, version: ["larger", "large"]) {
        src
        srcSet
      }
    }
  }
`
