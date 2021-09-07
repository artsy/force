import { Button, Text } from "@artsy/palette"
import React from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"

export const InquiryDone: React.FC = () => {
  const { onClose } = useInquiryContext()

  return (
    <>
      <Text variant="sm" mb={2}>
        Thank you for completing your profile
      </Text>

      <Button width="100%" onClick={onClose}>
        Close
      </Button>
    </>
  )
}
