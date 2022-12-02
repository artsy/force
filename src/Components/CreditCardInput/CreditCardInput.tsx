import { Text, THEME_V3 as THEME, Box, Spacer, BoxProps } from "@artsy/palette"
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"
import styled, { css } from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface CreditCardInputProps extends BoxProps {
  description?: string
  error?: string | boolean
  onChange?: (response: StripeCardElementChangeEvent) => void
  required?: boolean
  title?: string
}

/**
 * A Stripe credit card input that mimics style of V3 Palette Input.
 * Parent element must be wrapped with `CreditaCardInputProvider`.
 */
export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  description,
  error,
  onChange,
  required,
  title,
  ...rest
}) => {
  return (
    <Box data-test="creditCardInput" {...rest}>
      {(title || description) && (
        <>
          <div>
            {title && (
              <Text variant="xs">
                {title}
                {required && (
                  <Box as="span" color="brand">
                    *
                  </Box>
                )}
              </Text>
            )}

            {description && (
              <Text variant="xs" color="black60">
                {description}
              </Text>
            )}
          </div>

          <Spacer x={0.5} y={0.5} />
        </>
      )}

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
                fontSize: THEME.textVariants.sm.fontSize,
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
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid;
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
      border-color: ${themeGet("colors.black60")};
      ::placeholder {
        color: ${themeGet("colors.black100")};
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
