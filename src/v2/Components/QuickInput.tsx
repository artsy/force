import { space } from "@artsy/palette"
import { fadeIn, fadeOut } from "v2/Assets/Animations"
import Colors from "v2/Assets/Colors"
import { garamond, unica } from "v2/Assets/Fonts"
import { Component } from "react"
import styled from "styled-components"
import { borderedInputMixin } from "./Mixins"

import { ExtractProps } from "v2/Utils/ExtractProps"
import { InputError } from "./Input"

export interface QuickInputProps extends ExtractProps<typeof InputComponent> {
  block?: boolean
  error?: string
  label?: string
  note?: string
  rightAddOn?: JSX.Element
  setTouched?: (fields: { [field: string]: boolean }) => void
  touchedOnChange?: boolean
}

export interface QuickInputState {
  focused: boolean
  value: string
}

/**
 * Quick input. Renders the label inside of the textbox.
 * @deprecated
 */
export class QuickInput extends Component<QuickInputProps, QuickInputState> {
  state = {
    focused: false,
    value: (this.props.value as string) || "",
    touchedOnChange: true,
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.name !== newProps.name) {
      this.setState({
        value: "",
      })
    }
  }

  onFocus = e => {
    this.setState({
      focused: true,
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur = e => {
    if (this.props.setTouched) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.setTouched({ [this.props.name]: true })
    }
    this.setState({
      focused: false,
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  onChange = e => {
    if (this.props.touchedOnChange && this.props.setTouched) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.setTouched({ [this.props.name]: true })
    }
    this.setState({
      value: e.currentTarget.value,
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    const {
      error,
      className,
      label,
      ref: _ref,
      onChange,
      setTouched,
      rightAddOn,
      note,
      ...newProps
    } = this.props
    const showLabel = (!!this.state.focused || !!this.state.value) && !!label

    return (
      <Container>
        <InputContainer
          hasLabel={!!label}
          hasError={!!error}
          className={this.state.focused ? "focused" : ""}
        >
          <Label out={!showLabel}>{label}</Label>
          <InputComponent
            {...newProps}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.value}
            showLabel={showLabel}
          />
          {rightAddOn}
        </InputContainer>
        {note && <InputNote>{note}</InputNote>}
        {error && <InputError>{error}</InputError>}
      </Container>
    )
  }
}

const Container = styled.div`
  padding-bottom: ${space(0.5)}px;
`

const InputComponent = styled.input`
  ${garamond("s17")};
  border: 0;
  outline: none;
  flex: 1;
  transition: all 0.25s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 ${space(1)}px;
  line-height: initial;
  ${(props: { showLabel?: boolean }) =>
    props.showLabel && `padding: ${space(1)}px ${space(1)}px 0 ${space(1)}px`};
`

const InputContainer = styled.div<{
  hasLabel?: boolean
  hasError: boolean
}>`
  ${borderedInputMixin}
  margin-right: 0;
  margin-top: ${space(0.5)}px;
  margin-bottom: ${space(1)}px;
  display: flex;
  position: relative;
  height: ${p => (p.hasLabel ? `${space(4)}px` : `${space(2)}px`)};
  flex-direction: row;
  align-items: center;
  box-sizing: content-box;
`

const Label = styled.label<{ out: boolean }>`
  ${unica("s12", "medium")};
  position: absolute;
  left: ${space(1)}px;
  top: ${space(1)}px;
  visibility: ${p => (p.out ? "hidden" : "visible")};
  animation: ${p => (p.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 0.2s linear;
  z-index: 1;
`

const InputNote = styled.div`
  ${unica("s12")};
  margin-top: ${space(1)}px;
  color: ${Colors.graySemibold};
  height: 16px;
`

export default QuickInput
