import {
  Box,
  Flex,
  Image,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { SaveButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveButton"
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

const MAX_ARTISTS = 7
const MAX_ARTWORKS = 5

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

        <Flex gap={1}>
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

      <Flex flexDirection={["column", "row"]} px={2} pb={2} gap={4}>
        {/* Artists */}
        <Box width={["auto", 280]} flexShrink={0}>
          <SectionLabel>Artists</SectionLabel>

          {loading
            ? Array.from({ length: MAX_ARTISTS }).map((_, i) => (
                <ArtistRowSkeleton key={i} />
              ))
            : active.artists
                .slice(0, MAX_ARTISTS)
                .map(item => (
                  <ArtistRow
                    key={item.internalID}
                    item={item}
                    hydrated={artistById.get(item.internalID)}
                    onNavigate={onNavigate}
                  />
                ))}
        </Box>

        <Box
          width="1px"
          bg="mono10"
          alignSelf="stretch"
          flexShrink={0}
          display={["none", "block"]}
        />

        {/* Artworks */}
        <Box flex={1} overflow="hidden">
          <SectionLabel>Artworks</SectionLabel>

          <Flex gap={2} mt={1} alignItems="flex-end">
            {loading
              ? Array.from({ length: MAX_ARTWORKS }).map((_, i) => (
                  <ArtworkCardSkeleton key={i} />
                ))
              : active.artworks
                  .slice(0, MAX_ARTWORKS)
                  .map(item => (
                    <ArtworkCard
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

const ARTIST_IMAGE_SIZE = 48

const ArtistRow: FC<{
  item: TrendingArtist
  hydrated?: HydratedArtist
  onNavigate?: () => void
}> = ({ item, hydrated, onNavigate }) => {
  const image = hydrated?.coverArtwork?.image?.cropped
  const href = hydrated?.href ?? `/artist/${item.slug}`

  return (
    <RowLink to={href} onClick={onNavigate}>
      <Text variant="sm" color="mono60" width={16} flexShrink={0}>
        {item.rank}
      </Text>

      {image?.src ? (
        <Image
          src={image.src}
          srcSet={image.srcSet}
          width={ARTIST_IMAGE_SIZE}
          height={ARTIST_IMAGE_SIZE}
          alt=""
          style={{ objectFit: "cover", flexShrink: 0 }}
        />
      ) : (
        <Flex
          width={ARTIST_IMAGE_SIZE}
          height={ARTIST_IMAGE_SIZE}
          bg="mono10"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text variant="xs" color="mono60">
            {hydrated?.initials ?? item.name?.[0]}
          </Text>
        </Flex>
      )}

      <Box flex={1} overflow="hidden">
        <Text variant="sm-display" overflowEllipsis>
          {hydrated?.name ?? item.name}
        </Text>
        {item.nationality && (
          <Text variant="xs" color="mono60" overflowEllipsis>
            {item.nationality}
          </Text>
        )}
      </Box>
    </RowLink>
  )
}

const ARTWORK_IMAGE_HEIGHT = 230

const ArtworkCard: FC<{
  item: TrendingArtwork
  hydrated?: HydratedArtwork
  onNavigate?: () => void
}> = ({ item, hydrated, onNavigate }) => {
  const image = hydrated?.image?.resized
  const href = hydrated?.href ?? `/artwork/${item.slug}`

  if (!hydrated || !image?.src) {
    return null
  }

  return (
    <Box flex={1} minWidth={0}>
      <RouterLink to={href} onClick={onNavigate} display="block">
        <Flex height={ARTWORK_IMAGE_HEIGHT} alignItems="flex-end">
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt={hydrated.title ?? ""}
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Flex>
      </RouterLink>

      <Flex mt={1} alignItems="flex-start" justifyContent="space-between">
        <RouterLink
          to={href}
          onClick={onNavigate}
          display="block"
          textDecoration="none"
          overflow="hidden"
        >
          <Text variant="sm-display" overflowEllipsis>
            {hydrated.artistNames ?? item.artistName}
          </Text>
          <Text variant="xs" color="mono60">
            {hydrated.title}
            {hydrated.date ? `, ${hydrated.date}` : ""}
          </Text>
          {hydrated.partner?.name && (
            <Text variant="xs" color="mono60" overflowEllipsis>
              {hydrated.partner.name}
            </Text>
          )}
          {hydrated.saleMessage && (
            <Text variant="xs" fontWeight="bold" mt={0.5}>
              {hydrated.saleMessage}
            </Text>
          )}
        </RouterLink>

        <Box flexShrink={0} ml={1}>
          <SaveButtonFragmentContainer
            artwork={hydrated}
            contextModule={ContextModule.header}
          />
        </Box>
      </Flex>
    </Box>
  )
}

const ArtistRowSkeleton: FC = () => (
  <Flex alignItems="center" gap={1} py={1}>
    <SkeletonBox width={ARTIST_IMAGE_SIZE} height={ARTIST_IMAGE_SIZE} ml={3} />
    <Box flex={1}>
      <SkeletonText variant="sm-display">Artist name</SkeletonText>
      <SkeletonText variant="xs">Nationality</SkeletonText>
    </Box>
  </Flex>
)

const ArtworkCardSkeleton: FC = () => (
  <Box flex={1} minWidth={0}>
    <SkeletonBox width="100%" height={ARTWORK_IMAGE_HEIGHT} />
    <SkeletonText variant="sm-display" mt={1}>
      Artist name
    </SkeletonText>
    <SkeletonText variant="xs">Artwork title, date</SkeletonText>
    <SkeletonText variant="xs">Partner</SkeletonText>
  </Box>
)

const SectionLabel = styled(Text).attrs({
  variant: "sm",
  color: "mono60",
})``

const Tab = styled.button<{ selected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 16px;
  white-space: nowrap;
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
  gap: 12px;
  padding: 6px 8px;
  text-decoration: none;

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
            width: 96
            height: 96
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
          date
          artistNames
          saleMessage
          partner(shallow: true) {
            name
          }
          image {
            resized(
              width: 240
              height: 230
              version: ["larger", "large", "medium"]
            ) {
              src
              srcSet
              width
              height
            }
          }
          ...SaveButton_artwork
        }
      }
    }
  }
`
