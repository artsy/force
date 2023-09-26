import {
  AutocompleteInput,
  BorderedRadio,
  Checkbox,
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
  AddressAutocompleteSuggestion,
  useAddressAutocomplete,
} from "Components/Address/useAddressAutocomplete"
import { postalCodeValidator } from "Components/Address/utils"
import { CountrySelect } from "Components/CountrySelect"
import {
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikTouched,
  useFormikContext,
} from "formik"
import { compact } from "lodash"
import { FC, useCallback, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import * as Yup from "yup"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/useFeatureFlag"
import { SavedAddressesFragmentContainer as SavedAddresses } from "Apps/Order/Routes/Shipping2/SavedAddresses2"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Collapse } from "Apps/Order/Components/Collapse"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/ShippingContext"
import {
  FulfillmentType,
  ShippingAddressFormValues,
} from "Apps/Order/Routes/Shipping2/shippingUtils"
import { RouterLink } from "System/Router/RouterLink"

export const ADDRESS_VALIDATION_SHAPE = {
  addressLine1: Yup.string().required("Street address is required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("City is required"),
  postalCode: postalCodeValidator,
  region: Yup.string().required("State, province or region is required"),
  country: Yup.string().required("Country is required"),
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

interface PickupValues {
  fulfillmentType: FulfillmentType.PICKUP
  attributes: {
    name: string
    phoneNumber: string
  }
}

export interface ShipValues {
  fulfillmentType: FulfillmentType.SHIP
  attributes: ShippingAddressFormValues & {
    saveAddress: boolean
    addressVerifiedBy: AddressVerifiedBy | null
  }
}

export type FulfillmentValues = ShipValues | PickupValues

export interface FulfillmentDetailsFormProps {
  active: boolean
  onSubmit: (
    values: FulfillmentValues,
    formikHelpers: FormikHelpers<FulfillmentValues>
  ) => void | Promise<any>
  setFulfillmentFormHelpers: React.Dispatch<
    React.SetStateAction<
      Pick<
        FormikProps<FulfillmentValues>,
        "handleSubmit" | "isValid" | "values"
      >
    >
  >
  initialFulfillmentValues: FulfillmentValues
  me: FulfillmentDetailsForm_me$data
  order: FulfillmentDetailsForm_order$data
  renderMissingShippingQuotesError: boolean
}

type AddressFormMode = "saved_addresses" | "new_address" | "pickup"

export const FulfillmentDetails: FC<FulfillmentDetailsFormProps> = ({
  active,
  initialFulfillmentValues,
  ...props
}) => {
  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  // const _addressVerificationIntlEnabled = !!useFeatureFlag(
  //   "address_verification_intl"
  // )

  const shouldVerifyAddressOnSubmit = (values: FulfillmentValues) => {
    return (
      values.fulfillmentType === FulfillmentType.SHIP &&
      values.attributes.country === "US" &&
      addressVerificationUSEnabled
    )
    // && addressFormMode === "new_address"
  }

  // trigger address verification by setting this to true
  const [verifyAddressNow, setVerifyAddressNow] = useState<boolean>(false)

  const handleSubmit = (values, helpers) => {
    if (shouldVerifyAddressOnSubmit(values)) {
      setVerifyAddressNow(true)
      helpers.setSubmitting(false)
      return
    } else {
      return props.onSubmit(values, helpers)
    }
  }

  return (
    <Formik<FulfillmentValues>
      initialValues={initialFulfillmentValues}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <FulfillmentDetailsFormLayout
        onSubmit={props.onSubmit}
        renderMissingShippingQuotesError={
          props.renderMissingShippingQuotesError
        }
        order={props.order}
        me={props.me}
        setFulfillmentFormHelpers={props.setFulfillmentFormHelpers}
        active={active}
        verifyAddressNow={verifyAddressNow}
        addressVerificationComplete={() => setVerifyAddressNow(false)}
      />
    </Formik>
  )
}

export const FulfillmentDetailsFragmentContainer = createFragmentContainer(
  FulfillmentDetails,
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
        ...SavedAddresses2_me
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

interface LayoutProps
  extends Pick<
    FulfillmentDetailsFormProps,
    | "order"
    | "me"
    | "setFulfillmentFormHelpers"
    | "onSubmit"
    | "active"
    | "renderMissingShippingQuotesError"
  > {
  verifyAddressNow: boolean
  addressVerificationComplete: () => void
}

const FulfillmentDetailsFormLayout = (props: LayoutProps) => {
  const { active } = props
  const firstArtwork = extractNodes(props.order.lineItems)[0]!.artwork!

  const savedAddresses = compact(
    extractNodes(props.me?.addressConnection) ?? []
  )
  const { lockShippingCountryTo } = useShippingContext()

  const availableFulfillmentTypes: FulfillmentType[] = firstArtwork.pickupAvailable
    ? [FulfillmentType.PICKUP, FulfillmentType.SHIP]
    : [FulfillmentType.SHIP]

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
      props.setFulfillmentFormHelpers({
        handleSubmit: handleSubmit,
        isValid: isValid,
        values: values,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, handleSubmit, isValid, values])

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
      console.log("handleSelectSavedAddress")
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

  const {
    autocompleteOptions,
    fetchForAutocomplete,
    fetchSecondarySuggestions,
    ...autocomplete
    // TODO: consider extraction into a component (everything after formikProps => )
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useAddressAutocomplete(values.attributes as ShipValues["attributes"])

  return (
    <Form data-testid="FulfillmentDetails_form">
      {availableFulfillmentTypes.length > 1 && (
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
          </Text>
          {/* SAVED ADDRESSES */}
          <Collapse
            data-testid="savedAddressesCollapse"
            open={addressFormMode === "saved_addresses"}
          >
            {props.renderMissingShippingQuotesError && (
              <ArtaMissingShippingQuoteMessage />
            )}
            <SavedAddresses
              active={addressFormMode === "saved_addresses"}
              me={props.me}
              onSelect={a => {
                console.log("SavedAddresses onSelect")
                handleSelectSavedAddress(a)
              }}
            />
          </Collapse>
          {/* NEW ADDRESS */}
          <Collapse
            data-testid="addressFormCollapse"
            open={addressFormMode === "new_address"}
          >
            {props.renderMissingShippingQuotesError && (
              <ArtaMissingShippingQuoteMessage />
            )}
            {props.verifyAddressNow && (
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
                  setFieldValue(
                    "attributes.addressVerifiedBy",
                    AddressVerifiedBy.USER
                  )
                  props.addressVerificationComplete()
                }}
                onChosenAddress={(verifiedBy, chosenAddress) => {
                  setValues({
                    ...values,
                    attributes: {
                      ...values.attributes,
                      ...chosenAddress,
                      addressVerifiedBy: verifiedBy,
                    },
                  })
                  props.addressVerificationComplete()
                }}
              />
            )}

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
                  onSelect={selected =>
                    setFieldValue(`attributes.country`, selected)
                  }
                  disabled={
                    !!lockShippingCountryTo && lockShippingCountryTo !== "EU"
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
                    tabIndex={tabbableFormValue("new_address")}
                    disabled={!autocomplete.loaded}
                    name="attributes.addressLine1"
                    placeholder="Street address"
                    title="Address line 1"
                    value={values.attributes.addressLine1}
                    onChange={e => {
                      autocomplete.enabled &&
                        fetchForAutocomplete({ search: e.target.value })
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    options={autocompleteOptions}
                    onSelect={option => {
                      Object.entries(option.address).forEach(([key, value]) => {
                        setFieldValue(`attributes.${key}`, value)
                      })
                      // TODO: Update w latest autocomplete code
                      // setSelectedAddressOption({
                      //   option: option.value,
                      //   edited: false,
                      // })
                      // const event: SelectedItemFromAddressAutoCompletion = {
                      //   action:
                      //     ActionType.selectedItemFromAddressAutoCompletion,
                      //   context_module: ContextModule.ordersShipping,
                      //   context_owner_type: OwnerType.ordersShipping,
                      //   context_owner_id: contextPageOwnerId,
                      //   input: values.attributes.addressLine1,
                      //   item: option.value,
                      // }

                      // trackEvent(event)
                    }}
                    error={
                      (touched as FormikTouched<ShipValues>).attributes
                        ?.addressLine1 &&
                      (errors as FormikErrors<ShipValues>).attributes
                        ?.addressLine1
                    }
                    data-testid="AddressForm_addressLine1"
                  />
                ) : (
                  <Input
                    tabIndex={tabbableFormValue("new_address")}
                    name="attributes.addressLine1"
                    placeholder="Street address"
                    title="Address line 1"
                    value={values.attributes.addressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  tabIndex={tabbableFormValue("new_address")}
                  name="attributes.addressLine2"
                  placeholder="Apt, floor, suite, etc."
                  title="Address line 2 (optional)"
                  value={values.attributes.addressLine2}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  placeholder="State, province, or region"
                  title="State, province, or region"
                  autoCorrect="off"
                  value={values.attributes.region}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched as FormikTouched<ShipValues>).attributes?.region &&
                    (errors as FormikErrors<ShipValues>).attributes?.region
                  }
                  data-testid="AddressForm_region"
                />
              </Column>
              <Column span={6}>
                <Input
                  tabIndex={tabbableFormValue("new_address")}
                  name="attributes.postalCode"
                  placeholder="ZIP/postal code"
                  title="Postal code"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  value={values.attributes.postalCode}
                  onChange={handleChange}
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
