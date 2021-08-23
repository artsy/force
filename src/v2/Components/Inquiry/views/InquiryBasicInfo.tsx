import React from "react"
import { Button, Text } from "@artsy/palette"
import { useInquiryContext } from "../InquiryContext"

export const InquiryBasicInfo: React.FC = () => {
  const { next } = useInquiryContext()

  return (
    <>
      <Text variant="sm" mb={1}>
        BasicInfo
      </Text>

      <Button width="100%" onClick={next}>
        Next
      </Button>
    </>
  )
}
