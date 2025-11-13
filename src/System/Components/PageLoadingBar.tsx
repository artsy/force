import { Z } from "Apps/Components/constants"
import { Box } from "@artsy/palette"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"

interface PageLoadingBarProps {
  loadingState: "resting" | "loading" | "complete"
}

export const PageLoadingBar: React.FC<
  React.PropsWithChildren<PageLoadingBarProps>
> = ({ loadingState = "resting" }) => {
  const firstMount = useRef(true)
  const [isComplete, setIsComplete] = useState(false)
  const [loading, setLoading] = useState(loadingState)
  const barRef = useRef<HTMLDivElement>(null)
  const [scaleX, setScaleX] = useState(0)

  useEffect(() => {
    firstMount.current = false

    if (loadingState === "complete") {
      setIsComplete(true)
      setLoading("complete")
      setScaleX(1)
    } else {
      setIsComplete(false)
      setLoading(loadingState)
      setScaleX(loadingState === "loading" ? 0.3 : 0)
    }
  }, [loadingState])

  if (firstMount.current) {
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
        scaleX={scaleX}
        backgroundColor="brand"
        height={2}
        top="1px"
        left="0px"
        overflow="hidden"
        position="fixed"
        onAnimationEnd={() => {
          if (isComplete) {
            setLoading("resting")
            setIsComplete(false)
            setScaleX(0)
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
    transform: translateX(-10%) scaleX(0);
  }
  to {
    transform: translateX(0) scaleX(0.3);
  }
`

const completeAnimation = keyframes`
  to {
    transform: scaleX(1);
  }
`

const fadeInAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
`

const LoadingBar = styled(Box)<{
  loading: string
  isComplete: boolean
  scaleX: number
}>`
  transform-origin: left;
  transform: scaleX(${({ scaleX }) => scaleX});
  ${({ loading }) =>
    loading === "loading" &&
    css`
      animation:
        ${loadingAnimation} 12s ${startEase} forwards,
        ${fadeInAnimation} 0.1s linear;
    `}
  ${({ isComplete }) =>
    isComplete &&
    css`
      animation: ${completeAnimation} 1s ${easeOutExpo} forwards;
    `}
  opacity: ${({ isComplete }) => (isComplete ? 0 : 1)};
  width: 100%;
  transition:
    opacity 0.7s,
    transform 0.7s;
`
