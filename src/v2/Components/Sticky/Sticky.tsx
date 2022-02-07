import ReactSticky, { Props as ReactStickyProps } from "react-stickynode"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { Box, themeProps } from "@artsy/palette"
import { useEffect, useRef, useState } from "react"
import * as React from "react"
import { useSticky } from "./StickyProvider"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"

interface StickyProps extends Pick<ReactStickyProps, "bottomBoundary"> {}

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
 * - A: Just pass bottomBoundary prop (see https://github.com/yahoo/react-stickynode#props for more detail).
 */
export const Sticky: React.FC<StickyProps> = ({ children, bottomBoundary }) => {
  const { offsetTop, registerSticky, deregisterSticky } = useSticky()
  const { desktop, mobile } = useNavBarHeight()
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const [stuck, setStuck] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headerOffset = isMobile ? mobile : desktop

  useEffect(() => {
    registerSticky(containerRef.current?.clientHeight)
    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  return (
    <Box>
      <ReactSticky
        top={headerOffset + offsetTop}
        bottomBoundary={bottomBoundary}
        onStateChange={state => {
          setStuck(state.status === ReactSticky.STATUS_FIXED)
        }}
        innerZ={1}
      >
        <Box ref={containerRef as any}>
          {typeof children === "function" ? children({ stuck }) : children}
        </Box>
      </ReactSticky>
    </Box>
  )
}
