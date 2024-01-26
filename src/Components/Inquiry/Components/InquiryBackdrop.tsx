import { ModalBase, ModalBaseProps, useTheme } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { useDidMount } from "Utils/Hooks/useDidMount"

export const InquiryBackdrop: React.FC<ModalBaseProps> = props => {
  const isMounted = useDidMount()

  const { theme } = useTheme()

  return (
    <Modal bg={isMounted ? theme.effects.backdrop : "transparent"} {...props} />
  )
}

export const Modal = styled(ModalBase)`
  transition: background-color 250ms;
`
