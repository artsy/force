import styled from "styled-components"
import { Box } from "@artsy/palette"
import React, { useEffect, useRef } from "react"
import { NAV_BAR_HEIGHT, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"
import { useStickyContainerContext } from "./StickyContainerContext"

// This <div> is positioned such that when it leaves the top of
// the browser the <Container> reaches it's `top` value and sticking.
const Sentinel = styled(Box).attrs({
  top: [-MOBILE_NAV_HEIGHT, -NAV_BAR_HEIGHT],
})`
  position: relative;
  width: 100%;
  height: 0;
`

export const BaseStickyContainer: React.FC = ({ children }) => {
  const stickyContainerContext = useStickyContainerContext()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].intersectionRatio === 0) {
          stickyContainerContext.setStuck(true)
        } else if (entries[0].intersectionRatio === 1) {
          stickyContainerContext.setStuck(false)
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
      <stickyContainerContext.ContainerComponent
        stuck={stickyContainerContext.stuck}
      >
        {children}
      </stickyContainerContext.ContainerComponent>
    </>
  )
}
