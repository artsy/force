import { CheckIcon } from "@artsy/palette"
import { garamond } from "v2/Assets/Fonts"
import { Component } from "react";
import styled from "styled-components"
import { ExtractProps } from "v2/Utils/ExtractProps"
import colors from "../Assets/Colors"

export interface CheckboxState {
  checked: boolean
}

export type CheckboxProps = ExtractProps<typeof CheckboxInput>

/**
 * @deprecated in favor of our Design System Checkbox component in @artsy/palette
 * https://palette.artsy.net/elements/inputs/checkbox
 */
export class Checkbox extends Component<CheckboxProps, CheckboxState> {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked || false,
    }
  }

  onChange = event => {
    if (this.props.onChange) {
      this.props.onChange(event)
    }

    this.setState({
      checked: event.currentTarget.checked,
    })
  }

  render() {
    const {
      children,
      className,
      disabled,
      error,
      ref,
      ...remainderProps
    } = this.props
    const { checked } = this.state

    const fill = disabled && checked ? "black30" : "white100"

    return (
      <Label className={className} error={error}>
        <CheckmarkContainer>
          <CheckboxInput
            {...remainderProps}
            type="checkbox"
            onChange={this.onChange}
            checked={checked}
            disabled={disabled}
            error={error}
          />

          {(!disabled || checked) && <PositionedCheckmark fill={fill} />}
        </CheckmarkContainer>

        {children}
      </Label>
    )
  }
}

const CheckmarkContainer = styled.div`
  width: 20px;
  height: 20px;
  top: -1px;
  margin-right: 0.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PositionedCheckmark = styled(CheckIcon)`
  z-index: 1;
`

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  position: absolute;
  margin: 0;
  left: 0;
  border: none;

  /* The after represents the square box */
  &::after {
    transition: all 0.25s;
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: 0;
    top: 0;
    box-sizing: border-box;
    background-color: ${colors.white};
    border: 2px solid
      ${({ error }: { error?: boolean }) =>
        error ? colors.redMedium : colors.grayRegular};
  }

  &:checked::after {
    background-color: ${colors.black};
    border-color: ${colors.black};
  }

  &:disabled::after {
    background-color: ${colors.gray};
    border-color: ${colors.grayRegular};
  }
`

const Label = styled.label<CheckboxProps>`
  ${garamond("s16")};
  position: relative;
  line-height: 135%;
  cursor: pointer;
  display: flex;
  align-items: center;
  ${({ error }) => error && `color: ${colors.redMedium}`};

  &:hover {
    ${CheckboxInput} {
      &::after {
        background-color: ${colors.grayRegular};
        border-color: ${colors.grayRegular};
      }

      &:checked::after {
        background-color: ${colors.black};
        border-color: ${colors.black};
      }
    }
  }
`

export default Checkbox
