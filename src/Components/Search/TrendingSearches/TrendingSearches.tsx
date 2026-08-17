import CloseIcon from "@artsy/icons/CloseIcon"
import {
  Box,
  Flex,
  type FlexProps,
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
import { type FC, type ReactNode, useEffect, useMemo, useState } from "react"
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

const MAX_ARTISTS = 12
const MAX_ARTWORKS = 8
// Matches the recent-searches limit in the Eigen app
const MAX_RECENT_SEARCHES = 7

// Mocked until recent searches are actually persisted (module-level so
// removals survive closing/reopening the panel, mirroring what a
// localStorage-backed implementation would do).
let mockRecentSearches = [
  "banksy",
  "yayoi kusama",
  "picasso prints",
  "photography",
  "david hockney",
  "monet",
  "sculpture",
  "street art",
]

export const TrendingSearches: FC<TrendingSearchesProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = TRENDING_WINDOWS[activeIndex]

  const [recentSearches, setRecentSearches] = useState(mockRecentSearches)

  const handleRemoveRecentSearch = (term: string) => {
    const next = recentSearches.filter(t => t !== term)
    mockRecentSearches = next
    setRecentSearches(next)
  }

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
    // px matches the results dropdown rows (SuggestionItemLink px={2}) so the
    // edge-to-content spacing stays consistent when the surfaces swap.
    <Box p={2}>
      {/* Recent searches first — personalized, most relevant to a returning user */}
      {recentSearches.length > 0 && (
        <>
          <SectionLabel>Recent Searches</SectionLabel>

          <Spacer y={1} />

          {/* Single scrollable row capped at 7 terms, matching Eigen */}
          <ScrollRail
            contentKey={`recents-${recentSearches.length}`}
            gap={1}
            showScrollBar={false}
          >
            {recentSearches.slice(0, MAX_RECENT_SEARCHES).map(term => {
              return (
                <RecentChip key={term}>
                  <RecentChipLink
                    to={`/search?term=${encodeURIComponent(term)}`}
                    onClick={onNavigate}
                  >
                    {term}
                  </RecentChipLink>

                  <RecentChipRemove
                    type="button"
                    aria-label={`Remove ${term} from recent searches`}
                    onClick={() => handleRemoveRecentSearch(term)}
                  >
                    <CloseIcon width={12} height={12} fill="mono60" />
                  </RecentChipRemove>
                </RecentChip>
              )
            })}
          </ScrollRail>

          <Spacer y={2} />
        </>
      )}

      {/* Artists before artworks: artist page views carry the highest signal
          weight, and a name/face is faster to recognize than a thumbnail */}
      <SectionLabel>Trending Artists</SectionLabel>

      <Spacer y={1} />

      <ScrollRail
        contentKey={`artists-${activeIndex}-${loading}`}
        showScrollBar={false}
      >
        {loading
          ? Array.from({ length: 7 }).map((_, i) => {
              return <ArtistAvatarSkeleton key={i} />
            })
          : active.artists.slice(0, MAX_ARTISTS).map(item => {
              return (
                <ArtistAvatar
                  key={item.internalID}
                  item={item}
                  hydrated={artistById.get(item.internalID)}
                  onNavigate={onNavigate}
                />
              )
            })}
      </ScrollRail>

      <Spacer y={2} />

      <SectionLabel>Trending Artworks</SectionLabel>

      <Spacer y={1} />

      <ScrollRail
        contentKey={`artworks-${activeIndex}-${loading}`}
        alignItems="flex-end"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => {
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
      </ScrollRail>

      <Spacer y={2} />

      {/* Refinement control, not primary content — bottom, per design feedback */}
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

interface ScrollRailProps {
  children: ReactNode
  /** Changes whenever the rail's content changes, to re-measure overflow */
  contentKey: string
  alignItems?: FlexProps["alignItems"]
  gap?: FlexProps["gap"]
  /** Whether to show the scroll indicator when content overflows */
  showScrollBar?: boolean
}

// Horizontally scrollable row with the same scroll affordance as the homepage
// artwork rails; the scrollbar is hidden entirely when the content fits.
const ScrollRail: FC<ScrollRailProps> = ({
  children,
  contentKey,
  alignItems,
  gap = 2,
  showScrollBar = true,
}) => {
  // Held in state (not a ref) so the scrollbar re-renders once the rail mounts
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  const updateScrollability = () => {
    if (!element) return
    setIsScrollable(element.scrollWidth > element.clientWidth)
  }

  // Re-check when the rail mounts or its content changes (tab switch, load)…
  // biome-ignore lint/correctness/useExhaustiveDependencies: contentKey tracks content changes
  useEffect(updateScrollability, [element, contentKey])

  // …and when the rail resizes (viewport changes)
  useResizeObserver({ target: element, onResize: updateScrollability })

  return (
    <>
      <RailFlex ref={setElement} gap={gap} alignItems={alignItems}>
        {children}
      </RailFlex>

      {showScrollBar && isScrollable && (
        <>
          <Spacer y={1} />

          <ShelfScrollBar viewport={element} />
        </>
      )}
    </>
  )
}

const ARTIST_AVATAR_SIZE = 64

const ArtistAvatar: FC<{
  item: TrendingArtist
  hydrated?: HydratedArtist
  onNavigate?: () => void
}> = ({ item, hydrated, onNavigate }) => {
  const image = hydrated?.coverArtwork?.image?.cropped

  return (
    <AvatarItem
      to={hydrated?.href ?? `/artist/${item.slug}`}
      onClick={onNavigate}
    >
      {image?.src ? (
        <AvatarImage
          src={image.src}
          srcSet={image.srcSet}
          width={ARTIST_AVATAR_SIZE}
          height={ARTIST_AVATAR_SIZE}
          alt=""
        />
      ) : (
        <AvatarFallback>
          <Text variant="sm" color="mono60">
            {hydrated?.initials ?? item.name?.[0]}
          </Text>
        </AvatarFallback>
      )}

      {/* maxWidth is required for the ellipsis: nowrap text otherwise forces
          the flex item wider than the 80px avatar column */}
      <Text
        variant="xs"
        mt={0.5}
        maxWidth="100%"
        overflowEllipsis
        textAlign="center"
      >
        {hydrated?.name ?? item.name}
      </Text>
    </AvatarItem>
  )
}

const ARTWORK_IMAGE_HEIGHT = 200
// Cards keep at least this width; the rail scrolls when space runs out.
const ARTWORK_CARD_FLEX = "1 0 160px"

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

const ArtistAvatarSkeleton: FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center" width={80} flexShrink={0}>
      <SkeletonBox
        width={ARTIST_AVATAR_SIZE}
        height={ARTIST_AVATAR_SIZE}
        borderRadius="50%"
      />
      <SkeletonText variant="xs" mt={0.5}>
        Artist name
      </SkeletonText>
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

// Hides native scrollbars like SearchInputPills; ShelfScrollBar replaces them.
const RailFlex = styled(Flex)`
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const RecentChip = styled(Flex)`
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  gap: 6px;
  padding: 6px 10px 6px 16px;
  border: 1px solid ${themeGet("colors.mono15")};
  border-radius: 20px;

  &:hover {
    border-color: ${themeGet("colors.mono60")};
  }
`

const RecentChipLink = styled(RouterLink)`
  font-size: 13px;
  color: ${themeGet("colors.mono100")};
  text-decoration: none;
`

const RecentChipRemove = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  &:hover svg {
    fill: ${themeGet("colors.mono100")};
  }
`

const AvatarItem = styled(RouterLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 80px;
  text-decoration: none;
`

const AvatarImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`

const AvatarFallback = styled(Flex)`
  width: ${ARTIST_AVATAR_SIZE}px;
  height: ${ARTIST_AVATAR_SIZE}px;
  border-radius: 50%;
  background-color: ${themeGet("colors.mono10")};
  align-items: center;
  justify-content: center;
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
            width: 128
            height: 128
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
