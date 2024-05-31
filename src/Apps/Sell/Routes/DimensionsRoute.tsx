import * as React from "react"
import * as Yup from "yup"
import { DimensionsRoute_submission$key } from "__generated__/DimensionsRoute_submission.graphql"
import {
  BorderedRadio,
  Input,
  Join,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { Formik, useFormikContext } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"
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

const InnerForm: React.FC = props => {
  const { values, handleChange, setFieldValue } = useFormikContext<FormValues>()

  return (
    <>
      <RadioGroup
        onSelect={option => setFieldValue("dimensionsMetric", option)}
        defaultValue={values.dimensionsMetric}
      >
        <BorderedRadio value="in" label="in" />
        <BorderedRadio value="cm" label="cm" />
      </RadioGroup>
      <Spacer y={2} />
      <Join separator={<Spacer y={2} />}>
        <Input
          onChange={handleChange}
          name="width"
          title="Width"
          defaultValue={values.width}
        ></Input>
        <Input
          onChange={handleChange}
          name="height"
          title="Height"
          defaultValue={values.height}
        ></Input>
        <Input
          onChange={handleChange}
          name="depth"
          title="Depth"
          defaultValue={values.depth}
        ></Input>
      </Join>
    </>
  )
}

interface DimensionsRouteProps {
  submission: DimensionsRoute_submission$key
}

export const DimensionsRoute: React.FC<DimensionsRouteProps> = props => {
  const { actions } = useArtworkFormContext()
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
      <SubmissionLayout>
        <Text mb={2} variant="xl">Artwork dimensions</Text>
        <InnerForm />
        <DevDebug />
      </SubmissionLayout>
    </Formik>
  )
}
