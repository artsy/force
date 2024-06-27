import {
  Column,
  GridColumns,
  Input,
  Join,
  Select,
  Spacer,
} from "@artsy/palette"
import { acceptableCategoriesForSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/acceptableCategoriesForSubmission"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useFocusInput } from "Apps/Sell/Hooks/useFocusInput"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { DetailsRoute_submission$key } from "__generated__/DetailsRoute_submission.graphql"
import { ConsignmentSubmissionCategoryAggregation } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

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

  const focusedInputRef = useFocusInput()

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, values }) => (
        <SubmissionLayout>
          <SubmissionStepTitle>Artwork details</SubmissionStepTitle>

          <Join separator={<Spacer y={4} />}>
            <GridColumns>
              <Column span={[6, 4]}>
                <Input
                  onChange={handleChange}
                  name="year"
                  title="Year"
                  defaultValue={values.year || ""}
                  ref={focusedInputRef}
                  data-testid="year-input"
                />
              </Column>
            </GridColumns>

            <Select
              title="Medium"
              name="category"
              options={acceptableCategoriesForSubmission()}
              selected={values.category}
              onChange={handleChange}
              required
              data-testid="category-input"
            />

            <Input
              onChange={handleChange}
              name="medium"
              title="Materials"
              defaultValue={values.medium || ""}
              data-testid="medium-input"
            />
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
