import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerHeaderIconFragmentContainer as FairOrganizerHeaderIcon } from "./FairOrganizerHeaderIcon"
import { FairOrganizerTimingFragmentContainer as FairOrganizerTiming } from "./FairOrganizerTiming"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "../../Components/FairOrganizerFollowButton"
import { FairOrganizerInfoFragmentContainer as FairOrganizerInfo } from "./FairOrganizerInfo"
import { FairOrganizerHeader_fairOrganizer } from "v2/__generated__/FairOrganizerHeader_fairOrganizer.graphql"

interface FairOrganizerHeaderProps {
  fairOrganizer: FairOrganizerHeader_fairOrganizer
}

export const FairOrganizerHeader: React.FC<FairOrganizerHeaderProps> = ({
  fairOrganizer,
}) => {
  const { fairs, name } = fairOrganizer
  const { edges } = fairs!
  const fair = edges?.[0]?.node!

  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Flex flexDirection="column">
            <Box>
              <FairOrganizerHeaderIcon fairOrganizer={fairOrganizer} />
            </Box>

            <Spacer mt={1} />

            <Box>
              <Text as="h1" variant="xl">
                Explore {name} on Artsy
              </Text>

              <FairOrganizerTiming fair={fair!} />
            </Box>

            <Spacer mt={30} />

            <GridColumns>
              <Column span={[12, 8, 6]}>
                <FairOrganizerFollowButton fairOrganizer={fairOrganizer} />
              </Column>
            </GridColumns>

            <Spacer mt={30} />
          </Flex>
        </Column>

        <Column span={6}>
          <FairOrganizerInfo fairOrganizer={fairOrganizer} />
        </Column>
      </GridColumns>
    </Box>
  )
}

export const FairOrganizerHeaderFragmentContainer = createFragmentContainer(
  FairOrganizerHeader,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerHeader_fairOrganizer on FairOrganizer {
        name
        fairs: fairsConnection(first: 1) {
          edges {
            node {
              ...FairOrganizerTiming_fair
            }
          }
        }
        ...FairOrganizerHeaderIcon_fairOrganizer
        ...FairOrganizerFollowButton_fairOrganizer
        ...FairOrganizerInfo_fairOrganizer
      }
    `,
  }
)
