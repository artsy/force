import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Spacer, Title } from "@artsy/palette"
import { FairOrganizerApp_fairOrganizer } from "v2/__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { FairHeaderImageFragmentContainer as FairHeaderImage } from "../Fair/Components/FairHeader/FairHeaderImage"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer
}

export const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  fairOrganizer,
}) => {
  const { fairs, name } = fairOrganizer
  const { edges } = fairs!
  const fair = edges?.[0]?.node!
  return (
    <>
      <Title>{name} | Artsy</Title>

      <Box>
        <FairHeaderImage fair={fair} />

        <Spacer mt={4} />

        <FairOrganizerHeader fairOrganizer={fairOrganizer} />

        <Spacer mt={4} />
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
  }
)
