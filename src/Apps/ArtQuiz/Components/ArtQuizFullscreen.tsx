import { Box, Spinner } from "@artsy/palette"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC, useEffect, useRef, useState } from "react"

export const ArtQuizFullScreen: FC = ({ children }) => {
  const { mobile, desktop } = useNavBarHeight()

  /**
   * We can't use 100vh because on mobile devices this does not
   * include the browser's address/navigation bar.
   *
   * We could use `min-height: fill-available`, but it would require
   * some adjustments to global CSS.
   **/
  const [height, setHeight] = useState(0)

  const childrenRef = useRef<HTMLDivElement | null>(null)

  const [childrenHeight, setChildrenHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (!childrenRef.current) return

      setHeight(window.innerHeight)
      setChildrenHeight(childrenRef.current.clientHeight)
    }

    handleResize()

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isLoading = height === 0
  const isOverflowing = childrenHeight > height - desktop

  return (
    <Box
      position="relative"
      height={[
        `${height - mobile}px`,
        isOverflowing ? "100%" : `${height - desktop}px`,
      ]}
    >
      {isLoading && <Spinner />}

      <Box
        ref={childrenRef as any}
        height="100%"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 250ms",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
