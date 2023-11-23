import { ModalBase, ModalBaseProps, useDidMount } from "@artsy/palette"
import { ModalContent } from "Components/Alert/Components/Modal/ModalContent"
import { ModalHeader } from "Components/Alert/Components/Modal/ModalHeader"
import React from "react"
export type AlertModalProps = ModalBaseProps

export const Modal: React.FC<AlertModalProps> = ({ children, onClose }) => {
  const isMounted = useDidMount()

  return (
    <ModalBase
      onClose={onClose}
      style={
        isMounted
          ? {
              backgroundColor: "rgba(229, 229, 229, 0.5)",
              transition: "background-color 250ms",
            }
          : { backgroundColor: "transparent" }
      }
      dialogProps={{
        height: ["100%", "auto"],
        width: ["100%", "auto"],
        minWidth: ["auto", 500],
        maxHeight: ["auto", "90%"],
      }}
    >
      <ModalContent onClose={onClose} header={<ModalHeader />}>
        {children}
      </ModalContent>
    </ModalBase>
  )
}
