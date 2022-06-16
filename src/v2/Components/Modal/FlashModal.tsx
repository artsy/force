import { useEffect, useState } from "react"
import * as React from "react"
import { useSystemContext } from "v2/System/useSystemContext"
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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    mediator.on("modal:error:show", (options: FlashMessageProps) => {
      setShow(true)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setMessage(options.message)
    })
  })

  return show ? (
    <ErrorModal
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      detailText={message}
      onClose={() => {
        setShow(false)
        setMessage(null)
      }}
      show={show}
    />
  ) : null
}
