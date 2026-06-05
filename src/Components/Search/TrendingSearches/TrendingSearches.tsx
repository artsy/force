import {
  Box,
  Flex,
  Image,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import { type FC, useMemo, useState } from "react"
import { graphql } from "react-relay"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import {
  TRENDING_WINDOWS,
  type TrendingArtist,
  type TrendingArtwork,
} from "./trendingSearchesData"

interface TrendingSearchesProps {
  /** Called after a result is clicked so the parent can close the panel. */
  onNavigate?: () => void
}

type HydratedArtist = NonNullable<
  NonNullable<TrendingSearchesQuery["response"]["artists"]>[number]
>
type HydratedArtwork = NonNullable<
  NonNullable<
    NonNullable<TrendingSearchesQuery["response"]["artworks"]>["edges"]
  >[number]
>["node"]

const MAX_RESULTS = 10

export const TrendingSearches: FC<TrendingSearchesProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = TRENDING_WINDOWS[activeIndex]

  // Fetch the union of all windows' ids once, then filter client-side per tab.
  const { artistIds, artworkIds } = useMemo(() => {
    const artists = new Set<string>()
    const artworks = new Set<string>()
    for (const w of TRENDING_WINDOWS) {
      w.artists.forEach(a => artists.add(a.internalID))
      w.artworks.forEach(a => artworks.add(a.internalID))
    }
    return { artistIds: [...artists], artworkIds: [...artworks] }
  }, [])

  const { data, loading } = useClientQuery<TrendingSearchesQuery>({
    query: QUERY,
    variables: { artistIds, artworkIds },
  })

  const artistById = useMemo(() => {
    const map = new Map<string, HydratedArtist>()
    for (const a of data?.artists ?? []) {
      if (a?.internalID) map.set(a.internalID, a)
    }
    return map
  }, [data])

  const artworkById = useMemo(() => {
    const map = new Map<string, HydratedArtwork>()
    for (const a of extractNodes(data?.artworks)) {
      if (a?.internalID) map.set(a.internalID, a)
    }
    return map
  }, [data])

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={2}
        pt={2}
        pb={1}
      >
        <Text variant="sm-display" fontWeight="bold">
          Trending on Artsy
        </Text>

        <Flex>
          {TRENDING_WINDOWS.map((w, i) => (
            <Tab
              key={w.window}
              selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              type="button"
            >
              {w.label}
            </Tab>
          ))}
        </Flex>
      </Flex>

      <Flex flexDirection={["column", "row"]} px={2} pb={2} gap={2}>
        {/* Artists */}
        <Box flex={1}>
          <SectionLabel>Artists</SectionLabel>

          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ArtistRowSkeleton key={i} />
              ))
            : active.artists
                .slice(0, MAX_RESULTS)
                .map(item => (
                  <ArtistRow
                    key={item.internalID}
                    item={item}
                    hydrated={artistById.get(item.internalID)}
                    onNavigate={onNavigate}
                  />
                ))}
        </Box>

        {/* Artworks */}
        <Box flex={1}>
          <SectionLabel>Artworks</SectionLabel>

          <Flex flexWrap="wrap" gap={1} mt={1}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonBox key={i} width={92} height={92} />
                ))
              : active.artworks
                  .slice(0, MAX_RESULTS)
                  .map(item => (
                    <ArtworkTile
                      key={item.internalID}
                      item={item}
                      hydrated={artworkById.get(item.internalID)}
                      onNavigate={onNavigate}
                    />
                  ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

const GrowthChip: FC<{ growthPct: number | null }> = ({ growthPct }) => {
  if (growthPct === null) {
    return (
      <Text variant="xs" color="blue100" flexShrink={0}>
        New
      </Text>
    )
  }
  const up = growthPct >= 0
  return (
    <Text variant="xs" color={up ? "green100" : "mono60"} flexShrink={0}>
      {up ? "▲" : "▼"} {Math.abs(growthPct)}%
    </Text>
  )
}

const ArtistRow: FC<{
  item: TrendingArtist
  hydrated?: HydratedArtist
  onNavigate?: () => void
}> = ({ item, hydrated, onNavigate }) => {
  const image = hydrated?.coverArtwork?.image?.cropped
  const href = hydrated?.href ?? `/artist/${item.slug}`

  return (
    <RowLink to={href} onClick={onNavigate}>
      <Text variant="xs" color="mono60" width={16} flexShrink={0}>
        {item.rank}
      </Text>

      {image?.src ? (
        <Image
          src={image.src}
          srcSet={image.srcSet}
          width={40}
          height={40}
          alt=""
          style={{ borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
        />
      ) : (
        <Flex
          width={40}
          height={40}
          bg="mono10"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          style={{ borderRadius: 2 }}
        >
          <Text variant="xs" color="mono60">
            {hydrated?.initials ?? item.name?.[0]}
          </Text>
        </Flex>
      )}

      <Box flex={1} overflow="hidden">
        <Text variant="sm" overflowEllipsis>
          {hydrated?.name ?? item.name}
        </Text>
        {item.nationality && (
          <Text variant="xs" color="mono60" overflowEllipsis>
            {item.nationality}
          </Text>
        )}
      </Box>

      <GrowthChip growthPct={item.growthPct} />
    </RowLink>
  )
}

const ArtworkTile: FC<{
  item: TrendingArtwork
  hydrated?: HydratedArtwork
  onNavigate?: () => void
}> = ({ item, hydrated, onNavigate }) => {
  const image = hydrated?.image?.cropped
  const href = hydrated?.href ?? `/artwork/${item.slug}`

  if (!image?.src) return null

  return (
    <RouterLink
      to={href}
      onClick={onNavigate}
      style={{ textDecoration: "none" }}
      title={`${hydrated?.title ?? ""}${
        item.artistName ? ` — ${item.artistName}` : ""
      }`}
    >
      <Image
        src={image.src}
        srcSet={image.srcSet}
        width={92}
        height={92}
        alt={hydrated?.title ?? ""}
        style={{ borderRadius: 2, objectFit: "cover", display: "block" }}
      />
    </RouterLink>
  )
}

const ArtistRowSkeleton: FC = () => (
  <Flex alignItems="center" gap={1} py={1}>
    <SkeletonBox width={40} height={40} ml={3} />
    <Box flex={1}>
      <SkeletonText variant="sm">Artist name</SkeletonText>
      <SkeletonText variant="xs">Nationality</SkeletonText>
    </Box>
  </Flex>
)

const SectionLabel = styled(Text).attrs({
  variant: "xs",
  color: "mono60",
})`
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Tab = styled.button<{ selected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 12px;
  color: ${({ selected }) =>
    selected ? themeGet("colors.mono100") : themeGet("colors.mono60")};
  background-color: ${({ selected }) =>
    selected ? themeGet("colors.mono10") : "transparent"};

  &:hover {
    color: ${themeGet("colors.mono100")};
  }
`

const RowLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  text-decoration: none;
  border-radius: 2px;

  &:hover {
    background-color: ${themeGet("colors.mono5")};
  }
`

const QUERY = graphql`
  query TrendingSearchesQuery($artistIds: [String], $artworkIds: [String]) {
    artists(ids: $artistIds) {
      internalID
      slug
      name
      href
      initials
      coverArtwork {
        image {
          cropped(
            width: 80
            height: 80
            version: ["square", "small", "large"]
          ) {
            src
            srcSet
          }
        }
      }
    }
    artworks(ids: $artworkIds, first: 50, respectParamsOrder: true) {
      edges {
        node {
          internalID
          slug
          href
          title
          image {
            cropped(
              width: 184
              height: 184
              version: ["square", "small", "large"]
            ) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
