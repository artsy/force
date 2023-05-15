import * as Yup from "yup"
import { Column, GridColumns, Input, Message } from "@artsy/palette"
import { Formik, Form } from "formik"
import { FC } from "react"
import {
  CountrySelect,
  ALL_COUNTRY_SELECT_OPTIONS,
} from "Components/CountrySelect"
import { useAddAddress } from "Apps/Settings/Routes/Shipping/useAddAddress"

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

const getDefaultCountry = (userCountry: string): string => {
  const countryCode = ALL_COUNTRY_SELECT_OPTIONS.find(
    country => country.text === userCountry
  )?.value
  return countryCode || "US"
}

export const CheckoutAddress: FC<{ userCountry: string }> = ({
  userCountry,
}) => {
  const { submitMutation: submitAddAddress } = useAddAddress()
  const userDefaultCountry = getDefaultCountry(userCountry)

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
      onSubmit={async ({ attributes }, { setStatus, resetForm }) => {
        try {
          await submitAddAddress({
            variables: { input: { attributes } },
          })
          resetForm()
        } catch (err) {
          console.error(err)
          const error = Array.isArray(err) ? err[0] : err
          setStatus({ error: true, message: error.message })
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid,
        isSubmitting,
        submitForm,
      }) => {
        // if (!values.attributes.country) {
        //   console.log({ XXXX: values })
        //   setFieldValue("country", userDefaultCountry)
        // }

        return (
          <Form>
            <GridColumns>
              <Column span={12}>
                <Input
                  name="attributes.name"
                  title="Add full name"
                  placeholder="Enter name"
                  autoComplete="name"
                  autoFocus
                  value={values.attributes.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.attributes?.name && errors.attributes?.name}
                  required
                />
              </Column>

              <Column span={12}>
                <CountrySelect
                  title="Country"
                  name="attributes.country"
                  value={values.attributes.country}
                  onChange={handleChange}
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
                  title="Address line 1"
                  placeholder="Add street address"
                  autoComplete="address-line1"
                  value={values.attributes.addressLine1}
                  onChange={handleChange}
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
                  title="Address line 2 (optional)"
                  placeholder="Add apt, floor, suite, etc."
                  autoComplete="address-line2"
                  value={values.attributes.addressLine2}
                  onChange={handleChange}
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
                  title="Postal Code"
                  placeholder="Add postal code"
                  autoComplete="postal-code"
                  value={values.attributes.postalCode}
                  onChange={handleChange}
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
                  title="City"
                  placeholder="Add city"
                  autoComplete="address-level2"
                  value={values.attributes.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.attributes?.city && errors.attributes?.city}
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.region"
                  title="State, Province, or Region"
                  placeholder="Add state, province, or region"
                  autoComplete="address-level1"
                  value={values.attributes.region}
                  onChange={handleChange}
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
            </GridColumns>
          </Form>
        )
      }}
    </Formik>
  )
}
