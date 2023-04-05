import { Flex, FlexProps } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

export const ArtworkListImageBorder = styled(Flex)<FlexProps>`
  box-sizing: border-box;
  border: 1px solid ${themeGet("colors.black15")};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`
