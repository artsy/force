import {
  Box,
  type BoxProps,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js"
import type {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
  StripeElementStyleVariant,
} from "@stripe/stripe-js"
import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"

interface CreditCardInputProps extends BoxProps {
  error?: string | boolean
  onChange?: (
    response:
      | StripeCardCvcElementChangeEvent
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
  ) => void
  required?: boolean
}

/**
 * A Stripe credit card input that mimics style of V3 Palette Input.
 * Parent element must be wrapped with `CreditaCardInputProvider`.
 */
export const CreditCardInput: React.FC<
  React.PropsWithChildren<CreditCardInputProps>
> = ({ error, onChange, required, ...rest }) => {
  const { theme } = useTheme()

  const stripeBaseStyle: StripeElementStyleVariant = {
    "::placeholder": { color: theme.colors.mono60 },
    backgroundColor: theme.colors.mono0,
    color: theme.colors.mono100,
    fontFamily: theme.fonts.sans,
    fontSize: theme.textVariants["sm-display"].fontSize,
    fontSmoothing: "antialiased",
    letterSpacing: theme.textVariants["sm-display"].letterSpacing,
    lineHeight: theme.textVariants["sm-display"].lineHeight,
    ":-webkit-autofill": {
      backgroundColor: theme.colors.mono0,
    },
  }

  return (
    <Box data-test="creditCardInput" {...rest}>
      <GridColumns gridRowGap={2}>
        <Column span={[12, 6]}>
          <CardElementContainer data-test="cardNumberInput" error={!!error}>
            <CardNumberElement
              onChange={onChange}
              options={{
                showIcon: true,
                style: { base: stripeBaseStyle },
              }}
            />
          </CardElementContainer>
        </Column>

        <Column span={[12, 6]}>
          <Flex flex={1}>
            <Join separator={<Spacer x={2} />}>
              <CardElementContainer
                data-test="expDateInput"
                flex={1}
                error={!!error}
              >
                <CardExpiryElement
                  onChange={onChange}
                  options={{ style: { base: stripeBaseStyle } }}
                />
              </CardElementContainer>
              <CardElementContainer
                data-test="cvcInput"
                flex={1}
                error={!!error}
              >
                <CardCvcElement
                  onChange={onChange}
                  options={{ style: { base: stripeBaseStyle } }}
                />
              </CardElementContainer>
            </Join>
          </Flex>
        </Column>
      </GridColumns>

      {error && typeof error === "string" && (
        <Text variant="xs" color="red100" mt={0.5}>
          {error}
        </Text>
      )}
    </Box>
  )
}

const CardElementContainer = styled(Flex)<{ error: boolean }>`
  > .StripeElement {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 0 ${themeGet("space.1")};
    border: 1px solid;
    border-radius: 3px;
    border-color: ${themeGet("colors.mono30")};
    transition: border-color 0.25s;
    ::placeholder {
      color: ${themeGet("colors.mono60")};
    }

    ${({ error }) =>
      error &&
      css`
        border-color: ${themeGet("colors.red100")};
      `}

    &:hover {
      color: ${themeGet("colors.mono100")};
      !&--invalid && border-color: ${themeGet("colors.mono60")};
      ::placeholder {
        color: ${themeGet("colors.mono100")};
      }
    }

    &--focus {
      color: ${themeGet("colors.mono100")};
      border-color: ${themeGet("colors.blue100")};
      ::placeholder {
        color: ${themeGet("colors.mono60")};
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
