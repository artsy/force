import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Components/RouterLink"
import styled from "styled-components"

export const SuggestionItemLink = styled(RouterLink).attrs({
  color: "mono100",
  px: 2,
  py: 1,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  min-height: 60px;

  &:hover {
    background-color: ${themeGet("colors.mono5")};
  }
`
