import { useSystemContext } from "v2/System"
import {
  MOBILE_LOGGED_IN_NAV_HEIGHT,
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_BAR_HEIGHT,
} from "./constants"

export const useNavBarHeight = () => {
  const { isLoggedIn } = useSystemContext()

  const mobile = isLoggedIn ? MOBILE_LOGGED_IN_NAV_HEIGHT : MOBILE_NAV_HEIGHT
  const desktop = DESKTOP_NAV_BAR_HEIGHT

  return { height: [mobile, desktop], mobile, desktop }
}
