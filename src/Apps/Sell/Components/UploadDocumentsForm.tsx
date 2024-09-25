import { useToasts } from "@artsy/palette"
import { useAddAssetToConsignmentSubmission } from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { DocumentsFormValues } from "Apps/Sell/Routes/AdditionalRoutes/AdditionalDocumentsRoute"
import { normalizePhoto } from "Components/PhotoUpload/Utils/fileUtils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useCallback, useEffect } from "react"
import { FileRejection } from "react-dropzone"
import { uploadDocument as uploadDocumentToS3 } from "Apps/Sell/Utils/uploadUtils"
import { DropzoneFile } from "Components/FileUpload/types"
import { FileDropzone } from "Components/FileUpload/FileDropzone"
import { getErrorMessage } from "Components/FileUpload/utils/getErrorMessage"

const logger = createLogger("Sell/UploadDocumentsForm.tsx")

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/heic",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const ALLOWED_MIME_TYPES_HUMINIZED =
  "images (JPG, PNG or HEIC) or PDF or Microsoft Office files"

export const UploadDocumentsForm: React.FC = () => {
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { submitMutation: addAsset } = useAddAssetToConsignmentSubmission()
  const { setFieldValue, values } = useFormikContext<DocumentsFormValues>()
  const { sendToast } = useToasts()

  const handleDocumentUploadingProgress = useCallback(
    (document: DropzoneFile) => progress => {
      document.progress = progress
      setFieldValue("documents", values.documents)
    },
    [values.documents, setFieldValue]
  )

  const uploadDocument = useCallback(
    async document => {
      document.loading = true

      if (relayEnvironment) {
        const sourceKey = await uploadDocumentToS3(
          relayEnvironment,
          document,
          handleDocumentUploadingProgress(document)
        )

        if (!sourceKey) {
          document.errorMessage = `Document could not be added: ${document.name}`
          setFieldValue("documents", values.documents)

          sendToast({
            variant: "error",
            message: "Document could not be added",
          })

          return
        }

        document.sourceKey = sourceKey
        setFieldValue("documents", values.documents, true)

        try {
          const response = await addAsset({
            variables: {
              input: {
                assetType: "additional_file",
                source: {
                  key: sourceKey,
                  bucket: document.bucket,
                },
                externalSubmissionId: values.submissionId,
                sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
                filename: document.name,
                size: document.size?.toString(),
              },
            },
          })

          document.assetId = response.addAssetToConsignmentSubmission?.asset?.id
        } catch (error) {
          logger.error("Add asset error", error)
        } finally {
          document.loading = false
          setFieldValue("documents", values.documents, true)
        }
      }
    },
    [
      addAsset,
      handleDocumentUploadingProgress,
      isLoggedIn,
      relayEnvironment,
      setFieldValue,
      values.submissionId,
      values.documents,
      sendToast,
    ]
  )

  useEffect(() => {
    const documentsToUpload = values.documents.filter(
      c => !(c.sourceKey || c.url) && !c.loading && !c.errorMessage
    )

    if (documentsToUpload.length) {
      documentsToUpload.forEach(uploadDocument)
      setFieldValue("documents", [...values.documents])
    }
  }, [values.documents, setFieldValue, uploadDocument])

  const onDrop = (acceptedFiles: File[]) => {
    const documents = acceptedFiles.map(file => normalizePhoto(file))
    setFieldValue("documents", [
      ...values.documents.filter(p => !p.errorMessage),
      ...documents,
    ])
  }

  const onReject = useCallback(
    (rejections: FileRejection[]) => {
      rejections.forEach(rejection => {
        const errorMessage = getErrorMessage(
          rejection,
          ALLOWED_MIME_TYPES_HUMINIZED
        )
        sendToast({
          variant: "error",
          message: errorMessage,
        })
      })
    },
    [sendToast]
  )

  return (
    <FileDropzone
      title="Drag and drop documents here"
      buttonText="Add Documents"
      allFiles={values.documents}
      allowedMimeTypes={ALLOWED_MIME_TYPES}
      maxTotalSize={300}
      onDrop={onDrop}
      onReject={onReject}
      border="1px dashed"
      borderColor="black30"
      padding={4}
    />
  )
}
