import THEME from "@artsy/palette-tokens"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import {
  DESKTOP_NAV_BAR_HEIGHT,
  MOBILE_APP_DOWNLOAD_BANNER_HEIGHT,
  MOBILE_NAV_HEIGHT,
} from "./constants"

export const useNavBarHeight = (): {
  /* Height of the mobile navbar */
  mobile: number
  /* Height of the desktop navbar */
  desktop: number
  /* Used as responsive prop: [mobile, desktop] */
  height: [number, number]
  /* Not SSR friendly. For use in client-side calculations */
  computedHeight: number
} => {
  const { isEigen } = useSystemContext()
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  // Navbar is disabled in Eigen
  if (isEigen) {
    return {
      height: [0, 0],
      mobile: 0,
      desktop: 0,
      computedHeight: 0,
    }
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  const { match } = useRouter()

  const mobile =
    MOBILE_NAV_HEIGHT -
    // App download banner is disabled on the home page
    (match?.location?.pathname === "/" ? MOBILE_APP_DOWNLOAD_BANNER_HEIGHT : 0)
  const desktop = DESKTOP_NAV_BAR_HEIGHT

  const computedHeight = isMobile ? mobile : desktop

  return {
    height: [mobile, desktop],
    mobile,
    desktop,
    computedHeight,
  }
}
