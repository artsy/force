import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, GridColumns, Spacer, Text, Title } from "@artsy/palette"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "./Components/FairOrganizerFollowButton"
import { FairOrganizerHeaderImage } from "./Components/FairOrganizerHeader/FairOrganizerHeaderImage"
import { FairOrganizerApp_fairOrganizer } from "v2/__generated__/FairOrganizerApp_fairOrganizer.graphql"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer
}

export const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  children,
  fairOrganizer,
}) => {
  const { name } = fairOrganizer
  return (
    <>
      <Title>{name} | Artsy</Title>

      <Box>
        <FairOrganizerHeaderImage
          image={{
            url:
              "https://d32dm0rphc51dk.cloudfront.net/32RSQgH4I--VLWyuDBzFTQ/wide.jpg",
          }}
        />

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

        {children}
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
        ...FairOrganizerFollowButton_fairOrganizer
        ...FairOrganizerHeader_fairOrganizer
      }
    `,
  }
)
