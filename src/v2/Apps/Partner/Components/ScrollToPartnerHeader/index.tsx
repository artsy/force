import React from "react"
import { ScrollIntoView } from "v2/Utils"
import { Media } from "v2/Utils/Responsive"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"

export const ScrollToPartnerHeader: React.FC = ({ children }) => {
  return (
    <>
      <Media greaterThan="xs">
        <ScrollIntoView
          selector="#jumpto--PartnerHeader"
          offset={NAV_BAR_HEIGHT}
        >
          {children}
        </ScrollIntoView>
      </Media>
      <Media at="xs">
        <ScrollIntoView
          selector="#jumpto--PartnerHeader"
          offset={MOBILE_NAV_HEIGHT}
        >
          {children}
        </ScrollIntoView>
      </Media>
    </>
  )
}
