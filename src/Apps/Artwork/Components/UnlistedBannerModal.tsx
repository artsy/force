import { Button, ModalDialog, Spacer, Text } from "@artsy/palette"
import * as React from "react"

interface UnlistedBannerModalProps {
  show: boolean
  onClose(): void
}

export const UnlistedBannerModal: React.FC<UnlistedBannerModalProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null

  return (
    <ModalDialog
      onClose={onClose}
      title="Private Listings"
      footer={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Text variant="sm" data-testid="unlisted-modal-text">
        Private listings are shared by galleries with select collectors. You
        need a link to find them - they won't appear in searches on Artsy.
      </Text>
      <Spacer y={2} />
      <Text variant="sm">
        Use the heart icon to add a private listing to your Saves, for easy
        access.
      </Text>
    </ModalDialog>
  )
}
