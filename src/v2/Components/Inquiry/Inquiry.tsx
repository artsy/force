import React from "react"
import {
  InquiryProviderQueryRenderer,
  useInquiryContext,
} from "./Hooks/useInquiryContext"
import { InquiryBackdrop } from "./Components/InquiryBackdrop"
import { Box, Clickable, CloseIcon, DROP_SHADOW } from "@artsy/palette"

interface InquiryProps {
  artworkID: string
  askSpecialist?: boolean
  onClose(): void
}

export const Inquiry: React.FC<InquiryProps> = ({
  artworkID,
  askSpecialist,
  onClose,
}) => {
  return (
    <InquiryBackdrop onClose={onClose}>
      <InquiryProviderQueryRenderer
        artworkID={artworkID}
        askSpecialist={askSpecialist}
        onClose={onClose}
      >
        <InquiryDialog />
      </InquiryProviderQueryRenderer>
    </InquiryBackdrop>
  )
}

const InquiryDialog: React.FC = () => {
  const { onClose, current, View } = useInquiryContext()

  switch (current) {
    case "Confirmation":
    case "Done":
      return <View />

    default:
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

          <View />
        </Box>
      )
  }
}
