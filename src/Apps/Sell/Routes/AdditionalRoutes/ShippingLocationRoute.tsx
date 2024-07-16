import { Column, GridColumns, Input, Join, Spacer, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { CountrySelect } from "Components/CountrySelect"
import { ShippingLocationRoute_submission$key } from "__generated__/ShippingLocationRoute_submission.graphql"
import { Form, Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment ShippingLocationRoute_submission on ConsignmentSubmission {
    locationCity
    locationCountry
    # locationAddressLine1
    # locationAddressLine2
    locationPostalCode
    locationState
  }
`

const Schema = Yup.object().shape({
  location: Yup.object().shape({
    country: Yup.string().required("Country is required"),
    addressLine1: Yup.string().required("Address is required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("City is required"),
    // region: Yup.string().required("Region is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  }),
})

interface FormValues {
  location: {
    country: string
    addressLine1: string
    addressLine2: string
    city: string
    postalCode: string
    state: string
    stateCode: string
  }
}

interface ShippingLocationRouteProps {
  submission: ShippingLocationRoute_submission$key
}

export const ShippingLocationRoute: React.FC<ShippingLocationRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const { actions } = useSellFlowContext()

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission({
      locationCity: values.location.city,
      locationCountry: values.location.country,
      locationCountryCode: values.location.stateCode,
      locationPostalCode: values.location.postalCode,
      // TODO: Add backend support
      // locationAddressLine1: values.location.addressLine1,
      // locationAddressLine2: values.location.addressLine2,
      locationState: values.location.state,
    })
  }

  const initialValues: FormValues = {
    location: {
      country: submission.locationCountry ?? "",
      addressLine1: "",
      addressLine2: "",
      city: submission.locationCity ?? "",
      postalCode: submission.locationPostalCode ?? "",
      state: submission.locationState ?? "",
      stateCode: submission.locationPostalCode ?? "",
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

          <Join separator={<Spacer y={2} />}>
            <Text color="black60">
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
                    error={
                      touched.location?.country && errors.location?.country
                    }
                    required
                  />
                </Column>

                {!!values.location.country && (
                  <>
                    <Column span={12}>
                      <Input
                        name="location.addressLine1"
                        title="Address Line 1"
                        placeholder="Add address"
                        autoComplete="address-line1"
                        value={values.location.addressLine1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.location?.addressLine1 &&
                          errors.location?.addressLine1
                        }
                        required
                      />
                    </Column>

                    <Column span={12}>
                      <Input
                        name="location.addressLine2"
                        title="Address Line 2"
                        placeholder="Add address line 2"
                        autoComplete="address-line2"
                        value={values.location.addressLine2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.location?.addressLine2 &&
                          errors.location?.addressLine2
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
                        error={
                          touched.location?.state && errors.location?.state
                        }
                        required
                      />
                    </Column>
                  </>
                )}
              </GridColumns>
            </Form>
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
