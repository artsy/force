import { Clickable, Text, TextArea, TextAreaChange } from "@artsy/palette"
import * as React from "react";
import { useInquiry } from "v2/Components/Inquiry/useInquiry"

export const OfferNote: React.FC<{
  onChange(change: TextAreaChange): void
  artworkId: string
  counteroffer?: boolean
}> = ({ onChange, artworkId, counteroffer }) => {
  const { inquiryComponent, showInquiry } = useInquiry({
    artworkID: artworkId,
  })

  return (
    <>
      {inquiryComponent}

      <TextArea
        title="Note (optional)"
        characterLimit={200}
        description={
          <>
            Use this note to add any additional context about your
            {counteroffer ? " counteroffer" : " offer"}. Please do not share
            personal information in this field. For any questions about the
            work,{" "}
            <Clickable
              textDecoration="underline"
              onClick={() => {
                showInquiry({ askSpecialist: true })
              }}
            >
              <Text data-test="ask-specialists" variant="xs" color="black100">
                ask our specialists
              </Text>
            </Clickable>
            .
          </>
        }
        placeholder="Add a note"
        onChange={onChange}
      />
    </>
  )
}
