import { useSystemContext } from "v2/Artsy"
import {
  MOBILE_LOGGED_IN_NAV_HEIGHT,
  MOBILE_NAV_HEIGHT,
  NAV_BAR_HEIGHT,
} from "./constants"

export const useNavBarHeight = () => {
  const { user } = useSystemContext()
  const isLoggedIn = Boolean(user)

  const mobile = isLoggedIn ? MOBILE_LOGGED_IN_NAV_HEIGHT : MOBILE_NAV_HEIGHT
  const desktop = NAV_BAR_HEIGHT

  return { height: [mobile, desktop], mobile, desktop }
}
