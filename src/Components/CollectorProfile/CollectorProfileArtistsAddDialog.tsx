import { ModalDialog } from "@artsy/palette"
import { CollectorProfileArtistsAdd } from "Components/CollectorProfile/CollectorProfileArtistsAdd"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import type { FC } from "react"

interface CollectorProfileArtistsAddDialogProps {
  onClose: () => void
  onSuccess?: () => void
  title: string
}

export const CollectorProfileArtistsAddDialog: FC<
  React.PropsWithChildren<CollectorProfileArtistsAddDialogProps>
> = ({ onClose, onSuccess, title }) => {
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

  const handleClose = () => {
    submitUpdateMyUserProfile({ promptedForUpdate: true }).catch(err => {
      console.error(err)
    })

    onClose()
  }

  return (
    <>
      <ModalDialog
        title={title}
        onClose={handleClose}
        dialogProps={{ height: 700, width: 650 }}
      >
        <CollectorProfileArtistsAdd onSuccess={onSuccess || onClose} />
      </ModalDialog>
    </>
  )
}
