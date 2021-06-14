import { useEffect, useState } from "react"

/**
 * Checks to see if the browser matches a particular media query
 *
 * Thanks! https://github.com/olistic/react-use-media/
 *
 * @example

    import { themeProps } from '@artsy/palette'
    import { useMatchMedia } from 'Utils/Hooks/useMatchMedia'

    const App = () => {
      const isMobile = useMatchMedia(themeProps.mediaQueries.sm)

      return (
        <div>Mobile view? {isMobile}</div>
      )
    }
 */
export function useMatchMedia(
  mediaQueryString: string,
  { initialMatches = false } = {}
) {
  const [matches, setMatches] = useState<boolean>(initialMatches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)
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
