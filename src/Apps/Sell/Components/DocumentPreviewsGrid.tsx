import { Flex, Spacer } from "@artsy/palette"
import { DocumentPreviewItem } from "Apps/Sell/Components/DocumentPreviewItem"
import { DocumentsFormValues } from "Apps/Sell/Routes/AdditionalRoutes/AdditionalDocumentsRoute"
import { useFormikContext } from "formik"

export const DocumentPreviewsGrid: React.FC = () => {
  const {
    values: { documents },
  } = useFormikContext<DocumentsFormValues>()

  if (!documents) return null

  return (
    <>
      <Spacer y={2} />

      <Flex gap={1} flexWrap="wrap">
        {[...documents].reverse().map(document => (
          <DocumentPreviewItem key={document.id} document={document} />
        ))}
      </Flex>
    </>
  )
}
