import * as React from "react"
import { MetaTags } from "v2/Components/MetaTags"

interface MeetTheSpecialistsAppProps {}

export const MeetTheSpecialistsApp: React.FC<MeetTheSpecialistsAppProps> = ({
  children,
}) => {
  return (
    <>
      <MetaTags
        title="Meet the Specialists | Artsy"
        description="We're here to help. Contact an Artsy Advisory, Private Sale, or Auction Specialist."
        pathname="/meet-the-specialists"
      />
      {children}
    </>
  )
}
