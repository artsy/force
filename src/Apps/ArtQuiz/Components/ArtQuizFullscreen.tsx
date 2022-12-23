import { Box } from "@artsy/palette"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC, useEffect, useState } from "react"

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

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight)
    }

    handleResize()

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Box height={[`${height - mobile}px`, `${height - desktop}px`]}>
      {children}
    </Box>
  )
}
