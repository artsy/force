import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import {
  Box,
  Button,
  Checkbox,
  Column,
  Flex,
  GridColumns,
  Image,
  Link,
  PhoneInput,
  Spacer,
  Stack,
  Tab,
  Tabs,
  Text,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { addressFormFieldsValidator } from "Components/Address/AddressFormFields"
import { AddressFormFields } from "Components/Address/AddressFormFields"
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

const TEMP_DATA = {
  artworkVersionImageResizedUrl:
    "https://d196wkiy8qx2u5.cloudfront.net?height=138&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FidB9tWSQTPziYVn7rPLb0A%2Flarge.jpg&width=185",
  artworkVersionTitle: "Paper Dreams #5",
  artworkVersionArtistNames: "Viccel, Cheatham and Howe, plus a lot more",
  artworkVersionDate: "2023",
  // Working of ArtworkSummaryItem this comes from artwork, others from artworkVersion
  artworkSlug: "viccel-paper-dreams-number-5",
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
          <Stack gap={1} bg="mono5">
            <Box data-testid="OrderSummaryTop" backgroundColor="mono0">
              <Flex py={1} px={2} justifyContent="space-between">
                <Link
                  flex={0}
                  href={`/artwork/${TEMP_DATA.artworkSlug}`}
                  target="_blank"
                >
                  <Image
                    mr={1}
                    src={TEMP_DATA.artworkVersionImageResizedUrl}
                    alt={TEMP_DATA.artworkVersionTitle || ""}
                    width="55px"
                  />
                </Link>
                <Box
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  flex={1}
                  mr={1}
                >
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="sm-display"
                    color="mono100"
                  >
                    {TEMP_DATA.artworkVersionArtistNames}
                  </Text>
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="sm-display"
                    color="mono60"
                    textAlign="left"
                  >
                    {TEMP_DATA.artworkVersionTitle},{" "}
                    {TEMP_DATA.artworkVersionDate}
                  </Text>
                </Box>
                <ChevronDownIcon />
              </Flex>
            </Box>
            <Flex
              data-testid="FulfillmentDetailsSection"
              flexDirection="column"
              backgroundColor="mono0"
              py={2}
              px={2}
            >
              <Tabs
                data-testid="DeliveryOrPickupTabs"
                justifyContent="center"
                initialTabIndex={0}
                onChange={tabInfo => {
                  // Required because the tabInfo.name is a customized text element
                  const selected =
                    tabInfo?.tabIndex === 0 ? "delivery" : "pickup"
                  console.log("Tab change", selected)
                }}
              >
                <Tab name={<Text variant="xs">Delivery</Text>}>
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
                  </Box>
                </Tab>
                <Tab name={<Text variant="xs">Pickup</Text>}>
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
                        formikHelpers: FormikHelpers<FormikValues>,
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

            <Flex
              data-testID="ShippingMethodSection"
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
            <Flex
              data-testID="PaymentMethodSction"
              flexDirection="column"
              backgroundColor="mono0"
              mb={1}
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
            <Flex
              data-testid="OrderSummaryReviewSection"
              flexDirection="column"
              backgroundColor="mono0"
              p={2}
            >
              <Text variant="sm-display" fontWeight="medium" color="mono100">
                Order summary
              </Text>
              <Flex
                py={1}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Link
                  flex={0}
                  href={`/artwork/${TEMP_DATA.artworkSlug}`}
                  target="_blank"
                >
                  <Image
                    mr={1}
                    src={TEMP_DATA.artworkVersionImageResizedUrl}
                    alt={TEMP_DATA.artworkVersionTitle || ""}
                    width="55px"
                  />
                </Link>
                <Box
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  flex={1}
                >
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="sm"
                    color="mono100"
                  >
                    {TEMP_DATA.artworkVersionArtistNames}
                  </Text>
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="sm"
                    color="mono60"
                    textAlign="left"
                  >
                    {TEMP_DATA.artworkVersionTitle},{" "}
                    {TEMP_DATA.artworkVersionDate}
                  </Text>
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="sm"
                    color="mono60"
                    textAlign="left"
                  >
                    List price: $1,000,000
                  </Text>
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="xs"
                    color="mono60"
                    textAlign="left"
                  >
                    From an unknown edition
                  </Text>
                  <Text
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="xs"
                    color="mono60"
                    textAlign="left"
                  >
                    78 x 78 x 6in (27.9 x 27.9 x 8.9 cm)
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Flex data-testid="OrderSummaryPriceLineItem">
                  <Text flexGrow={1} variant="sm-display" color="mono60">
                    Price
                  </Text>
                  <Text flexGrow={0} variant="sm-display" color="mono60">
                    $15,000
                  </Text>
                </Flex>
                <Flex data-testid="OrderSummaryShippingLineItem">
                  <Text flexGrow={1} variant="sm-display" color="mono60">
                    Shipping
                  </Text>
                  <Text flexGrow={0} variant="sm-display" color="mono60">
                    Calculated in next steps
                  </Text>
                </Flex>
                <Flex data-testid="OrderSummaryTaxLineItem">
                  <Text flexGrow={1} variant="sm-display" color="mono60">
                    Tax*
                  </Text>
                  <Text flexGrow={0} variant="sm-display" color="mono60">
                    Calculated in next steps
                  </Text>
                </Flex>
                <Flex data-testid="OrderSummaryTotalPrice">
                  <Text
                    flexGrow={1}
                    variant="sm-display"
                    color="mono100"
                    fontWeight="medium"
                  >
                    Total
                  </Text>
                  <Text
                    flexGrow={0}
                    variant="sm-display"
                    color="mono100"
                    fontWeight="medium"
                  >
                    Waiting for final cost
                  </Text>
                </Flex>
              </Box>
              <Text variant="xs" color="mono60" textAlign="left" mt={2}>
                *Additional duties and taxes{" "}
                <Link target="_blank" href="#">
                  may apply at import
                </Link>
                .
              </Text>
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
