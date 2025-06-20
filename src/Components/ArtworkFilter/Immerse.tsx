import styled from "styled-components"
import { useEffect, useCallback, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Immerse_filtered_artworks$data } from "__generated__/Immerse_filtered_artworks.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Flex, Image, Text } from "@artsy/palette"
import { Blurhash } from "react-blurhash"

interface ImmerseProps {
  filtered_artworks: Immerse_filtered_artworks$data
  onClose?: () => void
}

const Immerse: React.FC<ImmerseProps> = props => {
  const { onClose, filtered_artworks } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const artworks = extractNodes(filtered_artworks)
  const currentArtwork = artworks[currentIndex]

  // Handle key press events (ESC, left/right arrows)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose()
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex(prev => Math.max(0, prev - 1))
        setIsLoading(true)
      } else if (event.key === "ArrowRight") {
        setCurrentIndex(prev => Math.min(artworks.length - 1, prev + 1))
        setIsLoading(true)
      }
    },
    [onClose, artworks.length],
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
    <div className="immerse">
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
          {/* display blurhash while loading */}
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
            src={currentArtwork?.immersiveImage?.resized?.src}
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
          <Text color="mono60">{currentArtwork.formattedMetadata ?? "…"}</Text>
        </Flex>
      </Container>
    </div>
  )
}

export const ImmerseContainer = createFragmentContainer(Immerse, {
  filtered_artworks: graphql`
    fragment Immerse_filtered_artworks on FilterArtworksConnection {
      edges {
        node {
          slug
          formattedMetadata
          immersiveImage: image(includeAll: false) {
            aspectRatio
            blurhash
            resized(height: 1000, version: ["main", "larger", "large"]) {
              height
              width
              src
              srcSet
            }
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
  background-color: rgba(255, 255, 255, 0.97);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`
