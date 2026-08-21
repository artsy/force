import {
  ActionType,
  type ClickedArtistGroup,
  ContextModule,
  OwnerType,
  type RailViewed,
  type SelectedItemFromSearch,
} from "@artsy/cohesion"
import CloseIcon from "@artsy/icons/CloseIcon"
import {
  Box,
  Flex,
  type FlexProps,
  Image,
  ShelfScrollBar,
  Spacer,
  Text,
  useResizeObserver,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  type RecentSearch,
  useRecentSearches,
} from "Components/Search/hooks/useRecentSearches"
import { isModifiedClick } from "Components/Search/utils/isModifiedClick"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { trackHelpers } from "Utils/cohesionHelpers"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import {
  type FC,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { TrendingArtworkCard } from "./Components/TrendingArtworkCard"

interface TrendingSearchesProps {
  /** Called after a result is clicked so the parent can close the panel. */
  onNavigate?: () => void
  /**
   * Hosts pass false on remounts within one panel session so that rail
   * impressions count panel opens, not query-threshold crossings.
   */
  shouldTrackImpressions?: boolean
}

// The three windows Metaphysics serves; keys match the query's aliases.
// Fallback labels cover a response with a missing server label.
const TRENDING_WINDOWS = [
  { key: "oneDay", fallbackLabel: "Today" },
  { key: "sevenDays", fallbackLabel: "Past 7 Days" },
  { key: "thirtyDays", fallbackLabel: "Past 30 Days" },
] as const

type TrendingWindowData = NonNullable<
  TrendingSearchesQuery["response"]["searchDropdown"]["oneDay"]
>

type TrendingArtistNode = NonNullable<
  NonNullable<TrendingWindowData["artists"]>[number]["artist"]
>

export const TrendingSearches: FC<TrendingSearchesProps> = ({
  onNavigate,
  shouldTrackImpressions = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const { recentSearches, removeRecentSearch } = useRecentSearches()
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  // One request hydrates all three windows, so tab switches are instant.
  // store-or-network is best-effort reuse across quick panel reopens.
  const { data, loading } = useClientQuery<TrendingSearchesQuery>({
    query: QUERY,
    cacheConfig: { fetchPolicy: "store-or-network" },
  })

  const windows = data?.searchDropdown
  const active = windows?.[TRENDING_WINDOWS[activeIndex].key]

  // Rows whose entity failed to hydrate (e.g. delisted) are dropped;
  // image-less artworks are dropped here (not in the card) so that rail
  // indexes in analytics match the positions users actually see
  const artists = (active?.artists ?? []).flatMap(row => {
    return row.artist ? [row.artist] : []
  })
  const artworks = (active?.artworks ?? []).flatMap(row => {
    return row.artwork?.image?.resized?.src ? [row.artwork] : []
  })

  const windowLabel = (index: number) => {
    return (
      windows?.[TRENDING_WINDOWS[index].key]?.label ??
      TRENDING_WINDOWS[index].fallbackLabel
    )
  }

  // Adoption metric: one impression per rail per panel session, and only for
  // rails that actually showed content — the whole panel waits for the query
  // (see the early return below) so nothing counts before it renders. The
  // session permission is latched at mount because hosts flip the prop to
  // false immediately after the first render of a session.
  const isFirstPanelOfSessionRef = useRef(shouldTrackImpressions)
  const hasTrackedRecentsImpressionRef = useRef(false)
  const hasTrackedTrendingImpressionsRef = useRef(false)

  useEffect(() => {
    if (loading) return
    if (!isFirstPanelOfSessionRef.current) return

    const trackRailViewed = (contextModule: ContextModule) => {
      const event: RailViewed = {
        action: ActionType.railViewed,
        context_module: contextModule,
        context_screen: contextPageOwnerType,
      }
      trackEvent(event)
    }

    if (!hasTrackedRecentsImpressionRef.current && recentSearches.length > 0) {
      hasTrackedRecentsImpressionRef.current = true
      trackRailViewed(ContextModule.recentSearchesRail)
    }

    if (!hasTrackedTrendingImpressionsRef.current) {
      hasTrackedTrendingImpressionsRef.current = true

      if (artists.length > 0) {
        trackRailViewed(ContextModule.trendingArtistsRail)
      }
      if (artworks.length > 0) {
        trackRailViewed(ContextModule.trendingArtworksRail)
      }
    }
  }, [
    loading,
    recentSearches,
    artists,
    artworks,
    trackEvent,
    contextPageOwnerType,
  ])

  // The panel never shows a skeleton, error, or empty state: it stays hidden
  // until the query resolves with something to show, so the dropdown only
  // ever opens over real content.
  const hasContent =
    artists.length > 0 || artworks.length > 0 || recentSearches.length > 0

  if (loading || !windows || !hasContent) {
    return null
  }

  const navigateUnlessModified = (event?: MouseEvent<HTMLElement>) => {
    // A modified click opens a new tab; the panel must stay put
    if (isModifiedClick(event)) return
    onNavigate?.()
  }

  const handleRecentSearchClick = ({
    search,
    index,
    event,
  }: {
    search: RecentSearch
    index: number
    event: MouseEvent<HTMLElement>
  }) => {
    const analyticsEvent: SelectedItemFromSearch = {
      action: ActionType.selectedItemFromSearch,
      context_module: ContextModule.recentSearchesRail,
      destination_path: search.href,
      query: search.label,
      item_id: search.item_id ?? "",
      item_number: index,
      // Raw query submits have no entity type; they navigate to search results
      item_type: search.item_type ?? "Search",
    }
    trackEvent(analyticsEvent)
    navigateUnlessModified(event)
  }

  // Mirrors the untyped pill event in SearchBarInput: the tabs filter the
  // rails in place, so there is no destination to report
  const handleTrendingWindowClick = (index: number) => {
    // Re-clicking the active tab is a no-op, not a switch
    if (index !== activeIndex) {
      trackEvent({
        action_type: ActionType.tappedNavigationTab,
        context_module: ContextModule.trendingSearches,
        subject: windowLabel(index),
      })
    }
    setActiveIndex(index)
  }

  const handleTrendingArtistClick = ({
    internalID,
    slug,
    index,
    event,
  }: {
    internalID: string
    slug: string
    index: number
    event: MouseEvent<HTMLElement>
  }) => {
    const analyticsEvent: ClickedArtistGroup = {
      action: ActionType.clickedArtistGroup,
      context_module: ContextModule.trendingArtistsRail,
      context_page_owner_type: contextPageOwnerType,
      destination_page_owner_type: OwnerType.artist,
      destination_page_owner_id: internalID,
      destination_page_owner_slug: slug,
      horizontal_slide_position: index,
      type: "thumbnail",
    }
    trackEvent(analyticsEvent)
    navigateUnlessModified(event)
  }

  const handleTrendingArtworkClick = ({
    internalID,
    slug,
    index,
    event,
  }: {
    internalID: string
    slug: string
    index: number
    event: MouseEvent<HTMLElement>
  }) => {
    trackEvent(
      trackHelpers.clickedArtworkGroup(
        ContextModule.trendingArtworksRail,
        contextPageOwnerType,
        internalID,
        slug,
        index,
      ),
    )
    navigateUnlessModified(event)
  }

  return (
    // px matches the results dropdown rows (SuggestionItemLink px={2}) so the
    // edge-to-content spacing stays consistent when the surfaces swap.
    <Box p={2}>
      {/* Recent searches first — personalized, most relevant to a returning user */}
      {recentSearches.length > 0 && (
        <>
          <SectionLabel>Recent Searches</SectionLabel>

          <Spacer y={1} />

          {/* Single scrollable row; the hook caps the list at 7 terms, matching Eigen */}
          <ScrollRail
            contentKey={`recents-${recentSearches.length}`}
            gap={1}
            shouldShowScrollBar={false}
          >
            {recentSearches.map((search, index) => {
              return (
                <RecentChip key={search.label}>
                  {/* Links to the destination the user actually visited: an
                      entity page or the search results page */}
                  <RecentChipLink
                    to={search.href}
                    onClick={event => {
                      handleRecentSearchClick({ search, index, event })
                    }}
                  >
                    {search.label}
                  </RecentChipLink>

                  <RecentChipRemove
                    type="button"
                    aria-label={`Remove ${search.label} from recent searches`}
                    onClick={() => removeRecentSearch(search.label)}
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
          weight, and a name/face is faster to recognize than a thumbnail.
          Sections hide entirely when a window has nothing to show. */}
      {artists.length > 0 && (
        <>
          <SectionLabel>Trending Artists</SectionLabel>

          <Spacer y={1} />

          <ScrollRail
            contentKey={`artists-${activeIndex}`}
            shouldShowScrollBar={false}
          >
            {artists.map((artist, index) => {
              return (
                <ArtistAvatar
                  key={artist.internalID}
                  artist={artist}
                  onClick={event => {
                    handleTrendingArtistClick({
                      internalID: artist.internalID,
                      slug: artist.slug,
                      index,
                      event,
                    })
                  }}
                />
              )
            })}
          </ScrollRail>

          <Spacer y={2} />
        </>
      )}

      {artworks.length > 0 && (
        <>
          <SectionLabel>Trending Artworks</SectionLabel>

          <Spacer y={1} />

          <ScrollRail
            contentKey={`artworks-${activeIndex}`}
            alignItems="flex-start"
          >
            {artworks.map((artwork, index) => {
              return (
                <TrendingArtworkCard
                  key={artwork.internalID}
                  artwork={artwork}
                  onClick={event => {
                    handleTrendingArtworkClick({
                      internalID: artwork.internalID,
                      slug: artwork.slug,
                      index,
                      event,
                    })
                  }}
                />
              )
            })}
          </ScrollRail>

          <Spacer y={2} />
        </>
      )}

      {/* Refinement control, not primary content — bottom, per design feedback */}
      <Flex justifyContent="flex-end" gap={1}>
        {TRENDING_WINDOWS.map((w, i) => {
          return (
            <Tab
              key={w.key}
              $isSelected={i === activeIndex}
              aria-pressed={i === activeIndex}
              onClick={() => handleTrendingWindowClick(i)}
              type="button"
            >
              {windowLabel(i)}
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
  shouldShowScrollBar?: boolean
}

// Horizontally scrollable row with the same scroll affordance as the homepage
// artwork rails; the scrollbar is hidden entirely when the content fits.
const ScrollRail: FC<ScrollRailProps> = ({
  children,
  contentKey,
  alignItems,
  gap = 2,
  shouldShowScrollBar = true,
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

      {shouldShowScrollBar && isScrollable && (
        <>
          <Spacer y={1} />

          <ShelfScrollBar viewport={element} />
        </>
      )}
    </>
  )
}

const ARTIST_AVATAR_SIZE = 64

interface ArtistAvatarProps {
  artist: TrendingArtistNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

const ArtistAvatar: FC<ArtistAvatarProps> = ({ artist, onClick }) => {
  const image = artist.coverArtwork?.image?.cropped

  return (
    <AvatarItem to={artist.href ?? `/artist/${artist.slug}`} onClick={onClick}>
      {image?.src ? (
        <AvatarImage
          src={image.src}
          srcSet={image.srcSet}
          width={ARTIST_AVATAR_SIZE}
          height={ARTIST_AVATAR_SIZE}
          alt=""
          // Native attribute, not Palette's lazyLoad prop: the prop swaps in
          // a wrapper Box that receives this styled component's className,
          // breaking the border-radius/object-fit on the actual img
          loading="lazy"
        />
      ) : (
        <AvatarFallback>
          <Text variant="sm" color="mono60">
            {artist.initials ?? artist.name?.[0]}
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
        {artist.name}
      </Text>
    </AvatarItem>
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
  /* Long labels (e.g. article titles) truncate instead of stretching the
     chip; as a flex item the link respects max-width */
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const Tab = styled.button<{ $isSelected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 16px;
  white-space: nowrap;
  color: ${({ $isSelected }) =>
    $isSelected ? themeGet("colors.mono100") : themeGet("colors.mono60")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? themeGet("colors.mono10") : "transparent"};

  &:hover {
    color: ${themeGet("colors.mono100")};
  }
`

const QUERY = graphql`
  query TrendingSearchesQuery {
    searchDropdown {
      oneDay: trending(period: ONE_DAY) {
        ...TrendingSearches_trending @relay(mask: false)
      }
      sevenDays: trending(period: SEVEN_DAYS) {
        ...TrendingSearches_trending @relay(mask: false)
      }
      thirtyDays: trending(period: THIRTY_DAYS) {
        ...TrendingSearches_trending @relay(mask: false)
      }
    }
  }
`

// Shared by the three window aliases above, spread with @relay(mask: false)
// so the data is read straight off the query result (no useFragment); the
// SaveButton spread stays masked and is resolved by its fragment container.
export const TRENDING_WINDOW_FRAGMENT = graphql`
  fragment TrendingSearches_trending on TrendingSearches {
    label
    artists(first: 12) {
      internalID
      artist {
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
    }
    artworks(first: 8) {
      internalID
      artwork {
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
        ...SaveArtworkToListsButton_artwork
      }
    }
  }
`
