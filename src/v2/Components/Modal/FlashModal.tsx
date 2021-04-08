import React, { useEffect, useState } from "react"
import { useSystemContext } from "v2/Artsy/useSystemContext"
import { ErrorModal, ErrorModalProps } from "./ErrorModal"

export interface FlashMessageProps {
  message: ErrorModalProps["detailText"]
}

export const MODAL_EROR_OPEN = "modal:error:show"

export const FlashMessage: React.FC = () => {
  const { mediator } = useSystemContext()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    mediator.on("modal:error:show", (options: FlashMessageProps) => {
      setShow(true)
      setMessage(options.message)
    })
  })

  return show ? (
    <ErrorModal
      detailText={message}
      onClose={() => {
        setShow(false)
        setMessage(null)
      }}
      show={show}
    />
  ) : null
}
