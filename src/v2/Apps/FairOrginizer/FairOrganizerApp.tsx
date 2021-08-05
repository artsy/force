import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, GridColumns, Spacer, Text, Title } from "@artsy/palette"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "./Components/FairOrganizerFollowButton"
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

        <GridColumns>
          <Column span={6}>
            <Text as="h1" variant="lg" pt={4}>
              Fair Organizer
            </Text>
            <GridColumns my={2}>
              <Column span={[12, 8, 6]}>
                <FairOrganizerFollowButton fairOrganizer={fairOrganizer} />
              </Column>
            </GridColumns>
          </Column>
        </GridColumns>

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
        ...FairOrganizerFollowButton_fairOrganizer
      }
    `,
  }
)
