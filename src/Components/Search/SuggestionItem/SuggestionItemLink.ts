import { RouterLink } from "System/Components/RouterLink"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export const SuggestionItemLink = styled(RouterLink).attrs({
  color: "black100",
  px: 2,
  py: 1,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  min-height: 60px;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`
