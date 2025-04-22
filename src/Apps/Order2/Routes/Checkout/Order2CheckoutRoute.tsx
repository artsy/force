import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import {
  Box,
  Button,
  Checkbox,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { addressFormFieldsValidator } from "Components/Address/AddressFormFields"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { ErrorPage } from "Components/ErrorPage"
import type { Order2CheckoutRoute_order$key } from "__generated__/Order2CheckoutRoute_order.graphql"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import { useEffect } from "react"
import { Title } from "react-head"
import { graphql, useFragment } from "react-relay"
import * as yup from "yup"

interface CheckoutProps {
  order: Order2CheckoutRoute_order$key
}
export const Order2CheckoutRoute: React.FC<CheckoutProps> = ({ order }) => {
  const data = useFragment(ORDER_FRAGMENT, order)
  const isRedesignEnabled = useFlag("emerald_checkout-redesign")

  // biome-ignore lint/correctness/useExhaustiveDependencies: placeholder because we aren't using this yet
  useEffect(() => {
    console.warn("Checkout order data:", data)
  }, [])

  if (!isRedesignEnabled) return <ErrorPage code={404} />

  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withPhoneNumber: true }),
    saveAddress: yup.boolean(),
  })

  return (
    <>
      <Title>Checkout | Artsy</Title>
      <GridColumns p={0}>
        <Column span={[12, 8]} start={[1, 2]}>
          <Flex flexDirection="column" backgroundColor="mono0" py={2} px={2}>
            <Flex flexDirection="row" justifyContent="space-between">
              <Text flex={1} variant="xs">
                Order Summary
              </Text>
              <ChevronDownIcon />
            </Flex>
          </Flex>
          <Join separator={<Box height={10} bg="mono5" />}>
            <Flex flexDirection="column" backgroundColor="mono0" py={2} px={2}>
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
                    <Spacer y={2} />
                    <Checkbox
                      onSelect={selected => {
                        formikContext.setFieldValue("saveAddress", selected)
                      }}
                      selected={formikContext.values.saveAddress}
                      data-testid="saveAddress"
                    >
                      Save address
                    </Checkbox>
                    <Spacer y={4} />
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

            <Flex flexDirection="column" backgroundColor="mono0" p={2}>
              <Text variant="sm" fontWeight={"medium"} color="mono100">
                Shipping Method
              </Text>
              <Text variant="xs" color="mono60">
                Options vary based on address and artwork size.
              </Text>
            </Flex>
            <Flex flexDirection="column" backgroundColor="mono0" mb={1} p={2}>
              <Text variant="sm" fontWeight={"medium"} color="mono100">
                Payment
              </Text>
              <Text variant="xs" color="mono60">
                Pay by credit card, bank account, or wire transfer.
              </Text>
              {/* <PaymentForm /> */}
            </Flex>
          </Join>
        </Column>
      </GridColumns>
    </>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2CheckoutRoute_order on Order {
    internalID
  }
`
