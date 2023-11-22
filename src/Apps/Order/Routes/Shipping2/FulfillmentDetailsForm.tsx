import * as Yup from "yup"
import {
  usePrevious,
  RadioGroup,
  BorderedRadio,
  Spacer,
  GridColumns,
  Column,
  Input,
  Checkbox,
  Text,
} from "@artsy/palette"
import {
  AddressVerifiedBy,
  AddressVerificationFlowQueryRenderer,
} from "Apps/Order/Components/AddressVerificationFlow"
import {
  FulfillmentValues,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { SavedAddressesFragmentContainer } from "Apps/Order/Routes/Shipping2/SavedAddresses2"
import {
  FulfillmentType,
  ShippingAddressFormValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { CountrySelect } from "Components/CountrySelect"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import {
  useFormikContext,
  Form,
  FormikTouched,
  FormikErrors,
  Formik,
} from "formik"
import { compact, pick } from "lodash"
import { useEffect, useCallback, useState } from "react"
import { ADDRESS_VALIDATION_SHAPE } from "Apps/Order/Utils/shippingUtils"
import { Collapse } from "Apps/Order/Components/Collapse"
import { FulfillmentDetailsForm_me$data } from "__generated__/FulfillmentDetailsForm_me.graphql"
import {
  AddressAutocompleteInput,
  useAddressAutocompleteTracking,
} from "Components/Address/AddressAutocompleteInput"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"

export interface FulfillmentDetailsFormProps {
  // TODO: ideally we don't need to thread shipping2_me through here but that requires
  // adding savedAdderesses to the context.
  me: FulfillmentDetailsForm_me$data
  initialValues: FulfillmentValues
  verifyAddressNow: boolean
  onAddressVerificationComplete: () => void
  onSubmit: (values: FulfillmentValues, helpers: any) => void
  availableFulfillmentTypes: FulfillmentType[]
}

export const FulfillmentDetailsForm = (props: FulfillmentDetailsFormProps) => {
  return (
    <Formik<FulfillmentValues>
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={VALIDATION_SCHEMA}
    >
      <FulfillmentDetailsFormLayout
        me={props.me}
        verifyAddressNow={props.verifyAddressNow}
        onAddressVerificationComplete={props.onAddressVerificationComplete}
        availableFulfillmentTypes={props.availableFulfillmentTypes}
      />
    </Formik>
  )
}

type AddressFormMode = "saved_addresses" | "new_address" | "pickup"

const FulfillmentDetailsFormLayout = (
  props: Pick<
    FulfillmentDetailsFormProps,
    | "verifyAddressNow"
    | "onAddressVerificationComplete"
    | "me"
    | "availableFulfillmentTypes"
  >
) => {
  const { contextPageOwnerId } = useAnalyticsContext()
  const autocompleteTracking = useAddressAutocompleteTracking({
    contextModule: ContextModule.ordersShipping,
    contextOwnerType: OwnerType.ordersShipping,
    contextPageOwnerId: contextPageOwnerId || "",
  })

  const shippingContext = useShippingContext()
  const active = shippingContext.step === "fulfillment_details"

  const renderMissingShippingQuotesError = !!(
    shippingContext.parsedOrderData.isArtsyShipping &&
    shippingContext.parsedOrderData.shippingQuotes &&
    shippingContext.parsedOrderData.shippingQuotes.length === 0
  )

  const [hasAutocompletedAddress, setHasAutocompletedAddress] = useState(false)

  const savedAddresses = compact(
    extractNodes(props.me?.addressConnection) ?? []
  )

  const formikContext = useFormikContext<FulfillmentValues>()
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
    isValid,
  } = formikContext

  // Pass some key formik bits up to the shipping route
  useEffect(() => {
    if (active) {
      shippingContext.helpers.fulfillmentDetails.setFulfillmentFormHelpers({
        handleSubmit: handleSubmit,
        isValid: isValid,
        values: values,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, handleSubmit, isValid, values])

  const trackAutoCompleteEdits = useCallback(
    (fieldName: string, handleChange) => (...args) => {
      if (hasAutocompletedAddress) {
        autocompleteTracking.editedAutocompletedAddress(fieldName)
        setHasAutocompletedAddress(false)
      }
      handleChange(...args)
    },
    [autocompleteTracking, hasAutocompletedAddress]
  )

  const handleCloseVerification = async () => {
    await setFieldValue("attributes.addressVerifiedBy", AddressVerifiedBy.USER)
    await props.onAddressVerificationComplete()
  }

  const handleChooseAddress = async (verifiedBy, chosenAddress) => {
    const newValues = {
      ...values,
      attributes: {
        ...values.attributes,
        ...chosenAddress,
        addressVerifiedBy: verifiedBy,
      },
    }
    await setValues(newValues)
    await props.onAddressVerificationComplete()
    formikContext.submitForm()
  }

  const addressFormMode: AddressFormMode =
    values.fulfillmentType === FulfillmentType.PICKUP
      ? "pickup"
      : savedAddresses.length > 0
      ? "saved_addresses"
      : "new_address"

  // Reset form when switching between ship/pickup
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const previousFulfillmentType = usePrevious(values.fulfillmentType)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (
      values.fulfillmentType === FulfillmentType.PICKUP &&
      previousFulfillmentType !== FulfillmentType.PICKUP
    ) {
      setValues({
        fulfillmentType: FulfillmentType.PICKUP,
        attributes: {
          name: "",
          phoneNumber: "",
        },
      })
      return
    }
  }, [setValues, previousFulfillmentType, values.fulfillmentType])

  // When not showing the form/creating a new address,
  // inputs should not be tabbable
  const tabbableFormValue = (activeForm: typeof addressFormMode): 0 | -1 =>
    addressFormMode === activeForm ? 0 : -1

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSelectSavedAddress = useCallback(
    (address: ShippingAddressFormValues) => {
      setValues({
        fulfillmentType: FulfillmentType.SHIP,
        attributes: {
          ...address,
          saveAddress: false,
          addressVerifiedBy: null,
        },
      })
    },
    [setValues]
  )

  return (
    <Form data-testid="FulfillmentDetails_form">
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
          onChosenAddress={handleChooseAddress}
        />
      )}
      {props.availableFulfillmentTypes.length > 1 && (
        <>
          <RadioGroup
            data-testid="shipping-options"
            onSelect={value => {
              setFieldValue("fulfillmentType", value)
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
            open={savedAddresses.length > 0}
          >
            <SavedAddressesFragmentContainer
              active={addressFormMode === "saved_addresses"}
              me={props.me}
              onSelect={a => {
                handleSelectSavedAddress(a)
              }}
            />
          </Collapse>
          {/* NEW ADDRESS */}
          <Collapse
            data-testid="addressFormCollapse"
            open={
              addressFormMode === "new_address" ||
              (shippingContext.parsedOrderData.fulfillmentType ===
                FulfillmentType.SHIP &&
                !shippingContext.parsedOrderData.selectedSavedAddressId)
            }
          >
            <GridColumns>
              <Column span={12}>
                <Input
                  tabIndex={tabbableFormValue("new_address")}
                  id="attributes.name"
                  placeholder="Full name"
                  title={"Full name"}
                  autoCorrect="off"
                  value={values.attributes.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.attributes?.name && errors.attributes?.name}
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
                  tabIndex={tabbableFormValue("new_address")}
                  selected={values.attributes.country}
                  onSelect={trackAutoCompleteEdits("country", selected => {
                    setFieldValue(`attributes.country`, selected)
                  })}
                  disabled={
                    !!shippingContext.parsedOrderData.lockShippingCountryTo &&
                    shippingContext.parsedOrderData.lockShippingCountryTo !==
                      "EU"
                  }
                  euShippingOnly={
                    shippingContext.parsedOrderData.lockShippingCountryTo ===
                    "EU"
                  }
                  data-testid="AddressForm_country"
                />
                {shippingContext.parsedOrderData.lockShippingCountryTo && (
                  <>
                    <Spacer x={0.5} y={0.5} />
                    <Text variant="xs" color="black60">
                      {shippingContext.parsedOrderData.lockShippingCountryTo ===
                      "EU"
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
                  disableAutocomplete={values.attributes.region === "AK"}
                  tabIndex={tabbableFormValue("new_address")}
                  name="attributes.addressLine1"
                  placeholder="Street address"
                  title="Address line 1"
                  value={values.attributes.addressLine1}
                  onChange={trackAutoCompleteEdits(
                    "addressLine1",
                    handleChange
                  )}
                  onBlur={handleBlur}
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
                    setHasAutocompletedAddress(true)

                    autocompleteTracking.selectedAutocompletedAddress(
                      option,
                      values.attributes.addressLine1
                    )
                  }}
                  onReceiveAutocompleteResult={(input, count) => {
                    autocompleteTracking.receivedAutocompleteResult(
                      input,
                      count
                    )
                  }}
                  error={
                    (touched as FormikTouched<ShipValues>).attributes
                      ?.addressLine1 &&
                    (errors as FormikErrors<ShipValues>).attributes
                      ?.addressLine1
                  }
                  data-testid="AddressForm_addressLine1"
                  onClear={function (): void {
                    throw new Error("Function not implemented.")
                  }}
                />
              </Column>
              <Column span={12}>
                <Input
                  tabIndex={tabbableFormValue("new_address")}
                  name="attributes.addressLine2"
                  placeholder="Apt, floor, suite, etc."
                  title="Address line 2 (optional)"
                  value={values.attributes.addressLine2}
                  onChange={trackAutoCompleteEdits(
                    "addressLine2",
                    handleChange
                  )}
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
                  tabIndex={tabbableFormValue("new_address")}
                  name="attributes.city"
                  placeholder="City"
                  title="City"
                  value={values.attributes.city}
                  onChange={trackAutoCompleteEdits("city", handleChange)}
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
                  tabIndex={tabbableFormValue("new_address")}
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
                  onChange={trackAutoCompleteEdits("region", handleChange)}
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
                  tabIndex={tabbableFormValue("new_address")}
                  name="attributes.postalCode"
                  placeholder={
                    values.attributes.country === "US"
                      ? "ZIP code"
                      : "ZIP/postal code"
                  }
                  title={
                    values.attributes.country === "US"
                      ? "ZIP code"
                      : "Postal code"
                  }
                  autoCapitalize="characters"
                  autoCorrect="off"
                  value={values.attributes.postalCode}
                  onChange={trackAutoCompleteEdits("postalCode", handleChange)}
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
                      tabIndex={tabbableFormValue("new_address")}
                      name="attributes.phoneNumber"
                      title="Phone number"
                      type="tel"
                      description={"Required for shipping logistics"}
                      placeholder="Add phone number including country code"
                      pattern="[^a-z]+"
                      value={values.attributes.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
              tabIndex={tabbableFormValue("new_address")}
              onSelect={selected => {
                setFieldValue("attributes.saveAddress", selected)
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
              tabIndex={tabbableFormValue("pickup")}
              id="attributes.name"
              placeholder="Full name"
              title={"Full name"}
              autoCorrect="off"
              value={values.attributes.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.attributes?.name && errors.attributes?.name}
              data-testid="AddressForm_name"
            />
            <Input
              tabIndex={tabbableFormValue("pickup")}
              name="attributes.phoneNumber"
              title="Phone number"
              type="tel"
              description={"Required for pickup logistics"}
              placeholder="Add phone number including country code"
              pattern="[^a-z]+"
              value={values.attributes.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
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
      data-test="artaErrorMessage"
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

  attributes: Yup.object()
    .shape({
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^[+\-\d]+$/, "Phone number is required"),
      name: Yup.string().required("Full name is required"),
    })
    .when("fulfillmentType", {
      is: FulfillmentType.SHIP,
      then: schema => schema.shape(ADDRESS_VALIDATION_SHAPE),
    }),
})
