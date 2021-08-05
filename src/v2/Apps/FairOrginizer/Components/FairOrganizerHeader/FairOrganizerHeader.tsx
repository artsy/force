import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerHeaderIconFragmentContainer as FairOrganizerHeaderIcon } from "./FairOrganizerHeaderIcon"
import { FairOrganizerTimingFragmentContainer as FairOrganizerTiming } from "./FairOrganizerTiming"
import { FairOrganizerInfo } from "./FairOrganizerInfo"
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
          </Flex>
        </Column>

        <Column span={6}>
          <FairOrganizerInfo
            about={fairOrganizer.about}
            links={[
              { label: "Facebook", href: "https://www.facebook.com" },
              { label: "Twitter", href: "https://twitter.com" },
            ]}
          />
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
        about
        fairs: fairsConnection(first: 1) {
          edges {
            node {
              ...FairOrganizerTiming_fair
            }
          }
        }
        ...FairOrganizerHeaderIcon_fairOrganizer
      }
    `,
  }
)
