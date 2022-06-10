import { css } from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export interface BorderProps {
  hasError?: boolean
}

export const borderMixin = css`
  border: 1px solid
    ${({ hasError }: BorderProps) =>
      hasError ? themeGet("colors.red100") : themeGet("colors.black30")};
  transition: border-color 0.25s;

  &:hover,
  &:focus,
  &.focused {
    border-color: ${({ hasError }: BorderProps) =>
      hasError ? themeGet("colors.red100") : themeGet("colors.black60")};
    outline: 0;
  }

  &:disabled {
    border: 2px dotted ${themeGet("colors.black30")};
  }
`
