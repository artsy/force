import { TextArea, type TextAreaChange } from "@artsy/palette"
import { useInquiry } from "Components/Inquiry/useInquiry"
import type * as React from "react"

export const OfferNote: React.FC<
  React.PropsWithChildren<{
    onChange(change: TextAreaChange): void
    artworkId: string
    counteroffer?: boolean
    value?: string
  }>
> = ({ onChange, artworkId, value }) => {
  const { inquiryComponent } = useInquiry({
    artworkID: artworkId,
  })

  return (
    <div data-testid="offerNote">
      {inquiryComponent}

      <TextArea
        title="Note (recommended)"
        maxLength={1000}
        description="Add additional information to help the gallery to evaluate your offer."
        placeholder="E.g. memberships of art institutions, artists or genres you collect, interest in the artist, etc."
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
