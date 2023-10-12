import { TextArea, TextAreaChange } from "@artsy/palette"
import * as React from "react"
import { useInquiry } from "Components/Inquiry/useInquiry"

export const OfferNote: React.FC<{
  onChange(change: TextAreaChange): void
  artworkId: string
  counteroffer?: boolean
  value?: string
}> = ({ onChange, artworkId, value }) => {
  const { inquiryComponent } = useInquiry({
    artworkID: artworkId,
  })

  return (
    <>
      {inquiryComponent}

      <TextArea
        title="Note (recommended)"
        maxLength={1000}
        description="Add additional information to help the gallery to evaluate your offer."
        placeholder="E.g. memberships of art institutions, artists or genres you collect, interest in the artist, etc."
        onChange={onChange}
        value={value}
      />
    </>
  )
}
