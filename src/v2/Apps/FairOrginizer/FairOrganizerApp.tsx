import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Spacer, Title } from "@artsy/palette"
import { FairOrganizerApp_fairOrganizer } from "v2/__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { FairHeaderImageFragmentContainer as FairHeaderImage } from "../Fair/Components/FairHeader/FairHeaderImage"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "./Components/FairOrganizerPastEventsRail"
import { FairOrganizerApp_pastFairs } from "v2/__generated__/FairOrganizerApp_pastFairs.graphql"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer
  pastFairs: FairOrganizerApp_pastFairs
}

const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  fairOrganizer,
  pastFairs,
}) => {
  const { fairs, name } = fairOrganizer
  const { edges } = fairs!
  const fair = edges?.[0]?.node!
  return (
    <>
      <Title>{`${name} | Artsy`}</Title>

      <Box>
        <FairHeaderImage fair={fair} />

        <Spacer mt={4} />

        <FairOrganizerHeader fairOrganizer={fairOrganizer} />

        <Spacer mt={6} />
        <FairOrganizerPastEventsRail fairs={pastFairs} />
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
        fairs: fairsConnection(first: 1) {
          edges {
            node {
              ...FairHeaderImage_fair
            }
          }
        }
        ...FairOrganizerHeader_fairOrganizer
      }
    `,
    pastFairs: graphql`
      fragment FairOrganizerApp_pastFairs on FairConnection {
        ...FairOrganizerPastEventsRail_fairs
      }
    `,
  }
)
