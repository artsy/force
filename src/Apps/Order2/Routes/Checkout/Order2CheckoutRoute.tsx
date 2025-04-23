import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import {
  Box,
  Button,
  Checkbox,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { addressFormFieldsValidator } from "Components/Address/AddressFormFields"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import type { Order2CheckoutRoute_viewer$key } from "__generated__/Order2CheckoutRoute_viewer.graphql"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import { useEffect } from "react"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
import * as yup from "yup"

const logger = createLogger("Order2DetailsRoute.tsx")

interface Order2CheckoutRouteProps {
  viewer: Order2CheckoutRoute_viewer$key
}
export const Order2CheckoutRoute: React.FC<Order2CheckoutRouteProps> = ({
  viewer,
}) => {
  const { isEigen } = useSystemContext()

  const data = useFragment(FRAGMENT, viewer)
  const isCheckoutRedesignEnabled = useFlag("emerald_checkout-redesign")

  // biome-ignore lint/correctness/useExhaustiveDependencies: placeholder because we aren't using this yet
  useEffect(() => {
    logger.warn("Order checkout page data:", {
      data,
      isCheckoutRedesignEnabled,
    })
  }, [isCheckoutRedesignEnabled])

  if (!isCheckoutRedesignEnabled) return <ErrorPage code={404} />

  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withPhoneNumber: true }),
    saveAddress: yup.boolean(),
  })

  return (
    <>
      <Title>Checkout | Artsy</Title>
      <Meta
        name="viewport"
        content={
          isEigen
            ? "width=device-width, user-scalable=no"
            : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        }
      />
      <GridColumns>
        <Column span={[12, 8]} start={[1, 2]}>
          <Box backgroundColor="mono0" py={2} px={2}>
            <Flex justifyContent="space-between">
              <Text flex={1} variant="xs">
                Order Summary
              </Text>
              <ChevronDownIcon />
            </Flex>
          </Box>
          <Stack gap={1} bg="mono5">
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
          </Stack>
        </Column>
      </GridColumns>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2CheckoutRoute_viewer on Viewer
  @argumentDefinitions(orderID: { type: "String!" }) {
    me {
      order(id: $orderID) {
        internalID
      }
      addressConnection(first: 10) {
        edges {
          node {
            internalID
          }
        }
      }
    }
  }
`
