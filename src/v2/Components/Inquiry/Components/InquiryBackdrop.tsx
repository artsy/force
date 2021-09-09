import { ModalBase, ModalBaseProps } from "@artsy/palette"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

export const InquiryBackdrop: React.FC<ModalBaseProps> = props => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Modal bg={isMounted ? "rgba(0, 0, 0, 0.8)" : "transparent"} {...props} />
  )
}

export const Modal = styled(ModalBase)`
  transition: background-color 250ms;
`
