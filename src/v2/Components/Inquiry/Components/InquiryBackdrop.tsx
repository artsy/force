import { ModalBase, ModalBaseProps } from "@artsy/palette"
import * as React from "react"
import styled, { StyledComponentClass } from "styled-components"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"
import { useInquiryContext } from "../Hooks/useInquiryContext"

export const InquiryBackdrop: React.FC<ModalBaseProps> = props => {
  const isMounted = useDidMount()

  const { onClose } = useInquiryContext()

  return (
    <Modal
      bg={isMounted ? "rgba(0, 0, 0, 0.8)" : "transparent"}
      onClose={onClose}
      {...props}
    />
  )
}

export const Modal = styled(ModalBase)`
  transition: background-color 250ms;
` as StyledComponentClass<any, any>
