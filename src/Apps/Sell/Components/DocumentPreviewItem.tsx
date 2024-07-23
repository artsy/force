import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import { Box, Clickable, Flex, ProgressBar, Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useRemoveAssetFromConsignmentSubmission } from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { DocumentsFormValues } from "Apps/Sell/Routes/AdditionalRoutes/AdditionalDocumentsRoute"
import DocumentIcon from "@artsy/icons/DocumentIcon"
import { DropzoneFile } from "Components/FileUpload/types"

const logger = createLogger("Sell/DocumentPreviewItem.tsx")
const IMAGE_SIZES = [100, 140]

interface DocumentPreviewItemProps {
  document: DropzoneFile
}

export const DocumentPreviewItem: React.FC<DocumentPreviewItemProps> = ({
  document,
}) => {
  const { isLoggedIn } = useSystemContext()
  const {
    submitMutation: removeAsset,
  } = useRemoveAssetFromConsignmentSubmission()
  const { setFieldValue, values } = useFormikContext<DocumentsFormValues>()

  const handleDocumentDelete = (document: DropzoneFile) => {
    document.removed = true
    document.abortUploading?.()

    if (document.assetId) {
      removeAsset({
        variables: {
          input: {
            assetID: document.assetId,
            sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
          },
        },
      }).catch(error => {
        logger.error("Remove asset error", error)
      })
    }

    const documentsToSave = values.documents.filter(p => p.id !== document.id)
    setFieldValue("documents", documentsToSave)
  }

  const isLoading = document.loading && document.progress

  return (
    <Flex
      minWidth={IMAGE_SIZES}
      minHeight={IMAGE_SIZES}
      position="relative"
      data-testid="document-preview-item"
    >
      <Box position="relative" width={IMAGE_SIZES} height={IMAGE_SIZES}>
        <Clickable
          onClick={() => {
            if (document.externalUrl) {
              window.open(document.externalUrl, "_blank")
            }
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor="black5"
            width={IMAGE_SIZES}
            height={IMAGE_SIZES}
            justifyContent="center"
            alignItems="center"
          >
            <DocumentIcon size="36px" />

            <Text
              variant="xs"
              overflowEllipsis
              width={IMAGE_SIZES}
              px={2}
              pt={1}
              textAlign="center"
            >
              {document.name}
            </Text>
          </Box>
        </Clickable>

        {!!isLoading && (
          <Flex
            position="absolute"
            bottom={0}
            left={0}
            zIndex={Z.popover}
            justifyContent="center"
            alignItems="center"
            width="100%"
            marginBottom={-1}
          >
            <ProgressBar
              width="100%"
              highlight="brand"
              percentComplete={document.progress || 0}
            />
          </Flex>
        )}
      </Box>

      <Clickable
        data-testid="delete-document-thumbnail"
        onClick={() => {
          handleDocumentDelete(document)
        }}
      >
        <Flex
          position="absolute"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
          top={0.5}
          right={0.5}
          width="18px"
          height="18px"
          backgroundColor="white100"
          borderRadius="50%"
        >
          <CloseFillIcon
            width="18px"
            height="18px"
            aria-label="Cancel"
            title="Cancel"
          />
        </Flex>
      </Clickable>
    </Flex>
  )
}
