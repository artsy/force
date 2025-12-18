import InfoIcon from "@artsy/icons/InfoIcon"
import {
  Box,
  Checkbox,
  Clickable,
  Flex,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import {
  AddressFormFields,
  type FormikContextWithAddress,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { Formik } from "formik"
import { isEqual } from "lodash"
import type React from "react"
import * as yup from "yup"

interface StripePaymentCheckboxesProps {
  selectedPaymentMethod:
    | "saved"
    | "stripe-card"
    | "wire"
    | "stripe-ach"
    | "stripe-sepa"
    | null
  savePaymentMethod: boolean
  activeFulfillmentDetailsTab: string | null
  billingAddressSameAsShipping: boolean
  billingFormValues: FormikContextWithAddress
  onSavePaymentMethodChange: (save: boolean) => void
  onBillingAddressSameAsShippingChange: (selected: boolean) => void
  onBillingFormValuesChange: (values: FormikContextWithAddress) => void
}

export const StripePaymentCheckboxes: React.FC<
  StripePaymentCheckboxesProps
> = ({
  selectedPaymentMethod,
  savePaymentMethod,
  activeFulfillmentDetailsTab,
  billingAddressSameAsShipping,
  billingFormValues,
  onSavePaymentMethodChange,
  onBillingAddressSameAsShippingChange,
  onBillingFormValuesChange,
}) => {
  const needsBillingAddress = () => {
    if (selectedPaymentMethod !== "stripe-card") return false
    if (activeFulfillmentDetailsTab === "PICKUP") return true
    return !billingAddressSameAsShipping
  }

  return (
    <>
      {/* Credit Card Options */}
      <Collapse
        open={selectedPaymentMethod === "stripe-card"}
        data-testid="stripe-card-collapse"
      >
        <Box p={2}>
          {activeFulfillmentDetailsTab !== "PICKUP" && (
            <>
              <Checkbox
                selected={billingAddressSameAsShipping}
                onSelect={onBillingAddressSameAsShippingChange}
                data-testid="billing-address-same-as-shipping"
              >
                Billing address same as shipping
              </Checkbox>

              <Spacer y={2} />
            </>
          )}

          <Checkbox
            selected={savePaymentMethod}
            onSelect={onSavePaymentMethodChange}
          >
            Save credit card for later use
          </Checkbox>

          {needsBillingAddress() && (
            <>
              <Spacer y={4} />
              <Text variant="sm" fontWeight="bold" mb={2}>
                Billing address
              </Text>
              <Formik
                initialValues={billingFormValues}
                validationSchema={yup
                  .object()
                  .shape(addressFormFieldsValidator())}
                onSubmit={(values: FormikContextWithAddress) => {
                  onBillingFormValuesChange(values)
                }}
                enableReinitialize
              >
                {({ values }) => {
                  if (!isEqual(values, billingFormValues)) {
                    onBillingFormValuesChange(values)
                  }

                  return <AddressFormFields />
                }}
              </Formik>
            </>
          )}
        </Box>
      </Collapse>

      {/* Bank Debit Options (ACH) */}
      <Collapse
        open={selectedPaymentMethod === "stripe-ach"}
        data-testid="stripe-ach-collapse"
      >
        <Box p={2}>
          <Flex>
            <Checkbox
              selected={savePaymentMethod}
              onSelect={onSavePaymentMethodChange}
            >
              Save bank account for later use.
            </Checkbox>

            <Tooltip
              placement="top-start"
              width={400}
              content={`Thank you for signing up for direct debits from Artsy. You
                    have authorized Artsy and, if applicable, its affiliated
                    entities to debit the bank account specified above, on behalf
                    of sellers that use the Artsy website, for any amount owed for
                    your purchase of artworks from such sellers, according to
                    Artsy's website and terms. You can change or cancel this
                    authorization at any time by providing Artsy with 30 (thirty)
                    days' notice. By clicking "Save bank account for later use",
                    you authorize Artsy to save the bank account specified above.`}
            >
              <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                <InfoIcon />
              </Clickable>
            </Tooltip>
          </Flex>
        </Box>
      </Collapse>
    </>
  )
}
