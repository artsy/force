import * as React from "react"
import * as Yup from "yup"
import { DetailsRoute_submission$key } from "__generated__/DetailsRoute_submission.graphql"
import { Input, Join, Select, Spacer, Text } from "@artsy/palette"
import { acceptableCategoriesForSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/acceptableCategoriesForSubmission"
import { graphql, useFragment } from "react-relay"
import { Formik } from "formik"
import { ConsignmentSubmissionCategoryAggregation } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"

const FRAGMENT = graphql`
  fragment DetailsRoute_submission on ConsignmentSubmission {
    year
    category
    medium
  }
`

const Schema = Yup.object().shape({
  year: Yup.string().trim(),
  category: Yup.string()
    .required("Please select a medium")
    .test("isDefault", "", category => category !== "default"),
  medium: Yup.string().trim(),
})

interface FormValues {
  year: string
  category: ConsignmentSubmissionCategoryAggregation
  medium: string
}

interface DetailsRouteProps {
  submission: DetailsRoute_submission$key
}

export const DetailsRoute: React.FC<DetailsRouteProps> = props => {
  const { actions } = useSellFlowContext()
  const submission = useFragment(FRAGMENT, props.submission)

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    year: submission.year ?? "",
    category:
      (submission.category?.toUpperCase() as ConsignmentSubmissionCategoryAggregation) ??
      "",
    medium: submission.medium ?? "",
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
            Artwork details
          </Text>
          <Join separator={<Spacer y={2} />}>
            <Input
              onChange={handleChange}
              name="year"
              title="Year"
              defaultValue={values.year || ""}
            ></Input>
            <Select
              title="Medium"
              name="category"
              options={acceptableCategoriesForSubmission()}
              defaultValue={values.category?.toUpperCase() ?? undefined}
              onChange={handleChange}
              required
            />
            <Input
              onChange={handleChange}
              name="medium"
              title="Materials"
              defaultValue={values.medium || ""}
            ></Input>
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
