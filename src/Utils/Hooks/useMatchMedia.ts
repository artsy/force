import { useEffect, useState } from "react"

/**
 * @note This function ***IS NOT*** server-side rendering friendly, and should be
 * avoided in the vast majority of  use-cases. For writing responsive UI, please
 * see our docs on:
 *
 * - Responsive Props: https://palette.artsy.net/guides/responsive/ and
 * - Server-side Rendering Responsively: https://artsy.github.io/blog/2019/05/24/server-rendering-responsively/
 *
 *
 * Checks to see if the browser matches a particular media query
 *
 * Thanks! https://github.com/olistic/react-use-media/
 *
 * @example

    import { THEME } from '@artsy/palette'
    import { __internal__useMatchMedia } from 'Utils/Hooks/useMatchMedia'

    const App = () => {
      const isMobile = __internal__useMatchMedia(THEME.mediaQueries.sm)

      return (
        <div>Mobile view? {isMobile}</div>
      )
    }
 */
export function __internal__useMatchMedia(
  mediaQueryString: string,
  { initialMatches = null } = {}
) {
  const [matches, setMatches] = useState<boolean | null>(initialMatches)

  useEffect(() => {
    if (typeof window === "undefined" || typeof matchMedia === "undefined") {
      return
    }

    const mediaQueryList = window.matchMedia(mediaQueryString)

    setMatches(mediaQueryList.matches)

    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches)

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange)
    } else {
      mediaQueryList.addListener(handleChange)
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange)
      } else {
        mediaQueryList.removeListener(handleChange)
      }
    }
  }, [mediaQueryString])

  return matches
}
