import { Link, TextArea, TextAreaChange } from "@artsy/palette"
import { SystemContext } from "v2/Artsy"
import React, { useContext } from "react"

export const OfferNote: React.FC<{
  onChange(change: TextAreaChange): void
  artworkId: string
  counteroffer?: boolean
}> = ({ onChange, artworkId, counteroffer }) => {
  const { mediator } = useContext(SystemContext)
  return (
    <TextArea
      title="Note (optional)"
      characterLimit={200}
      description={
        <>
          Use this note to add any additional context about your
          {counteroffer ? " counteroffer" : " offer"}. Please do not share
          personal information in this field. For any questions about the work,{" "}
          <Link
            onClick={() =>
              mediator.trigger("openOrdersContactArtsyModal", {
                artworkId,
              })
            }
          >
            ask our specialists
          </Link>
          .
        </>
      }
      placeholder="Add a note"
      onChange={onChange}
    />
  )
}
