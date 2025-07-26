import styled from "styled-components"
import { Button, Flex, Image, Text } from "@artsy/palette"
import CollapseIcon from "@artsy/icons/CollapseIcon"
import { useDarkModeToggle } from "Utils/Hooks/useDarkModeToggle"
import { useCallback, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"
import type { ImmersiveView_filtered_artworks$key } from "__generated__/ImmersiveView_filtered_artworks.graphql"

interface ImmersiveViewProps {
  artworks: ImmersiveView_filtered_artworks$key
  onClose: () => void
}

export const ImmersiveView: React.FC<ImmersiveViewProps> = props => {
  const { onClose } = props
  const artworkNodes = useFragment(FRAGMENT, props.artworks) || { edges: [] }
  const artworks =
    artworkNodes.edges?.map(edge => edge?.immersiveArtworkNode) ?? []

  const [currentIndex, _setCurrentIndex] = useState(0)
  const currentArtwork = artworks[currentIndex]

  const currentImageSrc = currentArtwork?.image?.url as string
  const isArtworkMissing = !currentArtwork || !currentImageSrc

  const { isDarkModeActive } = useDarkModeToggle()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose()
          break
        default:
          // No action for other keys
          break
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="immersive-view" data-testid="immersive-view">
      <Container isDarkMode={isDarkModeActive}>
        <Button
          onClick={onClose}
          variant={"tertiary"}
          position="fixed"
          top={20}
          right={20}
        >
          <CollapseIcon mr={0.5} /> Close
        </Button>
        {isArtworkMissing ? (
          <Text>No artwork to display</Text>
        ) : (
          <a
            href={`/artwork/${currentArtwork.slug}`}
            target="_new"
            style={{ textDecoration: "none" }}
          >
            <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
              <Image
                src={currentImageSrc}
                alt={currentArtwork.formattedMetadata ?? "…"}
                style={{
                  height: "85vh",
                  objectFit: "contain",
                }}
              />
              <Text color="mono60">
                {currentArtwork.formattedMetadata ?? "…"}
              </Text>
            </Flex>
          </a>
        )}
      </Container>
    </div>
  )
}

const FRAGMENT = graphql`
  fragment ImmersiveView_filtered_artworks on FilterArtworksConnection {
    edges {
      immersiveArtworkNode: node {
        slug
        formattedMetadata
        image {
          url(version: ["larger", "large"])
        }
      }
    }
  }
`

interface ContainerProps {
  isDarkMode?: boolean
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: ${props => (props.isDarkMode ? "#000000dd" : "#ffffffdd")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); /* Safari */
`
