import { Box } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

export const NavBarNotificationIndicator = styled(Box)`
  width: 4px;
  height: 4px;
  background-color: ${themeGet("colors.brand")};
  border-radius: 50%;
`
