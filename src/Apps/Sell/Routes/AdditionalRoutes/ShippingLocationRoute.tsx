import { Column, GridColumns, Input, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { CountrySelect } from "Components/CountrySelect"
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
    locationAddress
    locationAddress2
    locationPostalCode
    locationState
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
          name
          phoneNumber
          phoneNumberCountryCode
          postalCode
          region
        }
      }
    }
  }
`

const Schema = Yup.object().shape({
  location: Yup.object().shape({
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    address2: Yup.string(),
    city: Yup.string().required("City is required"),
    // region: Yup.string().required("Region is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  }),
})

interface FormValues {
  location: {
    country: string
    address: string
    address2: string
    city: string
    postalCode: string
    state: string
    stateCode: string
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

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission({
      locationCity: values.location.city,
      locationCountry: values.location.country,
      locationCountryCode: values.location.stateCode,
      locationPostalCode: values.location.postalCode,
      locationAddress: values.location.address,
      locationAddress2: values.location.address2,
      locationState: values.location.state,
    })
  }

  // Initializing the form with the last user address in the list
  const userAddress = last(extractNodes(me?.addressConnection) || [])

  // Check if the submission has an address; if not, use the user's address.
  const initialValues: FormValues = !!submission.locationCity
    ? {
        location: {
          country: submission.locationCountry ?? "",
          address: "",
          address2: "",
          city: submission.locationCity ?? "",
          postalCode: submission.locationPostalCode ?? "",
          state: submission.locationState ?? "",
          stateCode: submission.locationPostalCode ?? "",
        },
      }
    : {
        location: {
          country: userAddress?.country ?? "",
          address: userAddress?.addressLine1 ?? "",
          address2: userAddress?.addressLine2 ?? "",
          city: userAddress?.city ?? "",
          postalCode: userAddress?.postalCode ?? "",
          state: userAddress?.region ?? "",
          stateCode: userAddress?.region ?? "",
        },
      }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ errors, handleChange, handleBlur, touched, values }) => (
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
                  name="location.country"
                  value={values.location.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.location?.country && errors.location?.country}
                  required
                />
              </Column>

              {!!values.location.country && (
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
                      error={
                        touched.location?.address && errors.location?.address
                      }
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
                      error={
                        touched.location?.address2 && errors.location?.address2
                      }
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
                      error={touched.location?.city && errors.location?.city}
                      required
                    />
                  </Column>

                  <Column span={6}>
                    <Input
                      name="location.postalCode"
                      title="Postal Code"
                      placeholder="Add postal code"
                      autoComplete="postal-code"
                      value={values.location.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.location?.postalCode &&
                        errors.location?.postalCode
                      }
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
                      error={touched.location?.state && errors.location?.state}
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
