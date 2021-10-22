import { Box, color, space } from "@artsy/palette"
import { growAndFadeIn } from "v2/Assets/Animations"
import { garamond, unica } from "v2/Assets/Fonts"
import * as React from "react";
import styled from "styled-components"
import { block } from "./Helpers"
import { borderedInputMixin } from "./Mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  block?: boolean
  description?: string
  error?: string
  ref?: React.RefObject<any>
  title?: string
}

/**
 * @deprecated in favor of our Design System Input component in @artsy/palette
 * https://palette.artsy.net/elements/inputs/input
 */
export const Input: React.ExoticComponent<InputProps> = React.forwardRef(
  ({ error, title, description, ...rest }, ref) => {
    return (
      <Box>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        <StyledInput ref={ref} hasError={!!error} {...rest} />
        {error && <InputError>{error}</InputError>}
      </Box>
    )
  }
)

export const StyledInput = styled.input`
  ${borderedInputMixin};
  ${block(24)};

  /* Remove shadow and default border radius on iOS */
  background-clip: padding-box;
  border-radius: 0;
`

export const Title = styled.div`
  ${garamond("s17")};
`

const Description = styled.div`
  ${garamond("s15")};
  color: ${color("black60")};
  margin: ${space(0.3)}px 0 0;
`

export const InputError = styled.div`
  ${unica("s12")};
  margin-top: ${space(1)}px;
  color: ${color("red100")};
  transition: visibility 0.2s linear;
  animation: ${growAndFadeIn("16px")} 0.25s linear;
  height: 16px;
`

export default Input
