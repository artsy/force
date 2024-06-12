import * as React from "react"
import * as Yup from "yup"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { Formik } from "formik"
import { Input, Text } from "@artsy/palette"
import { PurchaseHistoryRoute_submission$key } from "__generated__/PurchaseHistoryRoute_submission.graphql"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { graphql, useFragment } from "react-relay"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"

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

interface PurchaseHistoryRouteProps {
  submission: PurchaseHistoryRoute_submission$key
}

export const PurchaseHistoryRoute: React.FC<PurchaseHistoryRouteProps> = props => {
  const { actions } = useSellFlowContext()
  const submission = useFragment(FRAGMENT, props.submission)

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    provenance: submission.provenance || "",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, values }) => (
        <SubmissionLayout>
          <Text mb={2} variant="xl">
            Purchase history
          </Text>
          <Text mb={2} variant="sm">
            The documented history of an artwork's ownership and authenticity.
            Please add any documentation you have that proves your artwork's
            provenance.
          </Text>
          <Input
            title="Purchase information"
            onChange={handleChange}
            name="provenance"
            defaultValue={values.provenance}
          />
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
