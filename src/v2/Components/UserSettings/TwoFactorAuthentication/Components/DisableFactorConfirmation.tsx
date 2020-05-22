import { Dialog } from "@artsy/palette"
import React from "react"

interface DisableFactorConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
  show: boolean
}

export const DisableFactorConfirmation: React.FC<DisableFactorConfirmationProps> = props => {
  const { onCancel, onConfirm, show } = props

  return (
    <Dialog
      show={show}
      title="Disable 2FA method?"
      primaryCta={{
        action: onConfirm,
        text: "Disable",
      }}
      secondaryCta={{
        action: onCancel,
        text: "Cancel",
      }}
    />
  )
}
