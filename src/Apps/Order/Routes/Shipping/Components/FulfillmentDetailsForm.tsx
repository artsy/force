import {
  BorderedRadio,
  Checkbox,
  Column,
  GridColumns,
  Input,
  RadioGroup,
  Spacer,
  Text,
  usePrevious,
} from "@artsy/palette"
import {
  AddressVerificationFlowQueryRenderer,
  AddressVerifiedBy,
} from "Apps/Order/Components/AddressVerificationFlow"
import * as Yup from "yup"

import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Collapse } from "Apps/Order/Components/Collapse"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { SavedAddresses } from "Apps/Order/Routes/Shipping/Components/SavedAddresses"
import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import {
  ADDRESS_VALIDATION_SHAPE,
  BASIC_PHONE_VALIDATION_SHAPE,
  FulfillmentType,
  type FulfillmentValues,
  type PickupValues,
  type SavedAddressType,
  type ShipValues,
  addressWithFallbackValues,
  getInitialShippingValues,
} from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { ScrollToFieldError } from "Apps/Order/Utils/scrollToFieldError"
import { AddressAutocompleteInput } from "Components/Address/AddressAutocompleteInput"
import { CountrySelect } from "Components/CountrySelect"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { FulfillmentDetailsForm_me$data } from "__generated__/FulfillmentDetailsForm_me.graphql"
import {
  Form,
  Formik,
  type FormikErrors,
  type FormikTouched,
  useFormikContext,
} from "formik"
import pick from "lodash/pick"
import { useCallback, useEffect, useState } from "react"

export interface FulfillmentDetailsFormProps
  extends FulfillmentDetailsFormLayoutProps {
  initialValues: FulfillmentValues
  onSubmit: (values: FulfillmentValues, helpers: any) => void
}

interface FulfillmentDetailsFormLayoutProps {
  me: FulfillmentDetailsForm_me$data
  verifyAddressNow: boolean
  onAddressVerificationComplete: () => void
  availableFulfillmentTypes: FulfillmentType[]
}

export type AddressFormMode = "saved_addresses" | "new_address" | "pickup"

export const FulfillmentDetailsForm = ({
  initialValues,
  onSubmit,
  ...layoutProps
}: FulfillmentDetailsFormProps) => {
  return (
    <Formik<FulfillmentValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={VALIDATION_SCHEMA}
    >
      <FulfillmentDetailsFormLayout {...layoutProps} />
    </Formik>
  )
}

const FulfillmentDetailsFormLayout = (
  props: FulfillmentDetailsFormLayoutProps,
) => {
  const { contextPageOwnerId } = useAnalyticsContext()

  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()

  const renderMissingShippingQuotesError = !!(
    shippingContext.orderData.savedFulfillmentDetails?.isArtsyShipping &&
    shippingContext.orderData.shippingQuotes &&
    shippingContext.orderData.shippingQuotes.length === 0
  )

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const formikContext = useFormikContext<FulfillmentValues>()
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    setTouched,
  } = formikContext

  const addressFormMode: AddressFormMode =
    values.fulfillmentType === "SHIP"
      ? shippingContext.state.shippingFormMode
      : "pickup"

  /**
   * Expose formik context to entire shipping route
   * via `shippingContext.state.fulfillmentDetailsCtx`
   */

  
// biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
useEffect(() => {
    shippingContext.actions.setFulfillmentDetailsFormikContext(formikContext)
  }, [formikContext.values, formikContext.isValid])

  // Wrapper for change handlers that sets the stage to fulfillment_details
  // when the user edits an address field
  const withBackToFulfillmentDetails =
    <F extends (...args: any[]) => void>(cb: F) =>
    (...args: Parameters<F>) => {
      if (addressFormMode === "new_address") {
        shippingContext.actions.goBackToFulfillmentDetails()
      }
      cb(...args)
    }

  const handleCloseVerification = async () => {
    await setFieldValue("meta.addressVerifiedBy", AddressVerifiedBy.USER)
    await props.onAddressVerificationComplete()
  }

  const serializedValues = JSON.stringify(formikContext.values)

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
  const handleSelectSavedAddress = useCallback(
    (address: SavedAddressType) => {
      shippingContext.actions.setStage("fulfillment_details")

      formikContext.setValues({
        ...formikContext.values,
        fulfillmentType: FulfillmentType.SHIP,
        attributes: addressWithFallbackValues(address),
        meta: {
          ...formikContext.values.meta,
        },
      })

      // Set the state to indicate the form should be submitted
      setShouldSubmit(true)
    },
    [formikContext.setValues, serializedValues],
  )

  // Use useEffect to submit the form after values are updated
  // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
    useEffect(() => {
    if (shouldSubmit) {
      formikContext.submitForm()
      setShouldSubmit(false) // Reset the state after submission
    }
  }, [formikContext.values, shouldSubmit])

  const handleChooseAddressForVerification = async (
    verifiedBy,
    chosenAddress,
  ) => {
    const newValues = {
      ...values,
      attributes: {
        ...values.attributes,
        ...chosenAddress,
      },
      meta: {
        ...values.meta,
        addressVerifiedBy: verifiedBy,
      },
    }
    await setValues(newValues)
    await props.onAddressVerificationComplete()

    formikContext.submitForm()
  }

  const previousFulfillmentType = usePrevious(values.fulfillmentType)

  const handleChangeFulfillmentType = async (newValue: FulfillmentType) => {
    orderTracking.clickedFulfillmentType(newValue)
    if (newValue === previousFulfillmentType) {
      return
    }

    shippingContext.actions.goBackToFulfillmentDetails()
    await setTouched({})

    if (newValue === FulfillmentType.PICKUP) {
      const initialValuesForPickup: PickupValues = {
        fulfillmentType: FulfillmentType.PICKUP,
        attributes: {
          name: "",
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
          postalCode: "",
          country: "",
        },
        meta: {},
      }

      await setValues(initialValuesForPickup)
      return
    }

    if (newValue === FulfillmentType.SHIP) {
      const savedAddresses = shippingContext.meData.addressList

      await setValues(
        getInitialShippingValues(
          savedAddresses,
          shippingContext.orderData.shipsFrom,
          shippingContext.meData.name,
          shippingContext.orderData.availableShippingCountries,
        ),
      )
    }
  }

  // When not showing the form/creating a new address,
  // inputs should not be tabbable
  const tabbableIf = (activeForm: AddressFormMode): 0 | -1 =>
    addressFormMode === activeForm ? 0 : -1

  const savedAddressesErrors =
    (addressFormMode === "saved_addresses" &&
      Object.entries(errors.attributes || {})) ||
    []

  return (
    <Form data-testid="FulfillmentDetails_form">
      <ScrollToFieldError />
      {props.verifyAddressNow && (
        <AddressVerificationFlowQueryRenderer
          data-testid="address-verification-flow"
          address={
            pick(values.attributes, [
              "addressLine1",
              "addressLine2",
              "city",
              "region",
              "postalCode",
              "country",
            ]) as ShipValues["attributes"]
          }
          onClose={handleCloseVerification}
          onChosenAddress={handleChooseAddressForVerification}
        />
      )}
      {props.availableFulfillmentTypes.includes(FulfillmentType.PICKUP) && (
        <>
          <RadioGroup
            data-testid="shipping-options"
            onSelect={value => {
              handleChangeFulfillmentType(value)
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
                <Text variant="xs" color="mono60">
                  After your order is confirmed, a specialist will contact you
                  to coordinate pickup.
                </Text>
              </Collapse>
            </BorderedRadio>
          </RadioGroup>
          <Spacer y={4} />
        </>
      )}
      {values.fulfillmentType === FulfillmentType.SHIP && (
        <>
          <Text variant="lg-display" mb="1">
            Delivery address
          </Text>{" "}
          {renderMissingShippingQuotesError && (
            <ArtaMissingShippingQuoteMessage />
          )}
          {/* SAVED ADDRESSES */}
          <Collapse
            data-testid="savedAddressesCollapse"
            open={addressFormMode === "saved_addresses"}
          >
            {savedAddressesErrors.length > 0 && (
              <Text variant="xs" color="red100" mb={2}>
                The selected address is invalid. Please edit it or select a new
                address.
              </Text>
            )}
            <SavedAddresses
              active={addressFormMode === "saved_addresses"}
              onSelect={handleSelectSavedAddress}
            />
          </Collapse>
          {/* NEW ADDRESS */}
          <Collapse
            data-testid="addressFormCollapse"
            open={addressFormMode === "new_address"}
          >
            <GridColumns>
              <Column span={12}>
                <Input
                  tabIndex={tabbableIf("new_address")}
                  name="attributes.name"
                  placeholder="Full name"
                  title={"Full name"}
                  autoCorrect="off"
                  value={values.attributes.name}
                  onChange={withBackToFulfillmentDetails(handleChange)}
                  onBlur={handleBlur}
                  error={touched.attributes?.name && errors.attributes?.name}
                  data-testid="AddressForm_name"
                />
              </Column>

              <Column span={12}>
                <Text id="country-select" mb={0.5} variant="xs" color="mono100">
                  Country
                </Text>
                <CountrySelect
                  aria-labelledby="country-select"
                  tabIndex={tabbableIf("new_address")}
                  selected={values.attributes.country}
                  onSelect={withBackToFulfillmentDetails(selected => {
                    setFieldValue("attributes.country", selected)
                  })}
                  disabled={
                    !!shippingContext.orderData.lockShippingCountryTo &&
                    shippingContext.orderData.lockShippingCountryTo !== "EU"
                  }
                  euShippingOnly={
                    shippingContext.orderData.lockShippingCountryTo === "EU"
                  }
                  data-testid="AddressForm_country"
                />
                {shippingContext.orderData.lockShippingCountryTo && (
                  <>
                    <Spacer x={0.5} y={0.5} />
                    <Text variant="xs" color="mono60">
                      {shippingContext.orderData.lockShippingCountryTo === "EU"
                        ? "Continental Europe shipping only."
                        : "Domestic shipping only."}
                    </Text>
                  </>
                )}
              </Column>
              <Column span={12}>
                <AddressAutocompleteInput
                  address={{
                    country: (values.attributes as ShipValues["attributes"])
                      .country,
                  }}
                  trackingValues={{
                    contextModule: ContextModule.ordersShipping,
                    contextOwnerType: OwnerType.ordersShipping,
                    contextPageOwnerId: contextPageOwnerId || "",
                  }}
                  flip={false}
                  disableAutocomplete={values.attributes.region === "AK"}
                  tabIndex={tabbableIf("new_address")}
                  name="attributes.addressLine1"
                  placeholder="Street address"
                  title="Street address"
                  value={values.attributes.addressLine1}
                  onChange={withBackToFulfillmentDetails(handleChange)}
                  onSelect={option => {
                    const selectedAddress = option.address
                    setValues({
                      ...values,
                      attributes: {
                        ...values.attributes,
                        addressLine1: selectedAddress.addressLine1,
                        addressLine2: selectedAddress.addressLine2,
                        city: selectedAddress.city,
                        region: selectedAddress.region,
                        postalCode: selectedAddress.postalCode,
                        country: selectedAddress.country,
                      },
                    })
                    shippingContext.actions.goBackToFulfillmentDetails()
                  }}
                  error={
                    (touched as FormikTouched<ShipValues>).attributes
                      ?.addressLine1 &&
                    (errors as FormikErrors<ShipValues>).attributes
                      ?.addressLine1
                  }
                  data-testid="AddressForm_addressLine1"
                  onClear={() => {
                    setFieldValue("attributes.addressLine1", "")
                  }}
                />
              </Column>
              <Column span={12}>
                <Input
                  tabIndex={tabbableIf("new_address")}
                  name="attributes.addressLine2"
                  placeholder="Apt, floor, suite, etc."
                  title="Address line 2 (optional)"
                  value={values.attributes.addressLine2}
                  onChange={withBackToFulfillmentDetails(handleChange)}
                  onBlur={handleBlur}
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
                  tabIndex={tabbableIf("new_address")}
                  name="attributes.city"
                  placeholder="City"
                  title="City"
                  value={values.attributes.city}
                  onChange={withBackToFulfillmentDetails(handleChange)}
                  onBlur={handleBlur}
                  error={
                    (touched as FormikTouched<ShipValues>).attributes?.city &&
                    (errors as FormikErrors<ShipValues>).attributes?.city
                  }
                  data-testid="AddressForm_city"
                />
              </Column>
              <Column span={6}>
                <Input
                  tabIndex={tabbableIf("new_address")}
                  name="attributes.region"
                  placeholder={
                    values.attributes.country === "US"
                      ? "State"
                      : "State, province, or region"
                  }
                  title={
                    values.attributes.country === "US"
                      ? "State"
                      : "State, province, or region"
                  }
                  autoCorrect="off"
                  value={values.attributes.region}
                  onChange={withBackToFulfillmentDetails(handleChange)}
                  onBlur={handleBlur}
                  error={
                    (touched as FormikTouched<ShipValues>).attributes?.region &&
                    (errors as FormikErrors<ShipValues>).attributes?.region
                  }
                  data-testid="AddressForm_region"
                />
              </Column>
              <Column span={6} data-testid="AddressForm_region_area">
                <Input
                  tabIndex={tabbableIf("new_address")}
                  name="attributes.postalCode"
                  placeholder={
                    values.attributes.country === "US"
                      ? "ZIP code"
                      : "ZIP/Postal code"
                  }
                  title={
                    values.attributes.country === "US"
                      ? "ZIP code"
                      : "Postal code"
                  }
                  autoCapitalize="characters"
                  autoCorrect="off"
                  value={values.attributes.postalCode}
                  onChange={withBackToFulfillmentDetails(handleChange)}
                  onBlur={handleBlur}
                  error={
                    (touched as FormikTouched<ShipValues>).attributes
                      ?.postalCode &&
                    (errors as FormikErrors<ShipValues>).attributes?.postalCode
                  }
                  data-testid="AddressForm_postalCode"
                />
              </Column>

              {
                <>
                  <Column span={12}>
                    <Input
                      tabIndex={tabbableIf("new_address")}
                      name="attributes.phoneNumber"
                      title="Phone number"
                      type="tel"
                      description={"Required for shipping logistics"}
                      placeholder="Add phone number including country code"
                      pattern="[^a-z]+"
                      value={values.attributes.phoneNumber}
                      onChange={withBackToFulfillmentDetails(handleChange)}
                      onBlur={handleBlur}
                      error={
                        touched.attributes?.phoneNumber &&
                        errors.attributes?.phoneNumber
                      }
                      data-testid="AddressForm_shipPhoneNumber"
                    />
                  </Column>
                </>
              }
            </GridColumns>
            <Spacer y={2} />

            <Checkbox
              data-testid="FulfillmentDetailsForm_saveAddress"
              tabIndex={tabbableIf("new_address")}
              onSelect={selected => {
                setFieldValue("meta.saveAddress", selected)
              }}
              selected={values.meta?.saveAddress}
            >
              Save shipping address for later use
            </Checkbox>
            <Spacer y={4} />
          </Collapse>
        </>
      )}
      <Collapse
        data-testid="phoneNumberCollapse"
        open={values.fulfillmentType === FulfillmentType.PICKUP}
      >
        {values.fulfillmentType === FulfillmentType.PICKUP && (
          <>
            <Input
              tabIndex={tabbableIf("pickup")}
              name="attributes.phoneNumber"
              title="Phone number"
              type="tel"
              placeholder="Add phone number including country code"
              pattern="[^a-z]+"
              value={values.attributes.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.attributes?.phoneNumber &&
                errors.attributes?.phoneNumber
              }
              data-testid="AddressForm_pickupPhoneNumber"
              required
            />
            <Spacer y={4} />
          </>
        )}
      </Collapse>
    </Form>
  )
}

// pass into fulfillment details
const ArtaMissingShippingQuoteMessage = () => {
  return (
    <Text
      py={1}
      px={2}
      mb={2}
      bg="red10"
      color="red100"
      data-testid="artaErrorMessage"
    >
      In order to provide a shipping quote, we need some more information from
      you. Please contact{" "}
      <RouterLink color="red100" to="mailto:orders@artsy.net">
        orders@artsy.net
      </RouterLink>{" "}
      so we can assist you.
    </Text>
  )
}

const VALIDATION_SCHEMA = Yup.object().shape({
  fulfillmentType: Yup.string().oneOf([
    FulfillmentType.PICKUP,
    FulfillmentType.SHIP,
  ]),

  attributes: Yup.object().when("fulfillmentType", {
    is: FulfillmentType.SHIP,
    then: schema => schema.shape(ADDRESS_VALIDATION_SHAPE),
    otherwise: schema => schema.shape(BASIC_PHONE_VALIDATION_SHAPE),
  }),
})
