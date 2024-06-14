import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { themeGet } from "@styled-system/theme-get"

export const StyledLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};

  &:hover {
    color: ${themeGet("colors.brand")};
  }
`
