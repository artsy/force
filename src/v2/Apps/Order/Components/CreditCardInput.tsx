import { BorderBox, Sans, color, themeProps } from "@artsy/palette"
import { fontFamily } from "@artsy/palette/dist/platform/fonts"
import {
  BorderProps as InputBorderProps,
  borderMixin as inputBorder,
} from "v2/Components/Mixins"
import React from "react"
import type {
  StripeCardNumberElementChangeEvent,
  StripeError,
} from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"
import styled from "styled-components"

export const StyledCardElement = styled(CardElement)`
  width: 100%;
  padding: 9px 10px;
`

// Re-uses old input border behavior
const StyledBorderBox = styled(BorderBox)<InputBorderProps>`
  ${inputBorder};
  padding: 0;
  height: 40px;
`

interface CreditCardInputProps {
  error?: StripeError
  onChange?: (response: StripeCardNumberElementChangeEvent) => void
}

interface CreditCardInputState {
  focused: boolean
}

export class CreditCardInput extends React.Component<
  CreditCardInputProps,
  CreditCardInputState
> {
  state = {
    focused: false,
  }

  onChange(response: StripeCardNumberElementChangeEvent) {
    if (this.props.onChange) {
      this.props.onChange(response)
    }
  }

  render() {
    const { message } = this.props.error ? this.props.error : { message: null }

    return (
      <>
        <StyledBorderBox
          className={`${this.state.focused ? "focused" : ""}`}
          hasError={!!message}
          p={1}
        >
          <StyledCardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  "::placeholder": { color: color("black30") },
                  fontFamily: fontFamily.serif.regular as string,
                  fontSize: `${themeProps.typeSizes.serif["3t"].fontSize}px`,
                  fontSmoothing: "antialiased",
                  lineHeight: "20px",
                },
              },
            }}
            onChange={this.onChange.bind(this)}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() =>
              this.setState({
                focused: false,
              })
            }
          />
        </StyledBorderBox>
        {message && (
          <Sans pt={1} size="2" color="red100">
            {message}
          </Sans>
        )}
      </>
    )
  }
}
