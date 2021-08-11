import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join, Spacer } from "@artsy/palette"
import { InfoSection } from "v2/Components/InfoSection"

export const FairOrganizerInfo: React.FC<any> = ({ fairOrganizer }) => {
  const { about } = fairOrganizer
  return (
    <Join separator={<Spacer mt={2} />}>
      {about && <InfoSection type="html" label="About" info={about} />}
    </Join>
  )
}

export const FairOrganizerInfoFragmentContainer = createFragmentContainer(
  FairOrganizerInfo,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerInfo_fairOrganizer on FairOrganizer {
        about(format: HTML)
      }
    `,
  }
)
