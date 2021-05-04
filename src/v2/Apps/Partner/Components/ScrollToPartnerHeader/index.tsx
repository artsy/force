import React from "react"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import { Clickable, BoxProps, themeProps } from "@artsy/palette"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { scrollIntoView } from "v2/Utils/scrollHelpers"

export const ScrollToPartnerHeader: React.FC<BoxProps> = ({
  children,
  ...rest
}) => {
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  return (
    <Clickable
      onClick={() => {
        scrollIntoView({
          selector: "#jumpto--PartnerHeader",
          offset: isMobile ? MOBILE_NAV_HEIGHT : NAV_BAR_HEIGHT,
        })
      }}
      {...rest}
    >
      {children}
    </Clickable>
  )
}
