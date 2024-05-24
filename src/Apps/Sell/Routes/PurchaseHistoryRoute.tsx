import * as React from "react"
import * as Yup from "yup"

import { Input, Text } from "@artsy/palette"
import { PurchaseHistoryRoute_submission$key } from "__generated__/PurchaseHistoryRoute_submission.graphql"
import { graphql, useFragment } from "react-relay"
import { Formik, useFormikContext } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { BottomFormNavigation } from "Apps/Sell/Components/BottomFormNavigation"
import { useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"

const FRAGMENT = graphql`
  fragment PurchaseHistoryRoute_submission on ConsignmentSubmission {
    provenance
  }
`

const Schema = Yup.object().shape({
  provenance: Yup.string().trim(),
})

interface FormValues {
  provenance
}

const InnerForm: React.FC = props => {
  const { handleChange, values } = useFormikContext<FormValues>()

  return (
    <>
      <Input
        title="Purchase information"
        onChange={handleChange}
        name="provenance"
        defaultValue={values.provenance}
      />
    </>
  )
}

interface PurchaseHistoryRouteProps {
  submission: PurchaseHistoryRoute_submission$key
}

export const PurchaseHistoryRoute: React.FC<PurchaseHistoryRouteProps> = props => {
  const { actions } = useArtworkFormContext()
  const submission = useFragment(FRAGMENT, props.submission)

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    provenance: submission.provenance || "",
  }

  return (
    <>
      <Text mb={2} variant="xl">Purchase history</Text>
      <Text mb={2} variant="sm">
        The documented history of an artwork's ownership and
        authenticity. Please add any documentation you have that
        proves your artwork's provenance.
      </Text>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnMount
        validationSchema={Schema}
      >
        <>
          <InnerForm />
          <BottomFormNavigation />
          <DevDebug />
        </>
      </Formik>
    </>
  )
}
