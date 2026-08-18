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
import {
  ActionType,
  type ClickedArtistGroup,
  ContextModule,
  OwnerType,
  type RailViewed,
  type SelectedItemFromSearch,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { trackHelpers } from "Utils/cohesionHelpers"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import {
  type FC,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { graphql } from "react-relay"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import {
  type RecentSearch,
  useRecentSearches,
} from "Components/Search/hooks/useRecentSearches"
import { isModifiedClick } from "Components/Search/utils/isModifiedClick"
import {
  ARTWORK_CARD_FLEX,
  ARTWORK_IMAGE_HEIGHT,
  type HydratedArtwork,
  TrendingArtworkCard,
} from "./Components/TrendingArtworkCard"
import { TRENDING_WINDOWS, type TrendingArtist } from "./trendingSearchesData"

interface TrendingSearchesProps {
  /** Called after a result is clicked so the parent can close the panel. */
  onNavigate?: () => void
  /**
   * Hosts pass false on remounts within one panel session so that rail
   * impressions count panel opens, not query-threshold crossings.
   */
  shouldTrackImpressions?: boolean
}

type HydratedArtist = NonNullable<
  NonNullable<TrendingSearchesQuery["response"]["artists"]>[number]
>

const MAX_ARTISTS = 12
const MAX_ARTWORKS = 8

// TODO: Use ContextModule.recentSearchesRail / ContextModule.trendingArtworksRail
// / ContextModule.trendingSearches once the cohesion release containing them
// lands in Force
const RECENT_SEARCHES_RAIL = "recentSearchesRail" as ContextModule
const TRENDING_ARTWORKS_RAIL = "trendingArtworksRail" as ContextModule
const TRENDING_SEARCHES = "trendingSearches" as ContextModule

export const TrendingSearches: FC<TrendingSearchesProps> = ({
  onNavigate,
  shouldTrackImpressions = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = TRENDING_WINDOWS[activeIndex]

  const { recentSearches, removeRecentSearch } = useRecentSearches()
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  // Adoption metric: one impression per visible section per panel session
  // (the hasTracked ref keeps the full dependency list from re-firing)
  const hasTrackedImpressionsRef = useRef(false)

  useEffect(() => {
    if (!shouldTrackImpressions || hasTrackedImpressionsRef.current) return
    hasTrackedImpressionsRef.current = true

    const trackRailViewed = (contextModule: ContextModule) => {
      const event: RailViewed = {
        action: ActionType.railViewed,
        context_module: contextModule,
        context_screen: contextPageOwnerType,
      }
      trackEvent(event)
    }

    if (recentSearches.length > 0) {
      trackRailViewed(RECENT_SEARCHES_RAIL)
    }
    trackRailViewed(ContextModule.trendingArtistsRail)
    trackRailViewed(TRENDING_ARTWORKS_RAIL)
  }, [shouldTrackImpressions, recentSearches, trackEvent, contextPageOwnerType])

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
      context_module: RECENT_SEARCHES_RAIL,
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
        context_module: TRENDING_SEARCHES,
        subject: TRENDING_WINDOWS[index].label,
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
        TRENDING_ARTWORKS_RAIL,
        contextPageOwnerType,
        internalID,
        slug,
        index,
      ),
    )
    navigateUnlessModified(event)
  }

  // Fetch the union of all windows' ids once, then filter client-side per tab.
  const { artistIds, artworkIds } = useMemo(() => {
    const artists = new Set<string>()
    const artworks = new Set<string>()
    TRENDING_WINDOWS.forEach(w => {
      w.artists.forEach(a => artists.add(a.internalID))
      w.artworks.forEach(a => artworks.add(a.internalID))
    })
    return { artistIds: [...artists], artworkIds: [...artworks] }
  }, [])

  const { data, loading } = useClientQuery<TrendingSearchesQuery>({
    query: QUERY,
    variables: { artistIds, artworkIds },
  })

  const artistById = useMemo(() => {
    const map = new Map<string, HydratedArtist>()
    ;(data?.artists ?? []).forEach(a => {
      if (a?.internalID) map.set(a.internalID, a)
    })
    return map
  }, [data])

  const artworkById = useMemo(() => {
    const map = new Map<string, HydratedArtwork>()
    extractNodes(data?.artworks).forEach(a => {
      if (a?.internalID) map.set(a.internalID, a)
    })
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

          {/* Single scrollable row; the hook caps the list at 7 terms, matching Eigen */}
          <ScrollRail
            contentKey={`recents-${recentSearches.length}`}
            gap={1}
            showScrollBar={false}
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
          : active.artists.slice(0, MAX_ARTISTS).map((item, index) => {
              const hydrated = artistById.get(item.internalID)

              return (
                <ArtistAvatar
                  key={item.internalID}
                  item={item}
                  hydrated={hydrated}
                  onClick={event => {
                    handleTrendingArtistClick({
                      internalID: item.internalID,
                      slug: hydrated?.slug ?? item.slug,
                      index,
                      event,
                    })
                  }}
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
          : active.artworks.slice(0, MAX_ARTWORKS).map((item, index) => {
              const hydrated = artworkById.get(item.internalID)

              return (
                <TrendingArtworkCard
                  key={item.internalID}
                  item={item}
                  hydrated={hydrated}
                  onClick={event => {
                    handleTrendingArtworkClick({
                      internalID: item.internalID,
                      slug: hydrated?.slug ?? item.slug,
                      index,
                      event,
                    })
                  }}
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
              $isSelected={i === activeIndex}
              aria-pressed={i === activeIndex}
              onClick={() => handleTrendingWindowClick(i)}
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

interface ArtistAvatarProps {
  item: TrendingArtist
  hydrated?: HydratedArtist
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

const ArtistAvatar: FC<ArtistAvatarProps> = ({ item, hydrated, onClick }) => {
  const image = hydrated?.coverArtwork?.image?.cropped

  return (
    <AvatarItem to={hydrated?.href ?? `/artist/${item.slug}`} onClick={onClick}>
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
