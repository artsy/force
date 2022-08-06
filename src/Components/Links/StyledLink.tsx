import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { themeGet } from "@styled-system/theme-get"

export const StyledLink = styled(RouterLink)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: ${themeGet("colors.black100")};

  &:hover {
    color: ${themeGet("colors.brand")};
  }
`
