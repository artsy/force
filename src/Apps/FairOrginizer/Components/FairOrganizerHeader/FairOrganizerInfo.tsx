import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { InfoSection } from "Components/InfoSection"
import { FairOrganizerInfo_fairOrganizer$data } from "__generated__/FairOrganizerInfo_fairOrganizer.graphql"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface FairOrganizerInfoProps {
  fairOrganizer: FairOrganizerInfo_fairOrganizer$data
}

export const FairOrganizerInfo: React.FC<FairOrganizerInfoProps> = ({
  fairOrganizer,
}) => {
  const { about } = fairOrganizer

  if (!about) return null

  return (
    <InfoSectionContainer>
      <InfoSection type="html" label="About" info={about} />
    </InfoSectionContainer>
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
