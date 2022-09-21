import * as React from "react"
import { DateTime } from "luxon"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerHeaderIconFragmentContainer as FairOrganizerHeaderIcon } from "./FairOrganizerHeaderIcon"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "../../Components/FairOrganizerFollowButton"
import { FairOrganizerInfoFragmentContainer as FairOrganizerInfo } from "./FairOrganizerInfo"
import { FairOrganizerHeader_fairOrganizer$data } from "__generated__/FairOrganizerHeader_fairOrganizer.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Timer } from "Components/Timer"
import { useCurrentTime } from "Utils/Hooks/useCurrentTime"
import { RouterLink } from "System/Router/RouterLink"

interface FairOrganizerHeaderProps {
  fairOrganizer: FairOrganizerHeader_fairOrganizer$data
}

export const FairOrganizerHeader: React.FC<FairOrganizerHeaderProps> = ({
  fairOrganizer,
}) => {
  const { fairsConnection, name } = fairOrganizer
  const fair = extractNodes(fairsConnection)[0]
  const { startAt, exhibitionPeriod, href } = fair

  const currentTime = useCurrentTime({ syncWithServer: true })
  const fairHasNotStarted =
    DateTime.fromISO(currentTime) < DateTime.fromISO(startAt!)

  return (
    <Box>
      <Flex>
        <RouterLink to={href} noUnderline>
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
        </RouterLink>
      </Flex>

      <Spacer mt={75} />

      <GridColumns>
        <Column span={6}>
          <Flex flexDirection="column">
            <Box>
              {/* endAt is not passed to the Timer because this timer will only be shown
              before the fair starts. Therefore the timer only needs to know the length
              of time before the fair begins. The fair's end time is irrelevant. */}
              {fairHasNotStarted && (
                <>
                  <Timer
                    variant={["lg-display", "xl"]}
                    label="Opens in:"
                    startDate={startAt!}
                    endDate=""
                  />
                  <Spacer mt={4} />
                </>
              )}
            </Box>

            <GridColumns>
              <Column span={[12, 8, 6]}>
                {/* @ts-ignore RELAY UPGRADE 13 */}
                <FairOrganizerFollowButton fairOrganizer={fairOrganizer} />
              </Column>
            </GridColumns>

            <Spacer mt={4} />
          </Flex>
        </Column>

        <Column span={6}>
          {/* @ts-ignore RELAY UPGRADE 13 */}
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
        fairsConnection(first: 1, sort: START_AT_DESC) {
          edges {
            node {
              href
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
