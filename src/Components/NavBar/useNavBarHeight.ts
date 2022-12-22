import { useSystemContext } from "System"
import {
  MOBILE_LOGGED_IN_NAV_HEIGHT,
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_BAR_HEIGHT,
} from "./constants"

export const useNavBarHeight = () => {
  const { isLoggedIn, isEigen } = useSystemContext()

  let mobile = isLoggedIn ? MOBILE_LOGGED_IN_NAV_HEIGHT : MOBILE_NAV_HEIGHT
  let desktop = DESKTOP_NAV_BAR_HEIGHT

  if (isEigen) {
    mobile = 0
    desktop = 0
  }

  return { height: [mobile, desktop], mobile, desktop }
}
