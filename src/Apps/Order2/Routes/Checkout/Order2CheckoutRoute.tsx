import {
  Box,
  Button,
  Checkbox,
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
import { useFlag } from "@unleash/proxy-client-react"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2ReviewStep } from "Apps/Order2/Routes/Checkout/Components/Order2ReviewStep"
import { addressFormFieldsValidator } from "Components/Address/AddressFormFields"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { countries as phoneCountryOptions } from "Utils/countries"
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
  const order = data.me?.order
  const isCheckoutRedesignEnabled = useFlag("emerald_checkout-redesign")

  // biome-ignore lint/correctness/useExhaustiveDependencies: placeholder because we aren't using this yet
  useEffect(() => {
    logger.warn("Order checkout page data:", {
      data,
      isCheckoutRedesignEnabled,
    })
  }, [isCheckoutRedesignEnabled])

  const validationSchema = yup.object().shape({
    ...addressFormFieldsValidator({ withPhoneNumber: true }),
    saveAddress: yup.boolean(),
  })

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
            <Flex
              data-testid="FulfillmentDetailsStep"
              flexDirection="column"
              backgroundColor="mono0"
              py={2}
            >
              <Tabs
                data-testid="DeliveryOrPickupTabs"
                justifyContent="space-between"
                initialTabIndex={0}
                onChange={tabInfo => {
                  // Required because the tabInfo.name is a customized text element
                  const selected =
                    tabInfo?.tabIndex === 0 ? "delivery" : "pickup"
                  console.log("Tab change", selected)
                }}
              >
                <Tab
                  name={
                    // margins here come pretty close to making the tabs fill the full width
                    <Text mx={50} variant="xs">
                      Delivery
                    </Text>
                  }
                >
                  <Box px={2}>
                    <Text
                      fontWeight="medium"
                      color="mono100"
                      variant="sm-display"
                    >
                      Delivery address
                    </Text>
                    <Spacer y={2} />
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
                        console.warn(
                          "Delivery address values submitted:",
                          values,
                        )
                      }}
                    >
                      {formikContext => (
                        <Flex flexDirection={"column"} mb={2}>
                          <AddressFormFields withPhoneNumber />
                          <Spacer y={2} />
                          <Checkbox
                            onSelect={selected => {
                              formikContext.setFieldValue(
                                "saveAddress",
                                selected,
                              )
                            }}
                            selected={formikContext.values.saveAddress}
                            data-testid="saveAddress"
                          >
                            <Text variant="xs">
                              Save shipping address for later use
                            </Text>
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
                      onSubmit={(
                        values: FormikValues,
                        // formikHelpers: FormikHelpers<FormikValues>,
                      ) => {
                        console.warn("Pickup values submitted:", values)
                      }}
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
            </Flex>

            {/* Shipping method Step */}
            <Flex
              data-testID="ShippingMethodStep"
              flexDirection="column"
              backgroundColor="mono0"
              p={2}
            >
              <Text variant="sm-display" fontWeight="medium" color="mono100">
                Shipping Method
              </Text>
              <Text variant="xs" color="mono60">
                Options vary based on address and artwork size
              </Text>
            </Flex>

            {/* Payment method Step */}
            <Flex
              data-testID="PaymentMethodSction"
              flexDirection="column"
              backgroundColor="mono0"
              p={2}
            >
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
