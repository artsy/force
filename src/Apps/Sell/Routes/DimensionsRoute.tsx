import * as React from "react"
import * as Yup from "yup"
import { DimensionsRoute_submission$key } from "__generated__/DimensionsRoute_submission.graphql"
import {
  Column,
  GridColumns,
  Input,
  Join,
  Radio,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { Formik } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"

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
  dimensionsMetric: Yup.string().trim(),
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

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    height: submission.height ?? "",
    width: submission.width ?? "",
    depth: submission.depth ?? "",
    dimensionsMetric: submission.dimensionsMetric ?? "in",
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
          <Text mb={2} variant="xl">
            Artwork dimensions
          </Text>
          <Join separator={<Spacer y={4} />}>
            <GridColumns>
              <Column span={[4, 3]}>
                <RadioGroup
                  flexDirection="row"
                  onSelect={option => setFieldValue("dimensionsMetric", option)}
                  defaultValue={values.dimensionsMetric}
                  justifyContent={"space-between"}
                >
                  <Radio value="cm" label="cm" />
                  <Spacer x={2} />
                  <Radio value="in" label="in" />
                </RadioGroup>
              </Column>
            </GridColumns>

            <GridColumns>
              <Column span={[6, 6]}>
                <Input
                  onChange={handleChange}
                  name="width"
                  title="Width"
                  defaultValue={values.width || ""}
                  required
                  data-testid="width-input"
                />
              </Column>

              <Column span={[6, 6]}>
                <Input
                  onChange={handleChange}
                  name="height"
                  title="Height"
                  defaultValue={values.height || ""}
                  required
                  data-testid="height-input"
                />
              </Column>

              <Column span={[6, 6]}>
                <Input
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
