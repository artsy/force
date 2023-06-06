import {
  Box,
  BoxProps,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  THEME,
  Text,
} from "@artsy/palette"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"
import type {
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
  StripeElementStyleVariant,
} from "@stripe/stripe-js"
import { StripeCardCvcElementChangeEvent } from "@stripe/stripe-js"
import { themeGet } from "@styled-system/theme-get"
import { Media } from "Utils/Responsive"
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

const stripeBaseStyle: StripeElementStyleVariant = {
  "::placeholder": { color: THEME.colors.black60 },
  backgroundColor: THEME.colors.white100,
  color: THEME.colors.black100,
  fontFamily: THEME.fonts.sans,
  fontSize: THEME.textVariants["sm-display"].fontSize,
  fontSmoothing: "antialiased",
  letterSpacing: THEME.textVariants["sm-display"].letterSpacing,
  lineHeight: THEME.textVariants["sm-display"].lineHeight,
  ":-webkit-autofill": {
    backgroundColor: THEME.colors.white100,
  },
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
      <Media greaterThanOrEqual="md">
        <GridColumns>
          <Column span={12}>
            <Flex flex={1}>
              <Join separator={<Spacer x={2} />}>
                <CardElementContainer flex={3} error={!!error}>
                  <CardNumberElement
                    onChange={onChange}
                    options={{
                      showIcon: true,
                      style: { base: stripeBaseStyle },
                    }}
                  />
                </CardElementContainer>

                <CardElementContainer flex={1} error={!!error}>
                  <CardExpiryElement
                    onChange={onChange}
                    options={{ style: { base: stripeBaseStyle } }}
                  />
                </CardElementContainer>

                <CardElementContainer flex={1} error={!!error}>
                  <CardCvcElement
                    onChange={onChange}
                    options={{ style: { base: stripeBaseStyle } }}
                  />
                </CardElementContainer>
              </Join>
            </Flex>
          </Column>
        </GridColumns>
      </Media>

      <Media lessThan="md">
        <GridColumns gridRowGap={2}>
          <Column span={12}>
            <CardElementContainer error={!!error}>
              <CardNumberElement
                onChange={onChange}
                options={{
                  showIcon: true,
                  style: { base: stripeBaseStyle },
                }}
              />
            </CardElementContainer>
          </Column>

          <Column span={12}>
            <Flex flex={1}>
              <Join separator={<Spacer x={2} />}>
                <CardElementContainer flex={1} error={!!error}>
                  <CardExpiryElement
                    onChange={onChange}
                    options={{ style: { base: stripeBaseStyle } }}
                  />
                </CardElementContainer>
                <CardElementContainer flex={1} error={!!error}>
                  <CardCvcElement
                    onChange={onChange}
                    options={{ style: { base: stripeBaseStyle } }}
                  />
                </CardElementContainer>
              </Join>
            </Flex>
          </Column>
        </GridColumns>
      </Media>

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
