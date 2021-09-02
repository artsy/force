// TODO: Remove once inquiry is complete
import { Button } from "@artsy/palette"
import React from "react"
import { useInquiry } from "v2/Components/Inquiry/Hooks/useInquiry"

export const DebugInquiryApp: React.FC<{}> = () => {
  const { inquiryQuestionnaire, showInquiry } = useInquiry({
    artworkID: "andy-warhol-the-shadow-from-myths-2",
  })

  return (
    <>
      <Button onClick={showInquiry}>Open inquiry questionnaire</Button>

      {inquiryQuestionnaire}
    </>
  )
}
