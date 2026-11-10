import { Flex, Text } from "@artsy/palette"
import { ArtistHeaderSeriesItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSeriesItem"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistHeaderSeries_artist$key } from "__generated__/ArtistHeaderSeries_artist.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistHeaderSeriesProps {
  artist: ArtistHeaderSeries_artist$key
}

export const ArtistHeaderSeries: FC<ArtistHeaderSeriesProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)

  const allSeries = extractNodes(artist.artistSeriesConnection)

  const qualifyingSeries = allSeries.filter(({ forSaleArtworksCount }) => {
    return forSaleArtworksCount >= MINIMUM_FOR_SALE_ARTWORKS
  })

  if (qualifyingSeries.length === 0) {
    return null
  }

  // Order comes from the API and is shared with the series rail lower on the
  // page. Filter and slice only — sorting here would make the two disagree.
  const visibleSeries = qualifyingSeries.slice(0, MAX_VISIBLE_SERIES)
  const hasMoreSeries = qualifyingSeries.length > MAX_VISIBLE_SERIES
  const desktopWidth = getDesktopSeriesWidth(visibleSeries.length)
  const viewMoreHref = artist.href ? `${artist.href}/series` : null
  const heading = artist.name ? `Shop ${artist.name} Series` : "Shop Series"

  const items = visibleSeries.map(artistSeries => {
    return (
      <ArtistHeaderSeriesItem
        key={artistSeries.internalID}
        artistSeries={artistSeries}
        width={[MOBILE_SERIES_WIDTH, desktopWidth]}
      />
    )
  })

  return (
    <Flex flexDirection="column" gap={1}>
      <Flex justifyContent="space-between" alignItems="center" gap={1}>
        <Text variant={["sm-display", "sm"]}>{heading}</Text>

        {hasMoreSeries && viewMoreHref && (
          <RouterLink
            to={viewMoreHref}
            color="mono60"
            textDecoration="underline"
            flexShrink={0}
          >
            <Text variant="xs">View More</Text>
          </RouterLink>
        )}
      </Flex>

      <Flex gap={1} overflowX="auto">
        {items}
      </Flex>
    </Flex>
  )
}

const MINIMUM_FOR_SALE_ARTWORKS = 5

const MAX_VISIBLE_SERIES = 5

const MOBILE_SERIES_WIDTH = 100

const DEFAULT_DESKTOP_SERIES_WIDTH = 100

const DESKTOP_SERIES_WIDTHS: Record<number, number> = {
  1: 140,
  2: 140,
  3: 140,
  4: 120,
}

// Exported for unit testing; the component is the only runtime caller.
export const getDesktopSeriesWidth = (count: number): number => {
  return DESKTOP_SERIES_WIDTHS[count] ?? DEFAULT_DESKTOP_SERIES_WIDTH
}

const FRAGMENT = graphql`
  fragment ArtistHeaderSeries_artist on Artist {
    name
    href
    artistSeriesConnection(first: 10) {
      edges {
        node {
          ...ArtistHeaderSeriesItem_artistSeries
          internalID
          forSaleArtworksCount
        }
      }
    }
  }
`
