import styled from "styled-components"
import { useEffect, useCallback } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Immerse_filtered_artworks$data } from "__generated__/Immerse_filtered_artworks.graphql"

interface ImmerseProps {
  filtered_artworks: Immerse_filtered_artworks$data
  onClose?: () => void
}

export const Immerse: React.FC<ImmerseProps> = props => {
  const { onClose } = props

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose()
      }
    },
    [onClose],
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
        <h1>Immerse</h1>
        <p>This is the Immerse component.</p>
        <p>It can be used to display immersive content or experiences.</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(props)}</pre>
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
