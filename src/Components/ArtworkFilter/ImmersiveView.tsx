import {
  ActionType,
  type ClickedMainArtworkGrid,
  ContextModule,
  type ImmersiveViewArtworkDisplayed,
  OwnerType,
} from "@artsy/cohesion"
import CollapseIcon from "@artsy/icons/CollapseIcon"
import {
  Box,
  Button,
  Flex,
  Image,
  ModalBase,
  ShelfNext,
  ShelfPrevious,
  Text,
  useTheme,
} from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type {
  ImmersiveView_filtered_artworks$data,
  ImmersiveView_filtered_artworks$key,
} from "__generated__/ImmersiveView_filtered_artworks.graphql"
import { useCallback, useEffect, useState } from "react"
import { Blurhash } from "react-blurhash"
import { Link } from "react-head"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"

const ITEMS_PER_PAGE = 30

interface ImmersiveViewProps {
  artworks: ImmersiveView_filtered_artworks$key
  isPageLoading: boolean
  onClose: () => void
}

export const ImmersiveView: React.FC<ImmersiveViewProps> = props => {
  const { onClose, isPageLoading } = props
  const artworkNodes = useFragment(FRAGMENT, props.artworks) || { edges: [] }
  const artworks =
    artworkNodes.edges?.map(edge => edge?.immersiveArtworkNode) ?? []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)

  // Tracking debounce threshold in milliseconds
  const TRACKING_DEBOUNCE_MS = 500

  const currentArtwork = artworks[currentIndex]
  const nextArtwork = artworks[currentIndex + 1]
  const prevArtwork = artworks[currentIndex - 1]

  const currentImageSrc = currentArtwork?.image?.url as string
  const nextImageSrc = nextArtwork?.image?.url as string
  const prevImageSrc = prevArtwork?.image?.url as string

  const isArtworkMissing = !currentArtwork || !currentImageSrc

  const { filters, setFilter } = useArtworkFilterContext()

  const isFirstPage = (filters?.page ?? 1) === 1
  const isFirstArtwork = currentIndex === 0
  const isVeryFirstArtwork = isFirstPage && isFirstArtwork

  const navigateToPreviousPage = useCallback(() => {
    const page = filters?.page ?? 1
    if (page > 1) {
      setFilter("page", page - 1)
      setCurrentIndex(ITEMS_PER_PAGE - 1)
      setIsImageLoading(true)
    }
  }, [filters?.page, setFilter])

  const navigateToNextPage = useCallback(() => {
    if (artworkNodes.pageInfo.hasNextPage) {
      const page = filters?.page ?? 1
      setFilter("page", page + 1)
      setCurrentIndex(0)
      setIsImageLoading(true)
    }
  }, [filters?.page, setFilter, artworkNodes.pageInfo.hasNextPage])

  const handlePreviousArtwork = useCallback(() => {
    const newIndex = Math.max(0, currentIndex - 1)
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
      setIsImageLoading(true)
    } else {
      navigateToPreviousPage()
    }
  }, [currentIndex, navigateToPreviousPage])

  const handleNextArtwork = useCallback(() => {
    const newIndex = Math.min(artworks.length - 1, currentIndex + 1)
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
      setIsImageLoading(true)
    } else {
      navigateToNextPage()
    }
  }, [artworks.length, currentIndex, navigateToNextPage])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft": {
          handlePreviousArtwork()
          break
        }
        case "ArrowRight": {
          handleNextArtwork()
          break
        }
        default:
          // No action for other keys
          break
      }
    },
    [handleNextArtwork, handlePreviousArtwork],
  )

  const tracking = useTracking()
  const { contextPageOwnerType, contextPageOwnerId } = useAnalyticsContext()

  const trackImmersiveViewArtworkDisplayed = () => {
    const params: ImmersiveViewArtworkDisplayed = {
      action: ActionType.immersiveViewArtworkDisplayed,
      context_module: ContextModule.artworkGrid,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      artwork_id: currentArtwork?.internalID ?? "Unknown",
    }
    tracking.trackEvent(params)
  }

  const trackImmersiveViewArtworkClicked = () => {
    const params: ClickedMainArtworkGrid = {
      action: ActionType.clickedMainArtworkGrid,
      context_module: ContextModule.artworkGrid,
      context_page_owner_type: contextPageOwnerType,
      destination_page_owner_id: currentArtwork?.internalID ?? "Unknown",
      destination_page_owner_type: OwnerType.artwork,
      destination_page_owner_slug: currentArtwork?.slug ?? "Unknown",
      type: "immersive",
    }
    tracking.trackEvent(params)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: "trackImmersiveViewArtworkDisplayed changes on every re-render and should not be used as a hook dependency"
  useEffect(() => {
    // Debounce tracking to only fire if artwork remains in view for the threshold duration
    const timeoutId = setTimeout(() => {
      trackImmersiveViewArtworkDisplayed()
    }, TRACKING_DEBOUNCE_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currentArtwork?.internalID])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  const { theme } = useTheme()

  return (
    <ModalBase
      onClose={onClose}
      dialogProps={{
        width: "100%",
        height: "100%",
        bg:
          theme.name === "light"
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      style={{ backdropFilter: "blur(20px)" }}
    >
      <>
        {/* Prefetch prev/next image using link tags */}
        {nextImageSrc && <Link rel="prefetch" href={nextImageSrc} as="image" />}
        {prevImageSrc && <Link rel="prefetch" href={prevImageSrc} as="image" />}

        <div className="immersive-view" data-testid="immersive-view">
          <Button
            onClick={onClose}
            variant={"tertiary"}
            position="fixed"
            top={20}
            right={20}
          >
            <CollapseIcon mr={0.5} /> Close
          </Button>

          <Previous
            onClick={handlePreviousArtwork}
            aria-label="Previous artwork"
            disabled={isVeryFirstArtwork}
          />

          <Next onClick={handleNextArtwork} aria-label="Next artwork" />

          {isPageLoading ? (
            <Text>Loading more artworks…</Text>
          ) : isArtworkMissing ? (
            <Text>No artwork to display</Text>
          ) : (
            <a
              key={currentArtwork.slug}
              href={`/artwork/${currentArtwork.slug}`}
              target="_new"
              style={{ textDecoration: "none" }}
              onClick={e => {
                e.currentTarget.blur()
                trackImmersiveViewArtworkClicked()
              }}
            >
              <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
                {isImageLoading && (
                  <ImagePlaceholder currentArtwork={currentArtwork} />
                )}

                <Image
                  data-testid="immersive-view-image"
                  src={currentImageSrc}
                  alt={currentArtwork.formattedMetadata ?? "…"}
                  style={{
                    height: "85vh",
                    width: "85vw",
                    objectFit: "contain",
                  }}
                  display={isImageLoading ? "none" : "block"}
                  onLoad={() => {
                    setIsImageLoading(false)
                  }}
                  onError={() => setIsImageLoading(false)}
                />

                <Text color="mono60" px={2}>
                  {currentArtwork.formattedMetadata ?? "…"}
                </Text>
              </Flex>
            </a>
          )}
        </div>
      </>
    </ModalBase>
  )
}

const FRAGMENT = graphql`
  fragment ImmersiveView_filtered_artworks on FilterArtworksConnection {
    pageInfo {
      # hasPreviousPage # seems broken
      hasNextPage
    }
    edges {
      immersiveArtworkNode: node {
        internalID
        slug
        formattedMetadata
        image {
          aspectRatio
          blurhash
          url(version: ["main", "larger", "large"])
        }
      }
    }
  }
`

const Next = styled(ShelfNext)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2vw;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
`

const Previous = styled(ShelfPrevious)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2vw;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
`

interface ImagePlaceholderProps {
  currentArtwork: NonNullable<
    NonNullable<ImmersiveView_filtered_artworks$data["edges"]>[number]
  >["immersiveArtworkNode"]
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = props => {
  const { currentArtwork } = props

  if (!currentArtwork?.image) return null

  if (!currentArtwork.image.blurhash)
    return (
      <Box
        bg={"mono10"}
        width={`${(currentArtwork?.image?.aspectRatio ?? 1) * 85}vh`}
        height={"85vh"}
      />
    )

  return (
    <Blurhash
      data-testid="immersive-view-blurhash"
      hash={currentArtwork.image.blurhash}
      width={`${currentArtwork.image.aspectRatio * 85}vh`}
      height={"85vh"}
      resolutionX={32}
      resolutionY={32}
      punch={1}
      aria-hidden="true"
    />
  )
}
