import styled from "styled-components"
import { useEffect, useCallback, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Immerse_filtered_artworks$data } from "__generated__/Immerse_filtered_artworks.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Button, Flex, Image, Text } from "@artsy/palette"
import { Blurhash } from "react-blurhash"
import { Link } from "react-head"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import CollapseIcon from "@artsy/icons/CollapseIcon"
import { themeGet } from "@styled-system/theme-get"

const DEBUG = false
const ITEMS_PER_PAGE = 30

interface ImmerseProps {
  isLoading?: boolean
  filtered_artworks: Immerse_filtered_artworks$data
  onClose?: () => void
}

const Immerse: React.FC<ImmerseProps> = props => {
  const { onClose, filtered_artworks, isLoading: isPageLoading } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { filters, setFilter } = useArtworkFilterContext()

  const artworks = extractNodes(filtered_artworks)
  const currentArtwork = artworks[currentIndex]
  const nextArtwork = artworks[currentIndex + 1]
  const prevArtwork = artworks[currentIndex - 1]

  const currentImageSrc = currentArtwork?.immersiveImage?.url as string
  const nextImageSrc = nextArtwork?.immersiveImage?.url as string
  const prevImageSrc = prevArtwork?.immersiveImage?.url as string

  const isArtworkMissing = !currentArtwork || !currentImageSrc

  const navigateToPreviousPage = useCallback(() => {
    const page = filters?.page ?? 1
    if (page > 1) {
      setFilter("page", page - 1)
      setCurrentIndex(ITEMS_PER_PAGE - 1)
      setIsLoading(true)
      return true
    }
    return false
  }, [filters?.page, setFilter])

  const navigateToNextPage = useCallback(() => {
    if (filtered_artworks.pageInfo.hasNextPage) {
      const page = filters?.page ?? 1
      setFilter("page", page + 1)
      setCurrentIndex(0)
      setIsLoading(true)
      return true
    }
    return false
  }, [filters?.page, setFilter, filtered_artworks.pageInfo.hasNextPage])

  // Handle key press events (ESC, left/right arrows)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          if (onClose) {
            onClose()
          }
          break
        case "ArrowLeft": {
          const newIndex = Math.max(0, currentIndex - 1)
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex)
            setIsLoading(true)
          } else {
            navigateToPreviousPage()
          }
          break
        }
        case "ArrowRight": {
          const newIndex = Math.min(artworks.length - 1, currentIndex + 1)
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex)
            setIsLoading(true)
          } else {
            navigateToNextPage()
          }
          break
        }
        default:
          // No action for other keys
          break
      }
    },
    [
      currentIndex,
      artworks.length,
      onClose,
      navigateToPreviousPage,
      navigateToNextPage,
    ],
  )

  // scroll-lock and key events
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <>
      {/* Prefetch prev/next image using link tags */}
      {nextImageSrc && <Link rel="prefetch" href={nextImageSrc} as="image" />}
      {prevImageSrc && <Link rel="prefetch" href={prevImageSrc} as="image" />}

      {/* Visual debugger */}
      {DEBUG && (
        <Debug>
          {JSON.stringify(
            {
              currentPage: filters?.page,
              currentIndex,
              isPageLoading,
              isLoading,
              hasNextPage: filtered_artworks.pageInfo.hasNextPage,
              filters: filters,
              currentArtwork,
            },
            null,
            2,
          )}
        </Debug>
      )}

      <div className="immerse">
        <Container>
          {onClose && (
            <Button
              onClick={onClose}
              variant={"tertiary"}
              position="fixed"
              top={20}
              right={20}
            >
              <CollapseIcon mr={0.5} /> Close
            </Button>
          )}
          {isPageLoading ? (
            <Text>Loading more artworks…</Text>
          ) : isArtworkMissing ? (
            <Text>No artwork to display</Text>
          ) : (
            <a
              href={`/artwork/${currentArtwork.slug}`}
              target="_new"
              style={{ textDecoration: "none" }}
            >
              <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
                {/* display blurhash if still loading */}
                {isLoading && currentArtwork?.immersiveImage?.blurhash && (
                  <Blurhash
                    hash={currentArtwork.immersiveImage.blurhash}
                    width={`${currentArtwork.immersiveImage.aspectRatio * 85}vh`}
                    height={"85vh"}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    aria-hidden="true"
                  />
                )}

                <Image
                  src={currentImageSrc}
                  alt={currentArtwork.formattedMetadata ?? "…"}
                  style={{
                    height: "85vh",
                    objectFit: "contain",
                    visibility: isLoading ? "hidden" : "visible",
                  }}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                  display={isLoading ? "none" : "block"}
                />

                <Text color="mono60">
                  {currentArtwork.formattedMetadata ?? "…"}
                </Text>
              </Flex>
            </a>
          )}
        </Container>
      </div>
    </>
  )
}

export const ImmerseContainer = createFragmentContainer(Immerse, {
  filtered_artworks: graphql`
    fragment Immerse_filtered_artworks on FilterArtworksConnection {
      pageInfo {
        # hasPreviousPage # seems broken
        hasNextPage
      }
      edges {
        node {
          slug
          formattedMetadata
          immersiveImage: image {
            aspectRatio
            blurhash
            url(version: ["larger", "large"])
          }
        }
      }
    }
  `,
})

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: ${themeGet("colors.mono0")};
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); /* For Safari */
`
const Debug = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 10px;
  background-color: ${themeGet("colors.mono10")};
  background-color-opacity: 0.8;
  z-index: 1001;
  font-size: 12px;
  font-family: monospace;
  white-space: pre-wrap;
  overflow: scroll;
  max-height: 100vh;
  box-sizing: border-box;
`
