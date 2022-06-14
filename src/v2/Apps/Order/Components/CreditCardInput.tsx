import { BorderBox, Text, THEME_V3 } from "@artsy/palette"
import { borderMixin } from "v2/Components/Mixins"
import * as React from "react"
import type {
  StripeCardNumberElementChangeEvent,
  StripeError,
} from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"
import styled from "styled-components"
import { useState } from "react"

export const StyledCardElement = styled(CardElement)`
  width: 100%;
  padding: 12px 10px;
`

// Re-uses old input border behavior
export interface BorderProps {
  hasError?: boolean
}

const StyledBorderBox = styled(BorderBox)<BorderProps>`
  ${borderMixin}
  padding: 0;
`

interface CreditCardInputProps {
  error?: StripeError
  onChange?: (response: StripeCardNumberElementChangeEvent) => void
}

/**
 * @deprecated Use `v2/Components/CreditCardInput` instead
 */
export const CreditCardInput: React.FC<CreditCardInputProps> = props => {
  const [focused, setFocused] = useState(false)

  const onChange = (response: StripeCardNumberElementChangeEvent) => {
    if (props.onChange) {
      props.onChange(response)
    }
  }

  const { message } = props.error ? props.error : { message: null }

  return (
    <>
      <StyledBorderBox
        className={`${focused ? "focused" : ""}`}
        hasError={!!message}
        p={1}
        height={THEME_V3.space[5]}
      >
        <StyledCardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                "::placeholder": { color: THEME_V3.colors.black60 },
                fontSize: THEME_V3.textVariants.sm.fontSize,
                fontFamily: THEME_V3.fonts.sans,
                fontSmoothing: "antialiased",
                lineHeight: THEME_V3.textVariants.sm.lineHeight,
              },
            },
          }}
          onChange={onChange.bind(this)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </StyledBorderBox>

      {message && (
        <Text mt={0.5} variant="xs" color="red100">
          {message}
        </Text>
      )}
    </>
  )
}
