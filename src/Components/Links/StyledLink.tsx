import { RouterLink } from "System/Components/RouterLink"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

export const StyledLink = styled(RouterLink)`
  color: ${themeGet("colors.mono100")};

  &:hover {
    color: ${themeGet("colors.brand")};
  }
`
