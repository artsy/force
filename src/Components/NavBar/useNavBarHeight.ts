import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  DESKTOP_NAV_BAR_HEIGHT,
  MOBILE_APP_DOWNLOAD_BANNER_HEIGHT,
  MOBILE_NAV_HEIGHT,
} from "./constants"

export const useNavBarHeight = (): {
  height: [number, number]
  mobile: number
  desktop: number
} => {
  const { isEigen } = useSystemContext()

  // Navbar is disabled in Eigen
  if (isEigen) {
    return { height: [0, 0], mobile: 0, desktop: 0 }
  }

  const { match } = useRouter()

  const mobile =
    MOBILE_NAV_HEIGHT -
    // App download banner is disabled on the home page
    (match?.location?.pathname === "/" ? MOBILE_APP_DOWNLOAD_BANNER_HEIGHT : 0)
  const desktop = DESKTOP_NAV_BAR_HEIGHT

  return { height: [mobile, desktop], mobile, desktop }
}
