import {
  Box,
  Flex,
  Image,
  ShelfScrollBar,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
  useResizeObserver,
} from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { SaveButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveButton"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import { type FC, useEffect, useMemo, useState } from "react"
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

  // Held in state (not a ref) so the scrollbar re-renders once the rail mounts
  const [railElement, setRailElement] = useState<HTMLDivElement | null>(null)
  const [isRailScrollable, setIsRailScrollable] = useState(false)

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

  const updateRailScrollability = () => {
    if (!railElement) return
    setIsRailScrollable(railElement.scrollWidth > railElement.clientWidth)
  }

  // Re-check when the rail mounts or its content changes (tab switch, load)…
  // biome-ignore lint/correctness/useExhaustiveDependencies: activeIndex/loading change the rail's content
  useEffect(updateRailScrollability, [railElement, activeIndex, loading])

  // …and when the rail resizes (viewport changes)
  useResizeObserver({ target: railElement, onResize: updateRailScrollability })

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
    // px matches the results dropdown rows (SuggestionItemLink px={2}) so the
    // edge-to-content spacing stays consistent when the surfaces swap.
    <Box p={2}>
      <Text variant={["md", "lg-display"]}>Trending on Artsy</Text>

      <Spacer y={2} />

      <Flex flexDirection={["column", "row"]} gap={2}>
        {/* Artists */}
        <Box width={["auto", 260]} flexShrink={0}>
          <SectionLabel>Artists</SectionLabel>

          <Spacer y={1} />

          {loading
            ? Array.from({ length: MAX_ARTISTS }).map((_, i) => {
                return <ArtistRowSkeleton key={i} />
              })
            : active.artists.slice(0, MAX_ARTISTS).map(item => {
                return (
                  <ArtistRow
                    key={item.internalID}
                    item={item}
                    hydrated={artistById.get(item.internalID)}
                    onNavigate={onNavigate}
                  />
                )
              })}
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

          <Spacer y={1} />

          <ArtworkRail ref={setRailElement} gap={2} alignItems="flex-end">
            {loading
              ? Array.from({ length: MAX_ARTWORKS }).map((_, i) => {
                  return <ArtworkCardSkeleton key={i} />
                })
              : active.artworks.slice(0, MAX_ARTWORKS).map(item => {
                  return (
                    <ArtworkCard
                      key={item.internalID}
                      item={item}
                      hydrated={artworkById.get(item.internalID)}
                      onNavigate={onNavigate}
                    />
                  )
                })}
          </ArtworkRail>

          {/* Same scroll affordance as the homepage artwork rails; hidden
              entirely when all artworks already fit */}
          {isRailScrollable && (
            <>
              <Spacer y={1} />

              <ShelfScrollBar viewport={railElement} />
            </>
          )}
        </Box>
      </Flex>

      <Spacer y={2} />

      <Flex justifyContent="flex-end" gap={1}>
        {TRENDING_WINDOWS.map((w, i) => {
          return (
            <Tab
              key={w.window}
              selected={i === activeIndex}
              aria-pressed={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              type="button"
            >
              {w.label}
            </Tab>
          )
        })}
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

const ARTWORK_IMAGE_HEIGHT = 200
// Cards keep at least this width; the rail scrolls when space runs out.
// Slightly narrower from `sm` up so all five artworks fit inside the panel
// on typical desktop viewports (≥ ~1240px) without scrolling.
const ARTWORK_CARD_FLEX = ["1 0 160px", "1 0 135px"]

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
    <Box flex={ARTWORK_CARD_FLEX} minWidth={0}>
      <RouterLink to={href} onClick={onNavigate} display="block">
        <Box width="100%" height={ARTWORK_IMAGE_HEIGHT}>
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt={hydrated.title ?? ""}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom left",
            }}
          />
        </Box>
      </RouterLink>

      <Box position="relative" mt={1}>
        <Box position="absolute" top={0} right={0}>
          <SaveButtonFragmentContainer
            artwork={hydrated}
            contextModule={ContextModule.header}
          />
        </Box>

        <RouterLink
          to={href}
          onClick={onNavigate}
          display="block"
          textDecoration="none"
        >
          <Text variant="sm-display" overflowEllipsis pr={4}>
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
      </Box>
    </Box>
  )
}

const ArtistRowSkeleton: FC = () => {
  return (
    <Flex alignItems="center" gap={1} py={1}>
      <SkeletonBox
        width={ARTIST_IMAGE_SIZE}
        height={ARTIST_IMAGE_SIZE}
        ml={3}
      />
      <Box flex={1}>
        <SkeletonText variant="sm-display">Artist name</SkeletonText>
        <SkeletonText variant="xs">Nationality</SkeletonText>
      </Box>
    </Flex>
  )
}

const ArtworkCardSkeleton: FC = () => {
  return (
    <Box flex={ARTWORK_CARD_FLEX} minWidth={0}>
      <SkeletonBox width="100%" height={ARTWORK_IMAGE_HEIGHT} />
      <SkeletonText variant="sm-display" mt={1}>
        Artist name
      </SkeletonText>
      <SkeletonText variant="xs">Artwork title, date</SkeletonText>
      <SkeletonText variant="xs">Partner</SkeletonText>
    </Box>
  )
}

const SectionLabel = styled(Text).attrs({
  variant: "sm",
  color: "mono60",
})``

// Horizontally scrollable rail; hides scrollbars like SearchInputPills.
const ArtworkRail = styled(Flex)`
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

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
  /* Bleed the hover background so row content aligns with section labels */
  margin: 0 -8px;
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
              height: 280
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
