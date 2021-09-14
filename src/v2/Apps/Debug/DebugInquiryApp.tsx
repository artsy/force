// TODO: Remove once inquiry is complete
import { Button } from "@artsy/palette"
import React from "react"
import { useInquiry } from "v2/Components/Inquiry/useInquiry"

export const DebugInquiryApp: React.FC<{}> = () => {
  const { inquiryComponent, showInquiry } = useInquiry({
    artworkID: "andy-warhol-the-shadow-from-myths-2",
  })

  return (
    <>
      <Button onClick={() => showInquiry({ askSpecialist: true })}>
        Open inquiry questionnaire
      </Button>

      {inquiryComponent}
    </>
  )
}
