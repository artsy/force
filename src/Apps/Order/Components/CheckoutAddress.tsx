import * as Yup from "yup"
import { Button, Column, GridColumns, Input, Message } from "@artsy/palette"
import { Formik, Form } from "formik"
import { FC } from "react"
import {
  CountrySelect,
  ALL_COUNTRY_SELECT_OPTIONS,
} from "Components/CountrySelect"

export interface AddressFormValues {
  name: string
  country: string
  addressLine1: string
  city: string
  region: string
  postalCode: string
  addressLine2: string
}

export type AddressChangeHandler = (
  address: AddressFormValues,
  key: keyof AddressFormValues
) => void

export const INITIAL_ADDRESS = {
  name: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  region: "",
}

const INITIAL_VALUES = {
  attributes: INITIAL_ADDRESS,
}

const VALIDATION_SCHEMA = Yup.object().shape({
  attributes: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    addressLine1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  }),
})

export const CheckoutAddress: FC<{
  userCountry: string
  onChange: AddressChangeHandler
}> = ({ userCountry, onChange }) => {
  const userDefaultCountry = getCountryNameOrCode(userCountry, true)

  return (
    <Formik
      validateOnMount
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        attributes: {
          ...INITIAL_VALUES.attributes,
          country: userDefaultCountry,
        },
      }}
      onSubmit={({ attributes }) => console.log(attributes)}
    >
      {({ values, errors, touched, status, handleChange, handleBlur }) => {
        const changeEventHandler = (
          e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
          key: keyof AddressFormValues
        ) => {
          handleChange(e)
          onChange(
            {
              ...values.attributes,
              [key]: e.currentTarget.value,
            },
            key
          )
        }
        return (
          <Form>
            <GridColumns>
              <Column span={12}>
                <Input
                  name="attributes.name"
                  aria-label="address-name-input"
                  title="Add full name"
                  placeholder="Enter name"
                  autoComplete="name"
                  autoFocus
                  value={values.attributes.name}
                  onChange={e => changeEventHandler(e, "name")}
                  onBlur={handleBlur}
                  error={touched.attributes?.name && errors.attributes?.name}
                  required
                />
              </Column>

              <Column span={12}>
                <CountrySelect
                  title="Country"
                  aria-label="address-country-select"
                  name="attributes.country"
                  value={values.attributes.country}
                  onChange={e => changeEventHandler(e, "country")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.country && errors.attributes?.country
                  }
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.addressLine1"
                  aria-label="address-street-input"
                  title="Address line 1"
                  placeholder="Add street address"
                  autoComplete="address-line1"
                  value={values.attributes.addressLine1}
                  onChange={e => changeEventHandler(e, "addressLine1")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.addressLine1 &&
                    errors.attributes?.addressLine1
                  }
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.addressLine2"
                  aria-label="address-optional-second-line-input"
                  title="Address line 2 (optional)"
                  placeholder="Add apt, floor, suite, etc."
                  autoComplete="address-line2"
                  value={values.attributes.addressLine2}
                  onChange={e => changeEventHandler(e, "addressLine2")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.addressLine2 &&
                    errors.attributes?.addressLine2
                  }
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.postalCode"
                  aria-label="address-postal-code-input"
                  title="Postal Code"
                  placeholder="Add postal code"
                  autoComplete="postal-code"
                  value={values.attributes.postalCode}
                  onChange={e => changeEventHandler(e, "postalCode")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.postalCode &&
                    errors.attributes?.postalCode
                  }
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.city"
                  aria-label="address-city-input"
                  title="City"
                  placeholder="Add city"
                  autoComplete="address-level2"
                  value={values.attributes.city}
                  onChange={e => changeEventHandler(e, "city")}
                  onBlur={handleBlur}
                  error={touched.attributes?.city && errors.attributes?.city}
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.region"
                  aria-label="address-state-or-region-input"
                  title="State, Province, or Region"
                  placeholder="Add state, province, or region"
                  autoComplete="address-level1"
                  value={values.attributes.region}
                  onChange={e => changeEventHandler(e, "region")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.region && errors.attributes?.region
                  }
                  required
                />
              </Column>

              {status?.error && (
                <Column span={12}>
                  <Message variant="error">
                    {status.message ||
                      "Something went wrong. Please try again."}
                  </Message>
                </Column>
              )}
              <Column span={12}>
                <Button variant="primaryBlack" width="50%">
                  Save and Continue
                </Button>
              </Column>
            </GridColumns>
          </Form>
        )
      }}
    </Formik>
  )
}

// get country code or name by code or name
const getCountryNameOrCode = (userCountry: string, code: boolean): string => {
  if (code) {
    const countryCode = ALL_COUNTRY_SELECT_OPTIONS.find(
      country => country.text === userCountry
    )?.value
    return countryCode || "US"
  }

  const countryName = ALL_COUNTRY_SELECT_OPTIONS.find(
    country => country.value === userCountry
  )?.text
  return countryName || "United States"
}
