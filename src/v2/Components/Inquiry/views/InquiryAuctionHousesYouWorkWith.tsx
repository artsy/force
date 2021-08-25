import { Button, Text } from "@artsy/palette"
import React from "react"
import { useInquiryContext } from "../InquiryContext"

export const InquiryAuctionHousesYouWorkWith: React.FC = () => {
  const { next } = useInquiryContext()

  return (
    <>
      <Text variant="sm" mb={1}>
        AuctionHousesYouWorkWith
      </Text>

      <Button width="100%" onClick={next}>
        Next
      </Button>
    </>
  )
}
