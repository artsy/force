import { Button, Text } from "@artsy/palette"
import React from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"

export const InquiryHowCanWeHelp: React.FC = () => {
  const { next } = useInquiryContext()

  return (
    <>
      <Text variant="sm" mb={1}>
        HowCanWeHelp
      </Text>

      <Button width="100%" onClick={next}>
        Next
      </Button>
    </>
  )
}
