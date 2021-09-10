import { ModalBase, ModalBaseProps } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"

export const InquiryBackdrop: React.FC<ModalBaseProps> = props => {
  const isMounted = useDidMount()

  return (
    <Modal bg={isMounted ? "rgba(0, 0, 0, 0.8)" : "transparent"} {...props} />
  )
}

export const Modal = styled(ModalBase)`
  transition: background-color 250ms;
`
