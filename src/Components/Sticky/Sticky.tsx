import { Box, THEME } from "@artsy/palette"
import { ReactNode, useEffect, useRef, useState } from "react"
import ReactSticky, { Props as ReactStickyProps } from "react-stickynode"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useSticky } from "./StickyProvider"

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
export const Sticky: React.FC<
  Pick<ReactStickyProps, "bottomBoundary"> & {
    id?: string
    // TODO: Remove this prop!
    withoutHeaderOffset?: boolean
    children: ReactNode | (({ stuck }: { stuck: boolean }) => ReactNode)
  }
> = ({ children, bottomBoundary, withoutHeaderOffset, id }) => {
  const {
    offsetTop,
    registerSticky,
    deregisterSticky,
    updateSticky,
  } = useSticky({
    id,
  })

  const { desktop, mobile } = useNavBarHeight()

  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const [stuck, setStuck] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const headerOffset = withoutHeaderOffset ? 0 : isMobile ? mobile : desktop

  useEffect(() => {
    registerSticky(containerRef.current?.clientHeight)
    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  return (
    <ReactSticky
      top={headerOffset + offsetTop}
      bottomBoundary={bottomBoundary}
      onStateChange={state => {
        switch (state.status) {
          case ReactSticky.STATUS_FIXED: {
            setStuck(true)
            updateSticky({ status: "FIXED" })
            break
          }
          case ReactSticky.STATUS_ORIGINAL: {
            setStuck(false)
            updateSticky({ status: "ORIGINAL" })
            break
          }
          case ReactSticky.STATUS_RELEASED: {
            setStuck(false)
            updateSticky({ status: "RELEASED" })
            break
          }
        }
      }}
      innerZ={1}
    >
      <Box ref={containerRef as any}>
        {typeof children === "function" ? children({ stuck }) : children}
      </Box>
    </ReactSticky>
  )
}
