import {
  AutocompleteInput,
  BorderedRadio,
  Button,
  Checkbox,
  Collapse,
  Column,
  GridColumns,
  Input,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { FulfillmentDetailsForm_order$data } from "__generated__/FulfillmentDetailsForm_order.graphql"
import { FulfillmentDetailsForm_me$data } from "__generated__/FulfillmentDetailsForm_me.graphql"
import {
  AddressVerificationFlowQueryRenderer,
  AddressVerifiedBy,
} from "Apps/Order/Components/AddressVerificationFlow"
import {
  FulfillmentType,
  getShippingOption,
} from "Apps/Order/Utils/shippingUtils"
import {
  AddressAutocompleteSuggestion,
  useAddressAutocomplete,
} from "Components/Address/useAddressAutocomplete"
import {
  EMPTY_ADDRESS,
  postalCodeValidator,
  yupPhoneValidator,
} from "Components/Address/utils"
import { CountrySelect } from "Components/CountrySelect"
import {
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikTouched,
} from "formik"
import { isNil, omit, omitBy, pick } from "lodash"
import { FC, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import * as Yup from "yup"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/useFeatureFlag"

const VALIDATION_SCHEMA = Yup.object().shape({
  fulfillmentType: Yup.string().oneOf(Object.values(FulfillmentType)),

  attributes: Yup.object()
    .shape({
      // Pretty much requires an input with a country code.
      // phoneNumber: yupPhoneValidator,
      phoneNumber: Yup.string().required("Phone number is required"),
      name: Yup.string().required("Name is required"),
    })
    .when("fulfillmentType", {
      is: FulfillmentType.SHIP,
      then: schema =>
        schema.shape({
          addressLine1: Yup.string().required("Address is required"),
          city: Yup.string().required("City is required"),
          postalCode: postalCodeValidator,
          region: Yup.string().required("Region is required"),
          country: Yup.string().required("Country is required"),
        }),
    }),
})

interface PickupValues {
  fulfillmentType: FulfillmentType.PICKUP
  attributes: {
    name: string
    phoneNumber: string
  }
}

export interface ShipValues {
  fulfillmentType: FulfillmentType.SHIP
  attributes: {
    name: string
    phoneNumber: string
    phoneNumberCountryCode: string
    addressLine1: string
    addressLine2?: string
    city: string
    region: string
    country: string
    postalCode: string
    saveAddress: boolean
    addressVerifiedBy: AddressVerifiedBy | null
  }
}

export type FulfillmentValues = ShipValues | PickupValues

// Delete probably - type predicate i thought about and didnt do for now
const isShipFormValues = (
  formikProps: FormikProps<FulfillmentValues>
): formikProps is FormikProps<ShipValues> => {
  return formikProps.values.fulfillmentType === FulfillmentType.SHIP
}

export interface FulfillmentDetailsFormProps {
  active: boolean
  // availableCountries: string[]
  // availableFulfillmentTypes: FulfillmentType[]
  // initialValues: FulfillmentValues
  onSubmit: (
    values: FulfillmentValues,
    formikHelpers: FormikHelpers<FulfillmentValues>
  ) => void | Promise<any>
  // hasSavedAddresses: boolean
  me: FulfillmentDetailsForm_me$data
  order: FulfillmentDetailsForm_order$data
}

const getShippingRestrictions = (
  order: FulfillmentDetailsFormProps["order"]
): {
  lockShippingCountryTo: "EU" | string | null
} => {
  const firstArtwork = extractNodes(order.lineItems)[0]!.artwork!
  const shippingCountry = firstArtwork.shippingCountry!
  const domesticOnly = !!firstArtwork.onlyShipsDomestically
  const euOrigin = !!firstArtwork.euShippingOrigin

  const lockShippingCountryTo = domesticOnly
    ? null
    : euOrigin
    ? "EU"
    : shippingCountry
  return { lockShippingCountryTo }
}

const ORDER_EMPTY_ADDRESS: Omit<
  ShipValues["attributes"],
  "addressVerifiedBy" | "saveAddress"
> = omit(EMPTY_ADDRESS, "addressLine3", "phoneNumberCountryCode")

const getInitialValues = (
  me: FulfillmentDetailsFormProps["me"],
  order: FulfillmentDetailsFormProps["order"]
): FulfillmentValues => {
  const orderFulfillmentType = getShippingOption(order) || FulfillmentType.SHIP

  const orderAddress: Partial<ShipValues["attributes"]> = omitBy(
    pick(order.requestedFulfillment, Object.keys(ORDER_EMPTY_ADDRESS)),
    isNil
  )

  if (orderFulfillmentType === FulfillmentType.PICKUP) {
    return {
      fulfillmentType: FulfillmentType.PICKUP,
      attributes: {
        name: orderAddress.name || "",
        phoneNumber: orderAddress.phoneNumber || "",
      },
    }
  }

  const defaultCountry: string = order.lineItems?.edges?.[0]?.node?.artwork
    ?.shippingCountry!

  const initialAddress: ShipValues["attributes"] = {
    ...ORDER_EMPTY_ADDRESS,
    ...omitBy<Partial<FulfillmentValues>>(
      pick(orderAddress, Object.keys(EMPTY_ADDRESS)),
      isNil
    ),
    // TODO: Expose existing addressVerifiedBy from order?
    // Probably not, they go through the flow when they submit the form
    // that is desirable
    // alternately we could set it initially, then unset it if they
    // edit the address.
    addressVerifiedBy: null,
    saveAddress: true,
  }

  const initialValues = {
    fulfillmentType: FulfillmentType.SHIP,
    attributes: initialAddress,
  }
  if (!!initialValues.attributes.country) {
    initialValues.attributes.country = defaultCountry
  }
  return initialValues
}

export const FulfillmentDetailsForm: FC<FulfillmentDetailsFormProps> = ({
  active,
  ...props
}) => {
  const orderValues = getInitialValues(props.me, props.order)
  const firstArtwork = extractNodes(props.order.lineItems)[0]!.artwork!
  const savedAddresses = extractNodes(props.me?.addressConnection) ?? []

  const availableFulfillmentTypes: FulfillmentType[] = firstArtwork.pickupAvailable
    ? [FulfillmentType.PICKUP, FulfillmentType.SHIP]
    : [FulfillmentType.SHIP]

  const { lockShippingCountryTo } = getShippingRestrictions(props.order)

  // const lockCountriesToEU: boolean =
  //   !!firstArtwork.onlyShipsDomestically || firstArtwork.euShippingOrigin
  // const lockCountryToOrigin: boolean = false

  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  const addressVerificationIntlEnabled = !!useFeatureFlag(
    "address_verification_intl"
  )
  // trigger address verification by setting this to true
  const [addressNeedsVerification, setAddressNeedsVerification] = useState<
    boolean
  >(false)

  console.log("HERE", { orderValues, props })
  return (
    <Formik<FulfillmentValues>
      initialValues={orderValues}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={(values, helpers) => {
        if (
          !(values as ShipValues).attributes.addressVerifiedBy &&
          (values as ShipValues).attributes.country === "US"
            ? addressVerificationUSEnabled
            : addressVerificationIntlEnabled
        ) {
          setAddressNeedsVerification(true)
          helpers.setSubmitting(false)
          return
        } else {
          return props.onSubmit(values, helpers)
        }
      }}
    >
      {formikProps => {
        const { values, errors, touched, handleChange } = formikProps

        const {
          autocompleteOptions,
          fetchForAutocomplete,
          fetchSecondarySuggestions,
          ...autocomplete
          // TODO: consider extraction into a component
          // eslint-disable-next-line react-hooks/rules-of-hooks
        } = useAddressAutocomplete(
          values.attributes as ShipValues["attributes"]
        )

        const showAddressForm =
          active && values.fulfillmentType === FulfillmentType.SHIP

        // TODO: When not showing the form/creating a new address,
        // inputs should not be tabbable
        const addressFormTabIndex = showAddressForm ? 0 : -1
        // && isCreateNewAddress
        return (
          <Form>
            {availableFulfillmentTypes.length > 1 && (
              <>
                <RadioGroup
                  data-testid="shipping-options"
                  onSelect={value => {
                    formikProps.setFieldValue("fulfillmentType", value)
                  }}
                  defaultValue={values.fulfillmentType}
                >
                  <Text variant="lg-display" mb="1">
                    Delivery method
                  </Text>
                  <BorderedRadio value="SHIP" label="Shipping" />
                  <BorderedRadio
                    value="PICKUP"
                    label="Arrange for pickup (free)"
                    data-testid="pickupOption"
                  >
                    <Collapse
                      open={values.fulfillmentType === FulfillmentType.PICKUP}
                    >
                      <Text variant="xs" color="black60">
                        After your order is confirmed, a specialist will contact
                        you to coordinate pickup.
                      </Text>
                    </Collapse>
                  </BorderedRadio>
                </RadioGroup>
                <Spacer y={4} />
              </>
            )}
            {values.fulfillmentType === FulfillmentType.SHIP && (
              <>
                {/* SAVED ADDRESSES */}
                <Collapse
                  data-testid="savedAddressesCollapse"
                  open={savedAddresses.length > 0}
                >
                  <Text variant="lg-display" mb="1">
                    Delivery address
                  </Text>
                  {
                    // TODO: Maybe this stays in index? We render an error message
                    // here if shipping quotes are present but empty.
                    // isArtsyShipping &&
                    //   shippingQuotes &&
                    //   shippingQuotes.length === 0 &&
                    //   renderArtaErrorMessage()
                  }
                  {/* LAST BIG TODO??? */}

                  {/* <SavedAddresses
                    me={props.me}
                    onSelect={(
                      address: Omit<ShipValues["attributes"], "savedAddress">
                    ) => {
                      // TODO: Can i set the attributes object all at once?
                      formikProps.setFieldValue("attributes", {
                        ...address,
                        saveAddress: false,
                      })
                    }}
                  /> */}
                </Collapse>

                {/* NEW ADDRESS */}
                <Collapse
                  data-testid="addressFormCollapse"
                  open={showAddressForm}
                >
                  {
                    // TODO: Same as above
                    // isArtsyShipping &&
                    //   shippingQuotes &&
                    //   shippingQuotes.length === 0 &&
                    //   renderArtaErrorMessage()
                  }
                  <Text variant="lg-display" mb="2">
                    Delivery address
                  </Text>
                  {addressNeedsVerification && (
                    <AddressVerificationFlowQueryRenderer
                      data-testid="address-verification-flow"
                      address={{
                        addressLine1: values.attributes.addressLine1,
                        addressLine2: values.attributes.addressLine2,
                        country: values.attributes.country,
                        city: values.attributes.city,
                        region: values.attributes.region,
                        postalCode: values.attributes.postalCode,
                      }}
                      onClose={() => {
                        setAddressNeedsVerification(false)
                        formikProps.setFieldValue(
                          "attributes.addressVerifiedBy",
                          AddressVerifiedBy.USER
                        )
                      }}
                      onChosenAddress={(verifiedBy, chosenAddress) => {
                        setAddressNeedsVerification(false)
                        props.onSubmit(
                          {
                            ...values,
                            attributes: {
                              ...values.attributes,
                              ...chosenAddress,
                              addressVerifiedBy: verifiedBy,
                            },
                          },
                          formikProps
                        )
                      }}
                    />
                  )}

                  <GridColumns>
                    <Column span={12}>
                      <Input
                        tabIndex={addressFormTabIndex}
                        id="attributes.name"
                        placeholder="Full name"
                        title={"Full name"}
                        autoCorrect="off"
                        value={values.attributes.name}
                        onChange={handleChange}
                        error={
                          touched.attributes?.name && errors.attributes?.name
                        }
                        data-testid="AddressForm_name"
                      />
                    </Column>

                    <Column span={12}>
                      <Text
                        id="country-select"
                        mb={0.5}
                        variant="xs"
                        color="black100"
                      >
                        Country
                      </Text>
                      <CountrySelect
                        aria-labelledby="country-select"
                        tabIndex={addressFormTabIndex}
                        selected={values.attributes.country}
                        onSelect={handleChange}
                        disabled={
                          !!lockShippingCountryTo &&
                          lockShippingCountryTo !== "EU"
                        }
                        euShippingOnly={lockShippingCountryTo === "EU"}
                        data-testid="AddressForm_country"
                      />
                      {lockShippingCountryTo && (
                        <>
                          <Spacer x={0.5} y={0.5} />
                          <Text variant="xs" color="black60">
                            {lockShippingCountryTo === "EU"
                              ? "Continental Europe shipping only."
                              : "Domestic shipping only."}
                          </Text>
                        </>
                      )}
                    </Column>
                    <Column span={12}>
                      {!autocomplete.loaded || autocomplete.enabled ? (
                        <AutocompleteInput<AddressAutocompleteSuggestion>
                          tabIndex={addressFormTabIndex}
                          disabled={!autocomplete.loaded}
                          name="attributes.addressLine1"
                          placeholder="Street address"
                          title="Address line 1"
                          value={values.attributes.addressLine1}
                          onChange={e => {
                            // TODO: Remove- disable autocomplete for development
                            // false &&
                            autocomplete.enabled &&
                              fetchForAutocomplete({ search: e.target.value })
                            handleChange(e)
                          }}
                          options={autocompleteOptions}
                          onSelect={option => {
                            const hasSecondarySuggestions = option.entries > 1
                            if (hasSecondarySuggestions) {
                              // Fill in the address form with the selection, but skip line 2
                              Object.entries(option.address).forEach(
                                ([key, value]) => {
                                  if (key === "addressLine2") return
                                  formikProps.setFieldValue(
                                    `attributes.${key}`,
                                    value
                                  )
                                }
                              )
                              fetchSecondarySuggestions(
                                values.attributes.addressLine1,
                                option
                              )

                              // TODO: make the secondary options appear
                              // Disabled because it doesn't work and never did.
                              //
                              // console.log({ autocompleteRefCurrent: autocompleteRef.current })
                              // setTimeout(() => {
                              //   autocompleteRef.current?.focus()
                              // }, 1000)
                            } else {
                              Object.entries(option.address).forEach(
                                ([key, value]) => {
                                  formikProps.setFieldValue(
                                    `attributes.${key}`,
                                    value
                                  )
                                }
                              )
                            }
                          }}
                          error={
                            (touched as FormikTouched<ShipValues>).attributes
                              ?.addressLine1 &&
                            (errors as FormikErrors<ShipValues>).attributes
                              ?.addressLine1
                          }
                          data-testid="AddressForm_addressLine1"
                          // forwardRef={autocompleteRef}
                        />
                      ) : (
                        <Input
                          tabIndex={addressFormTabIndex}
                          name="attributes.addressLine1"
                          placeholder="Street address"
                          title="Address line 1"
                          value={values.attributes.addressLine1}
                          onChange={handleChange}
                          error={
                            (touched as FormikTouched<ShipValues>).attributes
                              ?.addressLine1 &&
                            (errors as FormikErrors<ShipValues>).attributes
                              ?.addressLine1
                          }
                          data-testid="AddressForm_addressLine1"
                        />
                      )}
                    </Column>
                    <Column span={12}>
                      <Input
                        tabIndex={addressFormTabIndex}
                        name="attributes.addressLine2"
                        placeholder="Apt, floor, suite, etc."
                        title="Address line 2 (optional)"
                        value={values.attributes.addressLine2}
                        onChange={handleChange}
                        error={
                          (touched as FormikTouched<ShipValues>).attributes
                            ?.addressLine2 &&
                          (errors as FormikErrors<ShipValues>).attributes
                            ?.addressLine2
                        }
                        data-testid="AddressForm_addressLine2"
                      />
                    </Column>
                    <Column span={12}>
                      <Input
                        tabIndex={addressFormTabIndex}
                        name="attributes.city"
                        placeholder="City"
                        title="City"
                        value={values.attributes.city}
                        onChange={handleChange}
                        error={
                          (touched as FormikTouched<ShipValues>).attributes
                            ?.city &&
                          (errors as FormikErrors<ShipValues>).attributes?.city
                        }
                        data-testid="AddressForm_city"
                      />
                    </Column>
                    <Column span={6}>
                      <Input
                        tabIndex={addressFormTabIndex}
                        name="attributes.region"
                        placeholder="State, province, or region"
                        title="State, province, or region"
                        autoCorrect="off"
                        value={values.attributes.region}
                        onChange={handleChange}
                        error={
                          (touched as FormikTouched<ShipValues>).attributes
                            ?.region &&
                          (errors as FormikErrors<ShipValues>).attributes
                            ?.region
                        }
                        data-testid="AddressForm_region"
                      />
                    </Column>
                    <Column span={6}>
                      <Input
                        tabIndex={addressFormTabIndex}
                        name="attributes.postalCode"
                        placeholder="ZIP/postal code"
                        title="Postal code"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        value={values.attributes.postalCode}
                        onChange={handleChange}
                        error={
                          (touched as FormikTouched<ShipValues>).attributes
                            ?.postalCode &&
                          (errors as FormikErrors<ShipValues>).attributes
                            ?.postalCode
                        }
                        data-testid="AddressForm_postalCode"
                      />
                    </Column>

                    {
                      <>
                        <Column span={12}>
                          <Input
                            tabIndex={addressFormTabIndex}
                            name="attributes.phoneNumber"
                            title="Phone number"
                            type="tel"
                            description={"Required for shipping logistics"}
                            placeholder="Add phone"
                            pattern="[^a-z]+"
                            value={values.attributes.phoneNumber}
                            onChange={handleChange}
                            error={
                              touched.attributes?.phoneNumber &&
                              errors.attributes?.phoneNumber
                            }
                            data-testid="AddressForm_phoneNumber"
                          />
                        </Column>
                        <Spacer y={2} />
                      </>
                    }
                  </GridColumns>
                  <Spacer y={2} />

                  <Checkbox
                    tabIndex={addressFormTabIndex}
                    onSelect={selected => {
                      formikProps.setFieldValue(
                        "attributes.saveAddress",
                        selected
                      )
                    }}
                    selected={values.attributes.saveAddress}
                    data-testid="save-address-checkbox"
                  >
                    Save shipping address for later use
                  </Checkbox>
                  <Spacer y={4} />
                </Collapse>
              </>
            )}
            {/* PHONE NUMBER */}
            <Collapse
              data-testid="phoneNumberCollapse"
              open={values.fulfillmentType === FulfillmentType.PICKUP}
            >
              {values.fulfillmentType === FulfillmentType.PICKUP && (
                <>
                  <Input
                    tabIndex={addressFormTabIndex}
                    name="attributes.phoneNumber"
                    title="Phone number"
                    type="tel"
                    description={"Required for pickup logistics"}
                    placeholder="Add phone"
                    pattern="[^a-z]+"
                    value={values.attributes.phoneNumber}
                    onChange={handleChange}
                    error={
                      touched.attributes?.phoneNumber &&
                      errors.attributes?.phoneNumber
                    }
                    data-testid="AddressForm_phoneNumber"
                  />
                  <Spacer y={4} />
                </>
              )}
            </Collapse>
            <Button
              type="submit"
              loading={formikProps.isSubmitting || undefined}
              variant="primaryBlack"
              width="50%"
              // disabled={formikProps.isValid}
            >
              Save and Continue (shipping)
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export const FulfillmentDetailsFormFragmentContainer = createFragmentContainer(
  FulfillmentDetailsForm,
  {
    order: graphql`
      fragment FulfillmentDetailsForm_order on CommerceOrder {
        internalID
        mode
        state
        requestedFulfillment {
          __typename
          ... on CommercePickup {
            phoneNumber
          }
          ... on CommerceShip {
            name
            addressLine1
            addressLine2
            city
            region
            country
            postalCode
            phoneNumber
          }
          ... on CommerceShipArta {
            name
            addressLine1
            addressLine2
            city
            region
            country
            postalCode
            phoneNumber
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
                processWithArtsyShippingDomestic
                artsyShippingInternational
                pickupAvailable
                onlyShipsDomestically
                euShippingOrigin
                shippingCountry
              }
              shippingQuoteOptions {
                edges {
                  ...ShippingQuotes_shippingQuotes
                  node {
                    id
                    isSelected
                  }
                }
              }
            }
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
    me: graphql`
      fragment FulfillmentDetailsForm_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        name
        email
        id
        location {
          country
        }
        ...SavedAddresses_me
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  }
)
