import { Flex } from "@artsy/palette"
import styled from "styled-components"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "../NavBar"

export interface BaseContainerProps {
  stuck?: boolean
}

export const BaseContainer = styled(Flex).attrs({
  top: [MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT],
  bg: "white100",
})<BaseContainerProps>`
  position: sticky;
  z-index: 1;
`
