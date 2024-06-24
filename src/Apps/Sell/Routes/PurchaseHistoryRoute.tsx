import * as React from "react"
import * as Yup from "yup"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { Formik } from "formik"
import {
  Column,
  GridColumns,
  Join,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Text,
} from "@artsy/palette"
import { PurchaseHistoryRoute_submission$key } from "__generated__/PurchaseHistoryRoute_submission.graphql"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { graphql, useFragment } from "react-relay"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { PROVENANCE_LIST } from "Apps/Sell/Utils/formUtils"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"

const FRAGMENT = graphql`
  fragment PurchaseHistoryRoute_submission on ConsignmentSubmission {
    provenance
    signature
  }
`

const Schema = Yup.object().shape({
  provenance: Yup.string().trim(),
  signature: Yup.boolean().nullable(),
})

interface FormValues {
  provenance: string
  signature: boolean | null
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
    signature: submission.signature ?? null,
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
          <SubmissionStepTitle>
            Where did you purchase the artwork?
          </SubmissionStepTitle>

          <Join separator={<Spacer y={4} />}>
            <Select
              title="Purchase information"
              name="provenance"
              options={PROVENANCE_LIST}
              selected={values.provenance}
              onChange={handleChange}
              data-testid="provenance-input"
            />

            <Join separator={<Spacer y={2} />}>
              <Text variant="sm-display">Is the work signed?</Text>

              <GridColumns>
                <Column span={[4, 3]}>
                  <RadioGroup
                    flexDirection="row"
                    onSelect={option => setFieldValue("signature", option)}
                    defaultValue={values.signature}
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
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
