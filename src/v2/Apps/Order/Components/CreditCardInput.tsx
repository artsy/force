import {
  BorderBox,
  themeProps,
  useThemeConfig,
  Text,
  getThemeConfig,
  TextVariant,
} from "@artsy/palette"
import { borderMixin, v3BorderMixin } from "v2/Components/Mixins"
import React from "react"
import type {
  StripeCardNumberElementChangeEvent,
  StripeError,
} from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"
import styled, { css } from "styled-components"
import { useState } from "react"
import { fontFamily } from "@artsy/palette/dist/platform/fonts"

export const StyledCardElement = styled(CardElement)<{ isV3?: boolean }>`
  ${props => {
    const states = getThemeConfig(props, {
      v2: { padding: "9px 10px" },
      v3: { padding: "12px 10px" },
    })

    return css`
      padding: ${states.padding};
    `
  }}
  width: 100%;
`

// Re-uses old input border behavior
export interface BorderProps {
  hasError?: boolean
}

const StyledBorderBox = styled(BorderBox)<BorderProps>`
  ${props => {
    const states = getThemeConfig(props, {
      v2: { marginBottom: "0px", mixin: borderMixin },
      v3: { marginBottom: "20px", mixin: v3BorderMixin },
    })

    return css`
      ${states.mixin}
    `
  }}
  padding: 0;
  height: 40px;
`

interface CreditCardInputProps {
  error?: StripeError
  onChange?: (response: StripeCardNumberElementChangeEvent) => void
}

export const CreditCardInput: React.FC<CreditCardInputProps> = props => {
  const [focused, setFocused] = useState(false)

  const styles = useThemeConfig({
    v2: {
      fontSize: `${themeProps.typeSizes.serif["3t"].fontSize}px`,
      borderBox: "title",
      fieldHeight: "40px",
      fontColor: "black30",
      fontFamily: fontFamily.serif.regular as string,
      lineHeight: "20px",
      variant: "text" as TextVariant,
    },
    v3: {
      fontSize: "16px",
      borderBox: "title",
      fieldHeight: "50px !important",
      fontColor: "black60",
      fontFamily: "inherit",
      lineHeight: "24px",
      variant: "sm" as TextVariant,
    },
  })

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
        height={styles.fieldHeight}
      >
        <StyledCardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                "::placeholder": { color: "black60" },
                fontSize: styles.fontSize,
                fontFamily: styles.fontFamily,
                fontSmoothing: "antialiased",
                lineHeight: styles.lineHeight,
              },
            },
          }}
          onChange={onChange.bind(this)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </StyledBorderBox>
      {message && (
        <Text pt={1} variant={styles.variant} color="red100">
          {message}
        </Text>
      )}
    </>
  )
}
