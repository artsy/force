import * as React from "react"
import { DateTime } from "luxon"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "Apps/FairOrginizer/Components/FairOrganizerFollowButton"
import { FairOrganizerInfoFragmentContainer as FairOrganizerInfo } from "./FairOrganizerInfo"
import { FairOrganizerHeader_fairOrganizer$data } from "__generated__/FairOrganizerHeader_fairOrganizer.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Timer } from "Components/Timer"
import { useCurrentTime } from "Utils/Hooks/useCurrentTime"
import { RouterLink } from "System/Components/RouterLink"
import { HeaderIcon } from "Components/HeaderIcon"

interface FairOrganizerHeaderProps {
  fairOrganizer: FairOrganizerHeader_fairOrganizer$data
}

export const FairOrganizerHeader: React.FC<FairOrganizerHeaderProps> = ({
  fairOrganizer,
}) => {
  const { fairsConnection, name, profile } = fairOrganizer
  const [fair] = extractNodes(fairsConnection)
  const { startAt, exhibitionPeriod, href } = fair

  const currentTime = useCurrentTime({ syncWithServer: true })
  const fairHasNotStarted =
    DateTime.fromISO(currentTime) < DateTime.fromISO(startAt!)

  const avatar = profile?.icon?.url

  return (
    <>
      <RouterLink to={href} textDecoration="none" display="block">
        <GridColumns>
          {avatar && (
            <Column span={[12, 12, 1]}>
              <Flex justifyContent={["center", "center", "left"]}>
                <HeaderIcon src={avatar} />
              </Flex>
            </Column>
          )}

          <Column
            span={avatar ? [12, 12, 10] : 12}
            textAlign={avatar ? ["center", "center", "left"] : "left"}
          >
            <Text as="h1" variant={["lg-display", "xl"]}>
              Explore {name} on Artsy
            </Text>

            <Text variant={["lg-display", "xl"]} color="black60">
              {exhibitionPeriod}
            </Text>
          </Column>
        </GridColumns>
      </RouterLink>

      <Spacer y={6} />

      <GridColumns>
        <Column span={6}>
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

                <Spacer y={4} />
              </>
            )}
          </Box>

          <GridColumns>
            <Column span={[12, 8, 6]}>
              <FairOrganizerFollowButton fairOrganizer={fairOrganizer} />
            </Column>
          </GridColumns>
        </Column>

        <Column span={6}>
          <FairOrganizerInfo fairOrganizer={fairOrganizer} />
        </Column>
      </GridColumns>
    </>
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
        profile {
          icon {
            url(version: ["large", "square", "square140"])
          }
        }
        ...FairOrganizerFollowButton_fairOrganizer
        ...FairOrganizerInfo_fairOrganizer
      }
    `,
  }
)
