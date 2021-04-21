import { themeProps } from "@artsy/palette"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "./constants"

export const useNavBarHeight = (
  mobileMediaQueryString: string = themeProps.mediaQueries.xs
) => {
  const isMobile = useMatchMedia(mobileMediaQueryString)

  return isMobile ? MOBILE_NAV_HEIGHT : NAV_BAR_HEIGHT
}
