import { ModalBase, type ModalBaseProps, useTheme } from "@artsy/palette"
import { useDidMount } from "Utils/Hooks/useDidMount"
import type * as React from "react"
import styled from "styled-components"

export const InquiryBackdrop: React.FC<
  React.PropsWithChildren<ModalBaseProps>
> = props => {
  const isMounted = useDidMount()

  const { theme } = useTheme()

  return (
    <Modal bg={isMounted ? theme.effects.backdrop : "transparent"} {...props} />
  )
}

export const Modal = styled(ModalBase)`
  transition: background-color 250ms;
`
