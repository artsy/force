import { Dialog } from "@artsy/palette"
import * as React from "react";
import { ApiError } from "../ApiError"

interface ApiErrorModalProps {
  errors: ApiError[]
  onClose: () => void
  show?: boolean
}

export const ApiErrorModal: React.FC<ApiErrorModalProps> = props => {
  const { errors, onClose, show } = props

  const errorMessage = errors.map(error => error.message).join("\n")

  return (
    <Dialog
      show={show}
      detail={errorMessage}
      title="An error occurred"
      primaryCta={{
        action: onClose,
        text: "OK",
      }}
    />
  )
}
