import { ModalDialog } from "@artsy/palette"
import type { FC } from "react"
import { CollectorProfileArtistsAdd } from "Components/CollectorProfile/CollectorProfileArtistsAdd"

interface CollectorProfileArtistsAddDialogProps {
  onClose: () => void
  onSuccess?: () => void
  title: string
}

export const CollectorProfileArtistsAddDialog: FC<
  React.PropsWithChildren<CollectorProfileArtistsAddDialogProps>
> = ({ onClose, onSuccess, title }) => {
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
