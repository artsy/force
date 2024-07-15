import { Join, Spacer, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import {
  LocationAutocompleteInput,
  Place,
  buildLocationDisplay,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import { ShippingLocationRoute_submission$key } from "__generated__/ShippingLocationRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment ShippingLocationRoute_submission on ConsignmentSubmission {
    locationCity
    locationCountry
    locationPostalCode
    locationState
  }
`

const Schema = Yup.object().shape({
  location: Yup.object().shape({
    locationCity: Yup.string().trim(),
    locationState: Yup.string(),
    stateCode: Yup.string(),
    locationPostalCode: Yup.string(),
    locationCountry: Yup.string(),
  }),
})

interface FormValues {
  location: {
    city: string
    state: string
    stateCode: string
    country: string
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
      locationState: values.location.state,
    })
  }

  const initialValues: FormValues = {
    location: {
      city: submission.locationCity ?? "",
      state: submission.locationState ?? "",
      stateCode: submission.locationPostalCode ?? "",
      country: submission.locationCountry ?? "",
    },
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ errors, setFieldValue, setFieldTouched, touched, values }) => (
        <SubmissionLayout>
          <SubmissionStepTitle>Shipping Location</SubmissionStepTitle>

          <Join separator={<Spacer y={2} />}>
            <Text color="black60">
              Location is where the artwork ships from. It’s required so we can
              estimate shipping costs and tax.
            </Text>

            <LocationAutocompleteInput
              flex={1}
              name="location"
              title="City"
              placeholder="Enter city where artwork is located"
              maxLength={256}
              spellCheck={false}
              defaultValue={buildLocationDisplay(values.location)}
              error={touched.location && errors.location?.city}
              onClose={() => setFieldTouched("location")}
              onSelect={(place?: Place) => {
                setFieldValue("location", normalizePlace(place, true))
              }}
              onChange={() => {
                setFieldValue("postalCode", "")
                setFieldTouched("postalCode", false)

                setFieldValue("location", {})
                setFieldTouched("location", false)
              }}
              onClick={() => setFieldTouched("location", false)}
            />
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
