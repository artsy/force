import { Button, Text } from "@artsy/palette"
import React from "react"
import { useInquiryContext } from "../InquiryContext"

export const InquiryArtistsInCollection: React.FC = () => {
  const { next } = useInquiryContext()

  return (
    <>
      <Text variant="sm" mb={1}>
        ArtistsInCollection
      </Text>

      <Button width="100%" onClick={next}>
        Next
      </Button>
    </>
  )
}
