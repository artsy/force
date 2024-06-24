import { CollectorProfileArtistsAddDialog } from "Components/CollectorProfile/CollectorProfileArtistsAddDialog"
import { FC } from "react"

interface CompleteProfileCollectionDialogProps {
  onClose: () => void
}

export const CompleteProfileCollectionDialog: FC<CompleteProfileCollectionDialogProps> = ({
  onClose,
}) => {
  return (
    <CollectorProfileArtistsAddDialog
      title="Tell us about the artists your collection."
      description="Show off your collection and make a great impression."
      isCancellable
      onClose={onClose}
    />
  )
}
