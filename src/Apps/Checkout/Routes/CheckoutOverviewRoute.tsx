import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { Button, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { PaymentForm } from "Apps/Checkout/Components/PaymentForm"
import { addressFormFieldsValidator } from "Components/Address/AddressFormFields"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import * as yup from "yup"

export const CheckoutOverviewRoute: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withPhoneNumber: true }),
    saveAddress: yup.boolean(),
  })

  return (
    <Flex
      flexDirection="column"
      alignContent={"flex-start"}
      justifyContent={"flex-start"}
      maxWidth={600}
      mx="auto"
      px={2}
      py={4}
      backgroundColor="black5"
      minHeight={"100vh"}
    >
      <Flex
        flexDirection="column"
        backgroundColor="white100"
        mb={1}
        py={2}
        px={2}
      >
        <Flex flexDirection="row" justifyContent="space-between">
          <Text flex={1} variant="xs">
            Order Summary
          </Text>
          <ChevronDownIcon />
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        backgroundColor="white100"
        mb={1}
        py={2}
        px={2}
      >
        <Text variant="sm">Delivery address</Text>
        <Formik
          initialValues={{
            address: {
              name: "",
              country: "",
              postalCode: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              region: "",
            },
            phoneNumber: "",
            phoneNumberCountryCode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormikValues,
            formikHelpers: FormikHelpers<FormikValues>,
          ) => {
            console.warn("Delivery address values submitted:", values)
          }}
        >
          {formikContext => (
            <Flex flexDirection={"column"} mb={2}>
              <AddressFormFields withPhoneNumber />
              <Spacer y={1} />
              <Checkbox
                onSelect={selected => {
                  formikContext.setFieldValue("saveAddress", selected)
                }}
                selected={formikContext.values.saveAddress}
                data-testid="saveAddress"
              >
                Save address
              </Checkbox>
              <Spacer y={1} />
              <Button
                type="submit"
                onClick={() => formikContext.handleSubmit()}
              >
                See Shipping Methods
              </Button>
            </Flex>
          )}
        </Formik>
      </Flex>
      <Flex
        flexDirection="column"
        backgroundColor="white100"
        mb={1}
        py={2}
        px={2}
      >
        <Text variant="sm" fontWeight={"medium"} color="black100">
          Shipping Method
        </Text>
        <Text variant="xs" color="black60">
          Options vary based on address and artwork size.
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        backgroundColor="white100"
        mb={1}
        py={2}
        px={2}
      >
        <Text variant="sm" fontWeight={"medium"} color="black100">
          Payment
        </Text>
        <Text variant="xs" color="black60">
          Pay by credit card, bank account, or wire transfer.
        </Text>
        {/* <PaymentForm /> */}
      </Flex>
    </Flex>
  )
}
