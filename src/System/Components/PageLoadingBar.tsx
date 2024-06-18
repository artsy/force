import styled, { keyframes, css } from "styled-components"
import { useState, useEffect, useRef } from "react"
import { Box } from "@artsy/palette"
import { isServer } from "Server/isServer"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { Z } from "Apps/Components/constants"

interface PageLoadingBarProps {
  loadingState: "resting" | "loading" | "complete"
}

export const PageLoadingBar: React.FC<PageLoadingBarProps> = ({
  loadingState = "resting",
}) => {
  const [isComplete, setIsComplete] = useState(false)
  const [loading, setLoading] = useState(loadingState)
  const isMounted = useDidMount()
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loadingState === "complete") {
      setIsComplete(true)
      setLoading("complete")
    } else {
      setIsComplete(false)
      setLoading(loadingState)
    }
  }, [loadingState])

  if (isServer || !isMounted) {
    return null
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      zIndex={Z.pageLoadingBar}
      width="100%"
      height={3}
    >
      <LoadingBar
        ref={barRef as any}
        loading={loading}
        isComplete={isComplete}
        backgroundColor="brand"
        height={2}
        top="1px"
        left={0}
        width={isComplete ? barRef.current?.clientWidth : 0}
        zIndex={100}
        overflow="hidden"
        position="fixed"
        onAnimationEnd={() => {
          if (isComplete) {
            setLoading("resting")
            setIsComplete(false)
          }
        }}
      />
    </Box>
  )
}

const startEase = "cubic-bezier(0.000, 0.925, 0.000, 0.940)"
const easeOutExpo = "cubic-bezier(0.19, 1, 0.22, 1)"

const loadingAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 30%;
  }
`

const completeAnimation = keyframes`
  to {
    width: 100%;
  }
`

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const LoadingBar = styled(Box)<{ loading: string; isComplete: boolean; width }>`
  ${({ loading }) =>
    loading === "loading" &&
    css`
      animation: ${loadingAnimation} 12s ${startEase} forwards,
        ${fadeInAnimation} 0.1s linear;
    `}
  ${({ isComplete }) =>
    isComplete &&
    css`
      animation: ${completeAnimation} 1s ${easeOutExpo} forwards;
    `}
  opacity: ${({ isComplete }) => (isComplete ? 0 : 1)};
  transition: opacity 0.7s;
  width: ${({ width }) => width}px;
`
