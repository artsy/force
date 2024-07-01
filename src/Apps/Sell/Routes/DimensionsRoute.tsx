import {
  Column,
  GridColumns,
  Join,
  LabeledInput,
  Radio,
  RadioGroup,
  Spacer,
} from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useFocusInput } from "Apps/Sell/Hooks/useFocusInput"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { DimensionsRoute_submission$key } from "__generated__/DimensionsRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment DimensionsRoute_submission on ConsignmentSubmission {
    width
    height
    depth
    dimensionsMetric
  }
`

const Schema = Yup.object().shape({
  width: Yup.string().trim(),
  height: Yup.string().trim(),
  depth: Yup.string().trim(),
  dimensionsMetric: Yup.string().required().trim(),
})

interface FormValues {
  width: string
  height: string
  depth: string
  dimensionsMetric: string
}

interface DimensionsRouteProps {
  submission: DimensionsRoute_submission$key
}

export const DimensionsRoute: React.FC<DimensionsRouteProps> = props => {
  const { actions } = useSellFlowContext()
  const submission = useFragment(FRAGMENT, props.submission)
  const { userPreferences } = useSystemContext()
  const userPreferredMetric = userPreferences?.metric
  const focusedInputRef = useFocusInput()

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    height: submission.height ?? "",
    width: submission.width ?? "",
    depth: submission.depth ?? "",
    dimensionsMetric:
      submission.dimensionsMetric ?? userPreferredMetric ?? "in",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, setFieldValue, values }) => (
        <SubmissionLayout>
          <SubmissionStepTitle>Artwork dimensions</SubmissionStepTitle>

          <Join separator={<Spacer y={4} />}>
            <GridColumns>
              <Column span={[4, 3]}>
                <RadioGroup
                  flexDirection="row"
                  onSelect={option => setFieldValue("dimensionsMetric", option)}
                  defaultValue={values.dimensionsMetric}
                  justifyContent="space-between"
                  data-testid="dimensionsMetric-radio"
                >
                  <Radio value="cm" label="cm" />
                  <Spacer x={2} />
                  <Radio value="in" label="in" />
                </RadioGroup>
              </Column>
            </GridColumns>

            <GridColumns>
              <Column span={[6, 6]}>
                <LabeledInput
                  label={values.dimensionsMetric}
                  ref={focusedInputRef}
                  onChange={handleChange}
                  name="width"
                  title="Width"
                  defaultValue={values.width || ""}
                  data-testid="width-input"
                />
              </Column>

              <Column span={[6, 6]}>
                <LabeledInput
                  label={values.dimensionsMetric}
                  onChange={handleChange}
                  name="height"
                  title="Height"
                  defaultValue={values.height || ""}
                  data-testid="height-input"
                />
              </Column>

              <Column span={[6, 6]}>
                <LabeledInput
                  label={values.dimensionsMetric}
                  onChange={handleChange}
                  name="depth"
                  title="Depth"
                  defaultValue={values.depth || ""}
                  data-testid="depth-input"
                />
              </Column>
            </GridColumns>
          </Join>

          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
