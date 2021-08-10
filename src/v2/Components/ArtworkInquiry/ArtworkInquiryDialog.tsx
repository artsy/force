import {
  Box,
  Clickable,
  CloseIcon,
  DROP_SHADOW,
  ModalBase,
} from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { useArtworkInquiryContext } from "./ArtworkInquiryContext"

export const ArtworkInquiryDialog: React.FC = ({ children }) => {
  const { onClose } = useArtworkInquiryContext()

  return (
    <Box
      position="relative"
      bg="white100"
      width={550}
      height="100%"
      p={2}
      style={{ boxShadow: DROP_SHADOW }}
    >
      <Clickable
        position="absolute"
        right={0}
        top={0}
        pt={2}
        px={1}
        mx={0.5}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon fill="black100" display="block" />
      </Clickable>

      {children}
    </Box>
  )
}

export const ArtworkInquiryBackdrop = styled(ModalBase)`
  transition: background-color 250ms;
`
