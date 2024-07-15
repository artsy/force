import { ModalDialog } from "@artsy/palette"
import { FC } from "react"
import { CollectorProfileArtistsAdd } from "Components/CollectorProfile/CollectorProfileArtistsAdd"

interface CollectorProfileArtistsAddDialogProps {
  onClose: () => void
  onSuccess?: () => void
  title: string
}

export const CollectorProfileArtistsAddDialog: FC<CollectorProfileArtistsAddDialogProps> = ({
  onClose,
  onSuccess,
  title,
}) => {
  return (
    <>
      <ModalDialog
        title={title}
        onClose={onClose}
        dialogProps={{ height: 700, width: 650 }}
      >
        <CollectorProfileArtistsAdd onSuccess={onSuccess || onClose} />
      </ModalDialog>
    </>
  )
}
