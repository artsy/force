import { EyeClosedIcon } from "@artsy/palette/dist/svgs/EyeClosedIcon"
import { EyeOpenedIcon } from "@artsy/palette/dist/svgs/EyeOpenedIcon"
import { space } from "@artsy/palette/dist/helpers/space"
import React from "react"
import styled from "styled-components"

import QuickInput, { QuickInputProps } from "./QuickInput"

export interface PasswordInputProps extends QuickInputProps {
  showPasswordMessage?: boolean
}

export interface PasswordInputState {
  showPassword: boolean
}

/**
 * Password input.
 * Renders the label inside of the textbox; shows/hides the password.
 *
 */
export class PasswordInput extends React.Component<
  PasswordInputProps,
  PasswordInputState
  > {
  state = {
    showPassword: false,
  }

  getRightViewForPassword() {
    const icon = this.state.showPassword ? (
      <EyeClosedIcon onClick={this.toggleShowPassword} />
    ) : (
        <EyeOpenedIcon onClick={this.toggleShowPassword} />
      )

    return <Eye onClick={this.toggleShowPassword}>{icon}</Eye>
  }

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  render() {
    const { error, showPasswordMessage, ref, ...newProps } = this.props

    const type = this.state.showPassword ? "text" : "password"
    const note =
      !error && showPasswordMessage && "Password must be at least 8 characters."

    return (
      <QuickInput
        {...newProps}
        error={error}
        type={type}
        rightAddOn={this.getRightViewForPassword()}
        note={note}
      />
    )
  }
}

const Eye = styled.span`
  position: absolute;
  right: ${space(1)}px;
  z-index: 1;
`

export default PasswordInput
