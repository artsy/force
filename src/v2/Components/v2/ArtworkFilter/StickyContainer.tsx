import styled, { css } from "styled-components"
import { Box, Flex, color } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { NAV_BAR_HEIGHT } from "v2/Components/NavBar"

const Container = styled(Flex).attrs({
  top: NAV_BAR_HEIGHT,
  py: 1,
  mx: -2,
  px: 2,
  bg: "white100",
  borderBottom: "1px solid",
})<{ stuck?: boolean }>`
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 1;

  ${({ stuck }) =>
    stuck
      ? css`
          border-bottom-color: ${color("black10")};
        `
      : css`
          border-bottom-color: transparent;
        `};
`

// This <div> is positioned such that when it leaves the top of
// the browser the <Container> reaches it's `top` value and sticking.
const Sentinel = styled(Box).attrs({
  top: -NAV_BAR_HEIGHT,
})`
  position: relative;
  width: 100%;
  height: 0;
`

export const StickyContainer: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].intersectionRatio === 0) {
          setStuck(true)
        } else if (entries[0].intersectionRatio === 1) {
          setStuck(false)
        }
      },
      { threshold: [0, 1] }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Sentinel ref={ref as any} />
      <Container stuck={stuck}>{children}</Container>
    </>
  )
}
