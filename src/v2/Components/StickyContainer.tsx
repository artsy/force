import styled, { css } from "styled-components"
import { Box, color } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { NAV_BAR_HEIGHT, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"

export interface BaseContainerProps {
  stuck?: boolean
}

export const Container = styled(Box).attrs({
  bg: "white100",
  top: [MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT],
})<BaseContainerProps>`
  z-index: 1;
  left: 0;
  right: 0;

  ${({ stuck }) =>
    stuck
      ? css`
          position: fixed;
          border-bottom-color: ${color("black10")};
        `
      : css`
          position: static;
          border-bottom-color: transparent;
        `};
`

// This <div> is positioned such that when it leaves the top of
// the browser the <Container> reaches it's `top` value and sticking.
const Sentinel = styled(Box).attrs({
  top: [-MOBILE_NAV_HEIGHT, -NAV_BAR_HEIGHT],
})`
  position: relative;
  width: 100%;
  height: 0;
`

export const StickyContainer: React.FC = ({ children }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    if (sentinelRef.current === null) return

    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (
          // Intersecting
          entry.intersectionRatio === 0 &&
          // Only stick when scrolling down
          entry.boundingClientRect.y < 0
        ) {
          setStuck(true)
        } else if (entry.intersectionRatio === 1) {
          setStuck(false)
        }
      },
      { threshold: [0, 1] }
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Sentinel ref={sentinelRef as any} />

      <Container ref={containerRef as any} stuck={stuck}>
        {typeof children === "function" ? children({ stuck }) : children}
      </Container>

      {stuck && (
        // Insert placeholder the same height as the container to prevent scroll from changing
        <div style={{ height: containerRef.current?.offsetHeight }} />
      )}
    </>
  )
}
