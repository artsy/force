import { Column, GridColumns, Input, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { COUNTRY_SELECT_OPTIONS, CountrySelect } from "Components/CountrySelect"
import { extractNodes } from "Utils/extractNodes"
import { ShippingLocationRoute_me$key } from "__generated__/ShippingLocationRoute_me.graphql"
import { ShippingLocationRoute_submission$key } from "__generated__/ShippingLocationRoute_submission.graphql"
import { Form, Formik } from "formik"
import { last } from "lodash"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const SUBMISSION_FRAGMENT = graphql`
  fragment ShippingLocationRoute_submission on ConsignmentSubmission {
    locationCity
    locationCountry
    locationCountryCode
    locationState
    locationPostalCode
    locationAddress
    locationAddress2
  }
`

const ME_FRAGMENT = graphql`
  fragment ShippingLocationRoute_me on Me {
    addressConnection {
      edges {
        node {
          addressLine1
          addressLine2
          city
          country
          isDefault
          postalCode
          region
        }
      }
    }
  }
`

const Schema = Yup.object().shape({
  location: Yup.object().shape({
    city: Yup.string().required("City is required.").trim(),
    state: Yup.string().required("State is required.").trim(),
    country: Yup.string().trim(),
    countryCode: Yup.string().required("Country is required.").trim(),
    zipCode: Yup.string().required("Postal code is required.").trim(),
    address: Yup.string().required("Address is required.").trim(),
    address2: Yup.string().trim(),
  }),
})

interface FormValues {
  location: {
    city?: string
    state?: string
    country?: string
    countryCode?: string
    zipCode?: string
    address?: string
    address2?: string
  }
}

interface ShippingLocationRouteProps {
  me: ShippingLocationRoute_me$key
  submission: ShippingLocationRoute_submission$key
}

export const ShippingLocationRoute: React.FC<ShippingLocationRouteProps> = props => {
  const { actions } = useSellFlowContext()

  const submission = useFragment(SUBMISSION_FRAGMENT, props.submission)
  const me = useFragment(ME_FRAGMENT, props.me)

  const userAddresses = extractNodes(me?.addressConnection)
  const defaultUserAddress =
    userAddresses.find(node => node.isDefault) || last(userAddresses || [])

  // Check whether the submission has an address; if not, use the user's address.
  const initialValues: FormValues = submission.locationCity
    ? {
        location: {
          country: submission.locationCountry ?? "",
          countryCode: submission.locationCountryCode ?? "",
          address: submission.locationAddress ?? "",
          address2: submission.locationAddress2 ?? "",
          city: submission.locationCity ?? "",
          zipCode: submission.locationPostalCode ?? "",
          state: submission.locationState ?? "",
        },
      }
    : {
        location: {
          countryCode: defaultUserAddress?.country ?? "",
          address: defaultUserAddress?.addressLine1 ?? "",
          address2: defaultUserAddress?.addressLine2 ?? "",
          city: defaultUserAddress?.city ?? "",
          zipCode: defaultUserAddress?.postalCode ?? "",
          state: defaultUserAddress?.region ?? "",
        },
      }

  const onSubmit = async (values: FormValues) => {
    // Looking up the country name from the country code
    const locationCountry = COUNTRY_SELECT_OPTIONS.find(
      option => option.value === values.location.countryCode
    )?.text

    return actions.updateSubmission({
      locationCity: values.location.city,
      locationCountry,
      locationCountryCode: values.location.countryCode,
      locationPostalCode: values.location.zipCode,
      locationAddress: values.location.address,
      locationAddress2: values.location.address2,
      locationState: values.location.state,
    })
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, handleBlur, values }) => (
        <SubmissionLayout>
          <SubmissionStepTitle>Shipping Location</SubmissionStepTitle>

          <Text color="black60" mb={2}>
            Location is where the artwork ships from. It’s required so we can
            estimate shipping costs and tax.
          </Text>

          <Form>
            <GridColumns>
              <Column span={12}>
                <CountrySelect
                  title="Country"
                  name="location.countryCode"
                  value={values.location.countryCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Column>

              {!!values.location.countryCode && (
                <>
                  <Column span={12}>
                    <Input
                      name="location.address"
                      title="Address Line 1"
                      placeholder="Add address"
                      autoComplete="address-line1"
                      value={values.location.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Column>

                  <Column span={12}>
                    <Input
                      name="location.address2"
                      title="Address Line 2"
                      placeholder="Add address line 2"
                      autoComplete="address-line2"
                      value={values.location.address2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      mb={1}
                    />
                  </Column>

                  <Column span={6}>
                    <Input
                      name="location.city"
                      title="City"
                      placeholder="Enter city"
                      autoComplete="address-level2"
                      value={values.location.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Column>

                  <Column span={6}>
                    <Input
                      name="location.zipCode"
                      title="Postal Code"
                      placeholder="Add postal code"
                      autoComplete="postal-code"
                      value={values.location.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Column>

                  <Column span={12}>
                    <Input
                      name="location.state"
                      title="State, Province, or Region"
                      placeholder="Add state, province, or region"
                      autoComplete="address-level1"
                      value={values.location.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Column>
                </>
              )}
            </GridColumns>
          </Form>

          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
