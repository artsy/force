import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import LockIcon from "@artsy/icons/LockIcon"
import { Box, Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import { FadeInBox } from "Components/FadeInBox"
import type { Order2PaymentForm_me$data } from "__generated__/Order2PaymentForm_me.graphql"
import type React from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface SavedPaymentMethodOptionProps {
  me: Order2PaymentForm_me$data
  isSelected: boolean
  selectedSavedPaymentMethod: any | null
  allowedSavedBankAccounts: any[]
  onSelect: () => void
  onSavedPaymentMethodSelect: (paymentMethod: any) => void
}

export const SavedPaymentMethodOption: React.FC<
  SavedPaymentMethodOptionProps
> = ({
  me,
  isSelected,
  selectedSavedPaymentMethod,
  allowedSavedBankAccounts,
  onSelect,
  onSavedPaymentMethodSelect,
}) => {
  const savedCreditCards =
    me.creditCards?.edges?.map(edge => edge?.node).filter(Boolean) ?? []

  return (
    <FadeInBox>
      <Box
        backgroundColor="mono5"
        borderRadius="5px"
        padding="1rem"
        marginBottom="10px"
        border={isSelected ? "1px solid" : "none"}
        borderColor="mono10"
        style={{ cursor: "pointer" }}
        onClick={onSelect}
      >
        <HoverFlex alignItems="center">
          <HoverIcon fill={isSelected ? "mono100" : "mono60"} />
          {/* Spacer has to be 31px to match Stripe's spacing */}
          <Spacer x="31px" />
          <HoverText
            variant="sm"
            color={isSelected ? "mono100" : "mono60"}
            fontWeight={isSelected ? "bold" : "normal"}
          >
            Saved payments
          </HoverText>
        </HoverFlex>

        <Collapse open={isSelected}>
          <Text variant="sm" ml="50px">
            Select a saved payment method or add a new one.
          </Text>

          <Box ml="50px">
            <RadioGroup
              defaultValue={selectedSavedPaymentMethod}
              onSelect={val => {
                onSavedPaymentMethodSelect(val)
              }}
            >
              {[...savedCreditCards, ...allowedSavedBankAccounts].map(
                paymentMethod => (
                  <Radio
                    key={paymentMethod.internalID}
                    value={paymentMethod}
                    pb="15px"
                    pt="15px"
                    label={
                      <Flex>
                        {paymentMethod.__typename === "CreditCard" ? (
                          <>
                            <BrandCreditCardIcon
                              type={paymentMethod.brand as Brand}
                              width="24px"
                              height="24px"
                              mr={1}
                            />
                            <Text variant="sm">
                              •••• {paymentMethod.lastDigits}
                            </Text>
                          </>
                        ) : (
                          <>
                            <InstitutionIcon
                              fill="mono100"
                              width="24px"
                              height="24px"
                              mr={1}
                            />
                            <Text variant="sm">
                              {paymentMethod.bankName &&
                                `${paymentMethod.bankName} `}
                              •••• {paymentMethod.last4}
                            </Text>
                          </>
                        )}
                      </Flex>
                    }
                  />
                ),
              )}
            </RadioGroup>
          </Box>
        </Collapse>
      </Box>
    </FadeInBox>
  )
}

const HoverText = styled(Text)`
  transition: color 0.25s;
`

const HoverIcon = styled(LockIcon)`
  svg {
    transition: fill 0.25s;
  }
`

const HoverFlex = styled(Flex)`
  &:hover ${HoverText} {
    color: ${themeGet("colors.mono100")};
  }

  &:hover ${HoverIcon} svg {
    fill: ${themeGet("colors.mono100")};
  }
`
