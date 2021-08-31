import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Spacer, Title } from "@artsy/palette"
import { FairOrganizerApp_fairOrganizer } from "v2/__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { FairOrganizerHeaderImageFragmentContainer as FairOrganizerHeaderImage } from "./Components/FairOrganizerHeaderImage"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "./Components/FairOrganizerPastEventsRail"
import { FairOrganizerLatestArticlesFragmentContainer as FairOrganizerLatestArticles } from "./Components/FairOrganizerLatestArticles"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer
}

const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  fairOrganizer,
}) => {
  const { name } = fairOrganizer
  return (
    <>
      <Title>{`${name} | Artsy`}</Title>

      <Box>
        <FairOrganizerHeaderImage fairOrganizer={fairOrganizer} />

        <Spacer mt={4} />

        <FairOrganizerHeader fairOrganizer={fairOrganizer} />

        <Spacer mt={6} />

        <FairOrganizerPastEventsRail fairOrganizer={fairOrganizer} />

        <Spacer mt={140} />

        <FairOrganizerLatestArticles fairOrganizer={fairOrganizer} />
      </Box>
    </>
  )
}

export const FairOrganizerAppFragmentContainer = createFragmentContainer(
  FairOrganizerApp,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerApp_fairOrganizer on FairOrganizer {
        name
        ...FairOrganizerPastEventsRail_fairOrganizer
        ...FairOrganizerHeaderImage_fairOrganizer
        ...FairOrganizerHeader_fairOrganizer
        ...FairOrganizerLatestArticles_fairOrganizer
      }
    `,
  }
)
