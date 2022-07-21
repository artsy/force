import * as React from "react"
import { Modal, ModalWidth } from "@artsy/palette"
import styled from "styled-components"

export const StyledIframe = styled("iframe")`
  height: 60vh;
  border: none;
`

export interface OrderModalProps {
  show: boolean
  closeModal: () => void
  title: string
  path: string
  orderID: string
}

export const OrderModal: React.FC<OrderModalProps> = ({
  show,
  closeModal,
  title,
  path,
}) => (
  <Modal
    modalWidth={ModalWidth.Wide}
    show={show}
    onClose={closeModal}
    title={title}
  >
    <StyledIframe src={`${path}?isModal=true`}></StyledIframe>
  </Modal>
)
