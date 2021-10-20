// TODO: Remove once inquiry is complete
import { Button } from "@artsy/palette"
import * as React from "react";
import { useInquiry } from "v2/Components/Inquiry/useInquiry"

export const DebugInquiryApp: React.FC<{}> = () => {
  const { inquiryComponent, showInquiry } = useInquiry({
    artworkID: "andy-warhol-electric-chair-134",
  })

  return (
    <>
      <Button onClick={() => showInquiry({ askSpecialist: false })}>
        Open inquiry questionnaire
      </Button>

      {inquiryComponent}
    </>
  )
}
