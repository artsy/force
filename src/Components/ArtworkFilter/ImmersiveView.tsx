import styled from "styled-components"
import { Button, Flex } from "@artsy/palette"
import CollapseIcon from "@artsy/icons/CollapseIcon"
import { useDarkModeToggle } from "Utils/Hooks/useDarkModeToggle"
import { useCallback, useEffect } from "react"

interface ImmersiveViewProps {
  onClose: () => void
}

export const ImmersiveView: React.FC<ImmersiveViewProps> = props => {
  const { onClose } = props
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
        <Flex alignItems={"center"} justifyContent="center" height="100%">
          Immersive View TKTK
        </Flex>
      </Container>
    </div>
  )
}

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
