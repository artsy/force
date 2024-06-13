import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  MOBILE_LOGGED_IN_NAV_HEIGHT,
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_BAR_HEIGHT,
} from "./constants"

export const useNavBarHeight = (): {
  height: [number, number]
  mobile: number
  desktop: number
} => {
  const { isLoggedIn, isEigen } = useSystemContext()

  // Navbar is disabled in Eigen
  if (isEigen) {
    return { height: [0, 0], mobile: 0, desktop: 0 }
  }

  const mobile = isLoggedIn ? MOBILE_LOGGED_IN_NAV_HEIGHT : MOBILE_NAV_HEIGHT
  const desktop = DESKTOP_NAV_BAR_HEIGHT

  return { height: [mobile, desktop], mobile, desktop }
}
