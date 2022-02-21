import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join, Spacer } from "@artsy/palette"
import { InfoSection } from "v2/Components/InfoSection"
import { FairOrganizerInfo_fairOrganizer$data } from "v2/__generated__/FairOrganizerInfo_fairOrganizer.graphql"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface FairOrganizerInfoProps {
  fairOrganizer: FairOrganizerInfo_fairOrganizer$data
}

export const FairOrganizerInfo: React.FC<FairOrganizerInfoProps> = ({
  fairOrganizer,
}) => {
  const { about } = fairOrganizer
  return (
    <Join separator={<Spacer mt={2} />}>
      {about && (
        <InfoSectionContainer>
          <InfoSection type="html" label="About" info={about} />
        </InfoSectionContainer>
      )}
    </Join>
  )
}

const InfoSectionContainer = styled.div`
  a:hover:not(:disabled) {
    text-decoration: underline;
    color: ${themeGet("colors.blue100")};
  }
`

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
