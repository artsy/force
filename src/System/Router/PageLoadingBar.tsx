import styled, { keyframes, css } from "styled-components"
import { useState, useEffect, useRef } from "react"
import { Box } from "@artsy/palette"

interface PageLoadingBarProps {
  loadingState: "resting" | "loading" | "complete"
}

export const PageLoadingBar: React.FC<PageLoadingBarProps> = ({
  loadingState = "resting",
}) => {
  const [isComplete, setIsComplete] = useState(false)
  const [loading, setLoading] = useState(loadingState)

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

  return (
    <LoadingBar
      ref={barRef as any}
      loading={loading}
      isComplete={isComplete}
      backgroundColor="brand"
      height={2}
      top="1px"
      left={0}
      zIndex={100}
      overflow="hidden"
      position="fixed"
    />
  )
}

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
  from {
    width: 30%;
  }
  to {
    width: 100%;
  }
`

const LoadingBar = styled(Box)<{ loading: string; isComplete: boolean }>`
  ${({ loading }) =>
    loading === "loading" &&
    css`
      animation: ${loadingAnimation} 0.7s ${easeOutExpo} forwards;
    `}
  ${({ isComplete }) =>
    isComplete &&
    css`
      animation: ${completeAnimation} 1s ${easeOutExpo} forwards;
    `}
  opacity: ${({ isComplete }) => (isComplete ? 0 : 1)};
  transition: opacity .8s;
`
