import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  PhoneInput,
  Spacer,
  Stack,
  Tab,
  Tabs,
  Text,
} from "@artsy/palette"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2DeliveryForm } from "Apps/Order2/Routes/Checkout/Components/Order2DeliveryForm"
import { Order2ReviewStep } from "Apps/Order2/Routes/Checkout/Components/Order2ReviewStep"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { countries as phoneCountryOptions } from "Utils/countries"
import type { Order2CheckoutRoute_viewer$key } from "__generated__/Order2CheckoutRoute_viewer.graphql"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutRouteProps {
  viewer: Order2CheckoutRoute_viewer$key
}

export const Order2CheckoutRoute: React.FC<Order2CheckoutRouteProps> = ({
  viewer,
}) => {
  const { isEigen } = useSystemContext()

  const data = useFragment(FRAGMENT, viewer)
  const order = data.me?.order
  const fulfillmentOptions = order?.fulfillmentOptions

  if (!order) {
    return <ErrorPage code={404} message="Order not found" />
  }

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
          <Stack gap={1} bg="mono5">
            {/* Collapsible order summary */}
            <Order2CollapsibleOrderSummary order={order} />
            {/* Fulfillment details Step */}
            <Flex flexDirection="column" backgroundColor="mono0" py={2}>
              {fulfillmentOptions?.some(option => option.type === "PICKUP") ? (
                <Tabs justifyContent="space-between" initialTabIndex={0}>
                  <Tab
                    name={
                      <Text mx={50} variant="xs">
                        Delivery
                      </Text>
                    }
                  >
                    <Box px={2}>
                      <Order2DeliveryForm
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
                        onSubmit={(
                          values: FormikValues,
                          formikHelpers: FormikHelpers<FormikValues>,
                        ) => {}}
                      />
                    </Box>
                  </Tab>
                  <Tab
                    name={
                      <Text mx={50} variant="xs">
                        Pickup
                      </Text>
                    }
                  >
                    <Box px={2}>
                      <Text
                        fontWeight="medium"
                        color="mono100"
                        variant="sm-display"
                      >
                        Free pickup
                      </Text>
                      <Text variant="xs" color="mono60" my={1}>
                        After your order is confirmed, a specialist will contact
                        you with details on how to pick up the work.
                      </Text>
                      <Formik
                        initialValues={{
                          pickupPhoneNumber: "",
                          pickupPhoneNumberCountryCode: "",
                        }}
                        validationSchema={{}}
                        onSubmit={(values: FormikValues) => {}}
                      >
                        {formikContext => (
                          <GridColumns data-testid={"PickupDetailsForm"}>
                            <Column span={12}>
                              <PhoneInput
                                mt={1}
                                name="pickupPhoneNumber"
                                onChange={formikContext.handleChange}
                                onBlur={formikContext.handleBlur}
                                data-testid={"PickupPhoneNumberInput"}
                                options={phoneCountryOptions}
                                onSelect={(
                                  option: (typeof phoneCountryOptions)[number],
                                ): void => {
                                  formikContext.setFieldValue(
                                    "pickupPhoneNumberCountryCode",
                                    option.value,
                                  )
                                }}
                                dropdownValue={
                                  formikContext.values
                                    .pickupPhoneNumberCountryCode
                                }
                                inputValue={
                                  formikContext.values.pickupPhoneNumber
                                }
                                placeholder="(000) 000 0000"
                                error={
                                  (formikContext.touched
                                    .pickupPhoneNumberCountryCode &&
                                    (formikContext.errors
                                      .pickupPhoneNumberCountryCode as
                                      | string
                                      | undefined)) ||
                                  (formikContext.touched.pickupPhoneNumber &&
                                    (formikContext.errors.pickupPhoneNumber as
                                      | string
                                      | undefined))
                                }
                                required
                              />
                              <Spacer y={4} />
                              <Button
                                variant={"primaryBlack"}
                                width="100%"
                                type="submit"
                                onClick={() => formikContext.handleSubmit()}
                              >
                                Continue to Payment
                              </Button>
                            </Column>
                          </GridColumns>
                        )}
                      </Formik>
                    </Box>
                  </Tab>
                </Tabs>
              ) : (
                <Box px={2}>
                  <Order2DeliveryForm
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
                    onSubmit={(values: FormikValues) => {}}
                  />
                </Box>
              )}
            </Flex>

            {/* Shipping method Step */}
            <Flex flexDirection="column" backgroundColor="mono0" p={2}>
              <Text variant="sm-display" fontWeight="medium" color="mono100">
                Shipping Method
              </Text>
              <Text variant="xs" color="mono60">
                Options vary based on address and artwork size
              </Text>
            </Flex>

            {/* Payment method Step */}
            <Flex flexDirection="column" backgroundColor="mono0" p={2}>
              <Text variant="sm-display" fontWeight="medium" color="mono100">
                Payment
              </Text>
              <Text variant="xs" color="mono60">
                Options vary based on price, gallery, and location
              </Text>
              {/* <PaymentForm /> */}
            </Flex>

            <Order2ReviewStep order={order} />
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
        fulfillmentOptions {
          type
        }
        ...Order2CollapsibleOrderSummary_order
        ...Order2ReviewStep_order
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
