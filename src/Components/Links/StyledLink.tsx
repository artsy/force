import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Components/RouterLink"
import styled from "styled-components"

export const StyledLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};

  &:hover {
    color: ${themeGet("colors.brand")};
  }
`
