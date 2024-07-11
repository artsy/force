import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { ConditionRoute_submission$key } from "__generated__/ConditionRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment ConditionRoute_submission on ConsignmentSubmission {
    title
    myCollectionArtwork {
      condition {
        value
      }
    }
    artist {
      ...EntityHeaderArtist_artist
    }
  }
`

const Schema = Yup.object().shape({
  title: Yup.string().required().trim(),
})

interface FormValues {
  title: string
}

interface ConditionRouteProps {
  submission: ConditionRoute_submission$key
}

export const ConditionRoute: React.FC<ConditionRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const { actions } = useSellFlowContext()
  // TODO: Add ref to first input
  // const focusedInputRef = useFocusInput()

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    title: submission.title ?? "",
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
          <SubmissionStepTitle>Condition</SubmissionStepTitle>

          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
