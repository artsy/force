import { Flex, Modal, ModalWidth, Text } from "@artsy/palette"
import React from "react"

interface ConfirmModalProps {
  onConfirm: () => void
  onClose: () => void
  show: boolean
  title?: string
  subTitle?: string
}
export const ConfirmModal: React.FC<ConfirmModalProps> = props => {
  const { show, title, onClose, subTitle, onConfirm } = props

  const onClickCancel = () => {
    onClose()
  }

  const onClickDelete = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      title={title}
      show={show}
      onClose={onClose}
      modalWidth={ModalWidth.Narrow}
    >
      <Text variant="text" color="black60">
        {subTitle}
      </Text>
      <Flex mt={2} justifyContent="flex-end">
        <Text
          mr={24}
          onClick={() => onClickCancel()}
          variant="mediumText"
          fontSize={12}
          color="black60"
          style={{
            cursor: "pointer",
          }}
        >
          Cancel
        </Text>
        <Text
          onClick={() => onClickDelete()}
          variant="mediumText"
          fontSize={12}
          color="red100"
          style={{
            cursor: "pointer",
          }}
        >
          Delete
        </Text>
      </Flex>
    </Modal>
  )
}
