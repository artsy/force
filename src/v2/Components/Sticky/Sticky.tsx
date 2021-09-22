import styled from "styled-components"
import { Box } from "@artsy/palette"
import React, { cloneElement, useEffect, useRef, useState } from "react"
import { useSticky } from "./StickyProvider"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"

interface StickyProps {
  proportional?: boolean
}

interface Rect {
  right: number
  left: number
  width: number
  height: number
}

const DEFAULT_RECT = {
  right: 0,
  left: 0,
  width: 0,
  height: 0,
}

/**
 * Wrap a component to have it stick below the main nav.
 * Use render props `{({ stuck }) => {}` to swap styles.
 * See the stories for examples.
 *
 * FAQ:
 * - Q: Why can't I simply use `position: sticky`?
 * - A: We use `overflow-x: hidden` on the main layout container so that we can
 *      utilize the `FullBleed` component. When you set `overflow: hidden` on
 *      any ancestor of your sticky element, this element becomes the scrolling
 *      container for your sticky element.
 *
 *      See: https://github.com/w3c/csswg-drafts/issues/865 for more detail.
 *      TLDR: `overflow: clip` solves this and support is growing.
 *
 * - Q: How can I maintain the original horizontal position of the element I
 *      want to be sticky?
 * - A: Currently this implementation does not inherit any horizontal positioning.
 *      Everything that is stuck is the full width of the screen. See the
 *      `GridExample` story for an example that works around this by re-wrapping
 *      everything in an AppContainer + HorizontalPadding. (This is non-ideal)
 *
 * - Q: How do I unstick an element once it reaches the end of its parent container?
 * - A: This is also not currently supported.
 */
export const Sticky: React.FC<StickyProps> = ({ children, proportional }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const placeholderRef = useRef<HTMLDivElement | null>(null)

  const [stuck, setStuck] = useState(false)
  const [rect, setRect] = useState<Rect>(DEFAULT_RECT)

  const { mobile, desktop } = useNavBarHeight()

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

  const { offsetTop, registerSticky, deregisterSticky } = useSticky()

  // Register/deregister sticky
  useEffect(() => {
    registerSticky(containerRef.current?.clientHeight)
    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  // Set initial rect
  useEffect(() => {
    if (!containerRef.current) return
    setRect(containerRef.current.getBoundingClientRect())
  }, [])

  const content =
    typeof children === "function" ? children({ stuck }) : children
  const placeholder = cloneElement(content)

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || (stuck && !placeholderRef.current)) return
      const el = stuck ? placeholderRef.current : containerRef.current
      setRect(el!.getBoundingClientRect())
    }

    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [stuck])

  return (
    <>
      <Sentinel
        ref={sentinelRef as any}
        top={[-(mobile + offsetTop), -(desktop + offsetTop)]}
      />

      <Container
        ref={containerRef as any}
        bg="white100"
        position={stuck ? "fixed" : "static"}
        top={[mobile + offsetTop, desktop + offsetTop]}
      >
        {proportional && stuck ? (
          <div
            style={{
              position: "absolute",
              right: `${rect.right}px`,
              left: `${rect.left}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
            }}
          >
            {content}
          </div>
        ) : (
          content
        )}
      </Container>

      {stuck && (
        // Inserts a copy of the underlying content to prevent scroll from changing
        // as well as allowing us to track the size
        <div ref={placeholderRef} style={{ opacity: 0, pointerEvents: "none" }}>
          {placeholder}
        </div>
      )}
    </>
  )
}

export const Container = styled(Box)`
  z-index: 1;
  left: 0;
  right: 0;
`

// This <div> is positioned such that when it leaves the top of
// the browser the <Container> reaches it's `top` value and sticking.
const Sentinel = styled(Box)`
  position: relative;
  width: 100%;
  height: 0;
`
