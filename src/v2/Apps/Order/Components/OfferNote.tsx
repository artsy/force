import { TextArea, TextAreaChange } from "@artsy/palette"
import * as React from "react"
import { useInquiry } from "v2/Components/Inquiry/useInquiry"

export const OfferNote: React.FC<{
  onChange(change: TextAreaChange): void
  artworkId: string
  counteroffer?: boolean
}> = ({ onChange, artworkId }) => {
  const { inquiryComponent } = useInquiry({
    artworkID: artworkId,
  })

  return (
    <>
      {inquiryComponent}

      <TextArea
        title="Note (optional)"
        characterLimit={1000}
        description="For your own safety, please do not share personal information."
        placeholder="Add any additional information regarding your offer."
        onChange={onChange}
      />
    </>
  )
}
