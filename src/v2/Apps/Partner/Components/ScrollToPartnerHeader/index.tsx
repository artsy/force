import React from "react"
import { Clickable, BoxProps, themeProps } from "@artsy/palette"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

export const ScrollToPartnerHeader: React.FC<BoxProps> = ({
  children,
  ...rest
}) => {
  const { mobile, desktop } = useNavBarHeight()
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)

  return (
    <Clickable
      onClick={() => {
        scrollIntoView({
          selector: "#jumpto--PartnerHeader",
          offset: isMobile ? mobile : desktop,
        })
      }}
      {...rest}
    >
      {children}
    </Clickable>
  )
}
