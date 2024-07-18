import {
  Column,
  GridColumns,
  Join,
  LabeledInput,
  Radio,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FrameRoute_submission$key } from "__generated__/FrameRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment FrameRoute_submission on ConsignmentSubmission {
    myCollectionArtwork {
      artworkId: internalID
      isFramed
      framedMetric
      framedWidth
      framedHeight
      framedDepth
    }
  }
`

const Schema = Yup.object().shape({
  artworkId: Yup.string().required(),
  isFramed: Yup.boolean().nullable(),
  framedMetric: Yup.string().required().trim(),
  framedWidth: Yup.string().trim(),
  framedHeight: Yup.string().trim(),
  framedDepth: Yup.string().trim(),
})

interface FormValues {
  artworkId: string
  isFramed?: boolean | null
  framedMetric: string
  framedWidth: string
  framedHeight: string
  framedDepth: string
}

interface FrameRouteProps {
  submission: FrameRoute_submission$key
}

export const FrameRoute: React.FC<FrameRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const artwork = submission.myCollectionArtwork
  const { actions } = useSellFlowContext()
  const { userPreferences } = useSystemContext()
  const userPreferredMetric = userPreferences?.metric

  if (!artwork) return null

  const onSubmit = async (values: FormValues) => {
    // reset dimensions if not framed (required by backend)
    if (!values.isFramed) {
      values.framedWidth = ""
      values.framedHeight = ""
      values.framedDepth = ""
    }

    const result = await actions.updateMyCollectionArtwork(values)
    const error =
      result.myCollectionUpdateArtwork?.artworkOrError?.mutationError

    if (error) throw error

    return result
  }

  const initialValues: FormValues = {
    artworkId: artwork.artworkId,
    isFramed: artwork.isFramed,
    framedMetric: artwork.framedMetric ?? userPreferredMetric ?? "in",
    framedHeight: artwork.framedHeight ?? "",
    framedWidth: artwork.framedWidth ?? "",
    framedDepth: artwork.framedDepth ?? "",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, setFieldValue, values }) => {
        return (
          <SubmissionLayout>
            <SubmissionStepTitle>Frame</SubmissionStepTitle>

            <Join separator={<Spacer y={4} />}>
              <Join separator={<Spacer y={2} />}>
                <Text variant="sm-display">Is the work framed?</Text>

                <GridColumns>
                  <Column span={[4, 3]}>
                    <RadioGroup
                      flexDirection="row"
                      onSelect={option => setFieldValue("isFramed", option)}
                      defaultValue={values.isFramed}
                      justifyContent="flex-start"
                      data-testid="signature-radio"
                    >
                      <Radio
                        value={true}
                        label="Yes"
                        data-testid="signature-radio-yes"
                      />

                      <Spacer x={2} />

                      <Radio
                        value={false}
                        label="No"
                        data-testid="signature-radio-no"
                      />
                    </RadioGroup>
                  </Column>
                </GridColumns>
              </Join>

              {values.isFramed && (
                <>
                  <GridColumns>
                    <Column span={[6, 6]}>
                      <LabeledInput
                        label={values.framedMetric}
                        onChange={handleChange}
                        name="framedWidth"
                        title="Width"
                        defaultValue={values.framedWidth || ""}
                        data-testid="width-input"
                      />
                    </Column>

                    <Column span={[6, 6]}>
                      <LabeledInput
                        label={values.framedMetric}
                        onChange={handleChange}
                        name="framedHeight"
                        title="Height"
                        defaultValue={values.framedHeight || ""}
                        data-testid="height-input"
                      />
                    </Column>

                    <Column span={[6, 6]}>
                      <LabeledInput
                        label={values.framedMetric}
                        onChange={handleChange}
                        name="framedDepth"
                        title="Depth"
                        defaultValue={values.framedDepth || ""}
                        data-testid="depth-input"
                      />
                    </Column>
                  </GridColumns>

                  <GridColumns>
                    <Column span={[4, 3]}>
                      <RadioGroup
                        flexDirection="row"
                        onSelect={option =>
                          setFieldValue("framedMetric", option)
                        }
                        defaultValue={values.framedMetric}
                        justifyContent="space-between"
                      >
                        <Radio
                          value="cm"
                          label="cm"
                          data-testid="dimensionsMetric-radio-cm"
                        />
                        <Spacer x={2} />
                        <Radio value="in" label="in" />
                      </RadioGroup>
                    </Column>
                  </GridColumns>
                </>
              )}
            </Join>

            <DevDebug />
          </SubmissionLayout>
        )
      }}
    </Formik>
  )
}
