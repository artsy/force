import ReactSticky, { Props as ReactStickyProps } from "react-stickynode"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { Box, themeProps } from "@artsy/palette"
import { useEffect, useRef, useState } from "react"
import * as React from "react"
import { useSticky } from "./StickyProvider"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"

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
 * - Q: How do I unstick an element once it reaches the end of its parent container?
 * - A: Just specify offset from the top of document using bottomBoundary prop and
 *      an element will be unsticked when the bottom of the element reaches at.
 *      If a selector to a target is specified (for example, bottomBoundary="#footer"),
 *      the offset will be the bottom of the target
 */
export const Sticky: React.FC<Pick<ReactStickyProps, "bottomBoundary">> = ({
  children,
  bottomBoundary,
}) => {
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
