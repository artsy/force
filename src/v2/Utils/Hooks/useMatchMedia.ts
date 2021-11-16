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

    import { themeProps } from '@artsy/palette'
    import { __internal__useMatchMedia } from 'Utils/Hooks/useMatchMedia'

    const App = () => {
      const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.sm)

      return (
        <div>Mobile view? {isMobile}</div>
      )
    }
 */
export function __internal__useMatchMedia(
  mediaQueryString: string,
  { initialMatches = null } = {}
) {
  const [matches, setMatches] = useState(initialMatches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    setMatches(mediaQueryList.matches)
    const handleChange = event => setMatches(event.matches)

    mediaQueryList.addListener(handleChange)

    return () => {
      mediaQueryList.removeListener(handleChange)
    }
  }, [mediaQueryString])

  // Exit if we're in a server-like environment
  const isServer = typeof window === "undefined"
  if (isServer) {
    return matches
  }

  return matches
}
