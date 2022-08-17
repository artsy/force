import { Button, ModalDialog, Text } from "@artsy/palette"

interface ProvenanceModalProps {
  show: boolean
  onClose(): void
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null

  return (
    <ModalDialog
      onClose={onClose}
      title="Artwork provenance"
      footer={
        <Button onClick={onClose} width="100%">
          Close
        </Button>
      }
    >
      <Text variant="sm-display">
        Provenance is the documented history of an artwork’s ownership and
        authenticity.
      </Text>
      <Text variant="sm-display" mt={2}>
        Please list any documentation you have that proves your artwork’s
        provenance, such as:
      </Text>
      <Text as="li" variant="sm-display" mt={2}>
        Invoices from previous owners
      </Text>
      <Text as="li" variant="sm-display" mt={1}>
        Certificates of authenticity
      </Text>
      <Text as="li" variant="sm-display" mt={1}>
        Gallery exhibition catalogues
      </Text>
    </ModalDialog>
  )
}
