import React from "react"
import { Box, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import { FairOrganizerHeaderIcon } from "./FairOrganizerHeaderIcon"
import { FairOrganizerTiming } from "./FairOrganizerTiming"
import { FairOrganizerInfo } from "./FairOrganizerInfo"

export const FairOrganizerHeader: React.FC<any> = ({}) => {
  return (
    <Box>
      <GridColumns>
        <Column span={6}>
          <Flex flexDirection="column">
            <Box>
              <FairOrganizerHeaderIcon />
            </Box>

            <Spacer mt={1} />

            <Box>
              <Text as="h1" variant="xl">
                Explore Art Paris on Artsy
              </Text>

              <FairOrganizerTiming
                fairOrganizer={{
                  status: "upcoming",
                  period: "Aug 8th - 12th",
                  startAt: "2021-08-08T19:00:00+03:00",
                  endAt: "2021-08-12T19:00:00+03:00",
                }}
              />
            </Box>
          </Flex>
        </Column>

        <Column span={6}>
          <FairOrganizerInfo about="Art Paris, the leading spring event for modern and contemporary art, supports and celebrates the French art scene and invites visitors to discover the Spanish and Portuguese art from the 1950s to the present day, from modern masters to contemporary artists." />
        </Column>
      </GridColumns>
    </Box>
  )
}
