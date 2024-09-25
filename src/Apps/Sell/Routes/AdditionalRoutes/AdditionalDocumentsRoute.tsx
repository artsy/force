import { Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { DocumentPreviewsGrid } from "Apps/Sell/Components/DocumentPreviewsGrid"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { UploadDocumentsForm } from "Apps/Sell/Components/UploadDocumentsForm"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { Asset, dropzoneFileFromAsset } from "Apps/Sell/Utils/uploadUtils"
import { DropzoneFile } from "Components/FileUpload/types"
import { AdditionalDocumentsRoute_submission$key } from "__generated__/AdditionalDocumentsRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment AdditionalDocumentsRoute_submission on ConsignmentSubmission {
    externalId

    assets(assetType: [ADDITIONAL_FILE]) {
      id
      size
      filename
      documentPath
      s3Path
      s3Bucket
    }
  }
`

const Schema = Yup.object().shape({
  documents: Yup.array(),
})

export interface DocumentsFormValues {
  submissionId: string
  documents: DropzoneFile[]
}

interface AdditionalDocumentsRouteProps {
  submission: AdditionalDocumentsRoute_submission$key
}

export const AdditionalDocumentsRoute: React.FC<AdditionalDocumentsRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const {
    actions: { setLoading },
  } = useSellFlowContext()

  const documents: DropzoneFile[] = ((submission.assets as Asset[]) || []).map(
    dropzoneFileFromAsset
  )

  const initialValues: DocumentsFormValues = {
    submissionId: submission.externalId,
    documents,
  }

  return (
    <Formik<DocumentsFormValues>
      initialValues={initialValues}
      onSubmit={() => {}}
      validateOnMount
      validationSchema={Schema}
    >
      {({ values }) => {
        const isAnyDocumentLoading = values.documents.some(
          (document: DropzoneFile) => document.loading
        )
        setLoading(isAnyDocumentLoading)

        return (
          <SubmissionLayout>
            <SubmissionStepTitle>Additional Documents</SubmissionStepTitle>

            <Text mb={2} variant={["xs", "sm"]} color="black60">
              Please add any of the following if you have them: Proof of
              Purchase, Certificate of Authentication, Fact Sheet, Condition
              Report
            </Text>

            <UploadDocumentsForm />

            <DocumentPreviewsGrid />

            <DevDebug />
          </SubmissionLayout>
        )
      }}
    </Formik>
  )
}
