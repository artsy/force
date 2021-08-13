import colors from "v2/Assets/Colors"
import { garamond } from "v2/Assets/Fonts"
import { css } from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export interface BorderProps {
  hasError?: boolean
}

export const borderMixin = css`
  border: 1px solid
    ${({ hasError }: BorderProps) =>
      hasError ? colors.redMedium : colors.grayRegular};
  transition: border-color 0.25s;

  &:hover,
  &:focus,
  &.focused {
    border-color: ${({ hasError }: BorderProps) =>
      hasError ? colors.redMedium : colors.purpleRegular};
    outline: 0;
  }

  &:disabled {
    border: 2px dotted ${colors.grayRegular};
  }
`
export const v3BorderMixin = css`
  margin-bottom: 20px;
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

export const borderedInputMixin = css`
  padding: 10px;
  box-shadow: none;
  transition: border-color 0.25s;
  margin-right: 10px;
  resize: none;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::placeholder {
    color: ${colors.grayMedium};
    text-overflow: ellipsis;
    line-height: normal;
  }

  ${garamond("s17")};
  ${borderMixin};
`
