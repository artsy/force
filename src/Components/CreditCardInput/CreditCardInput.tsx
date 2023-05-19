import { Box, BoxProps, THEME, Text } from "@artsy/palette"
import { CardElement } from "@stripe/react-stripe-js"
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js"
import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"

interface CreditCardInputProps extends BoxProps {
  error?: string | boolean
  onChange?: (response: StripeCardElementChangeEvent) => void
  required?: boolean
}

/**
 * A Stripe credit card input that mimics style of V3 Palette Input.
 * Parent element must be wrapped with `CreditaCardInputProvider`.
 */
export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  error,
  onChange,
  required,
  ...rest
}) => {
  return (
    <Box data-test="creditCardInput" {...rest}>
      <FauxInput error={!!error}>
        <CardElement
          onChange={onChange}
          options={{
            hidePostalCode: true,
            style: {
              base: {
                "::placeholder": { color: THEME.colors.black60 },
                backgroundColor: THEME.colors.white100,
                color: THEME.colors.black100,
                fontFamily: THEME.fonts.sans,
                fontSize: THEME.textVariants["sm-display"].fontSize,
                fontSmoothing: "antialiased",
                letterSpacing: THEME.textVariants.sm.letterSpacing,
                lineHeight: THEME.textVariants.sm.lineHeight,
              },
            },
          }}
        />
      </FauxInput>

      {error && typeof error === "string" && (
        <Text variant="xs" color="red100" mt={0.5}>
          {error}
        </Text>
      )}
    </Box>
  )
}

const FauxInput = styled(Box)<{ error: boolean }>`
  > .StripeElement {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 0 ${themeGet("space.1")};
    border: 1px solid;
    border-radius: 3px;
    border-color: ${themeGet("colors.black30")};
    transition: border-color 0.25s;
    ::placeholder {
      color: ${themeGet("colors.black60")};
    }

    ${({ error }) =>
      error &&
      css`
        border-color: ${themeGet("colors.red100")};
      `}

    &:hover {
      color: ${themeGet("colors.black100")};
      !&--invalid && border-color: ${themeGet("colors.black60")};
      ::placeholder {
        color: ${themeGet("colors.black100")};
      }
    }

    &--focus {
      color: ${themeGet("colors.black100")};
      border-color: ${themeGet("colors.blue100")};
      ::placeholder {
        color: ${themeGet("colors.black60")};
      }
    }

    &--invalid {
      border-color: ${themeGet("colors.red100")};
    }

    > div {
      width: 100%;
    }
  }
`
