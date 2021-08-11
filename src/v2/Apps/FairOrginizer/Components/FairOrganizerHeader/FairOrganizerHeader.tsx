import React from "react"
import moment from "moment"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerHeaderIconFragmentContainer as FairOrganizerHeaderIcon } from "./FairOrganizerHeaderIcon"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "../../Components/FairOrganizerFollowButton"
import { FairOrganizerInfoFragmentContainer as FairOrganizerInfo } from "./FairOrganizerInfo"
import { FairOrganizerHeader_fairOrganizer } from "v2/__generated__/FairOrganizerHeader_fairOrganizer.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { Timer } from "v2/Components/Timer"

interface FairOrganizerHeaderProps {
  fairOrganizer: FairOrganizerHeader_fairOrganizer
}

export const FairOrganizerHeader: React.FC<FairOrganizerHeaderProps> = ({
  fairOrganizer,
}) => {
  const { fairsConnection, name } = fairOrganizer
  const fair = extractNodes(fairsConnection)[0]
  const { startAt, exhibitionPeriod } = fair

  const showTimer = moment().isBefore(new Date(startAt!))

  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Flex flexDirection="column">
            <Flex>
              <FairOrganizerHeaderIcon fairOrganizer={fairOrganizer} />
              <Spacer mr={2} />
              <Box>
                <Text as="h1" variant="xl">
                  Explore {name} on Artsy
                </Text>
                <Text variant="xl" color="black60" mb={1}>
                  {exhibitionPeriod}
                </Text>
              </Box>
            </Flex>

            <Spacer mt={1} />

            <Box>
              {showTimer && (
                <Timer variant="lg" label="Opens in:" endDate={startAt!} />
              )}
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
        fairsConnection(first: 1) {
          edges {
            node {
              startAt
              exhibitionPeriod
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
