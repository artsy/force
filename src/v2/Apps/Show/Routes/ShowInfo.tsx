import * as React from "react"
import {
  Box,
  Column,
  GridColumns,
  HTML,
  Join,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowInfo_show$data } from "v2/__generated__/ShowInfo_show.graphql"
import { ShowPartnerEntityHeaderFragmentContainer as ShowPartnerEntityHeader } from "../Components/ShowPartnerEntityHeader"
import { ShowInfoLocationFragmentContainer as ShowInfoLocation } from "../Components/ShowInfoLocation"
import { Media } from "v2/Utils/Responsive"
import { ShowHoursFragmentContainer } from "../Components/ShowHours"

interface ShowInfoProps {
  show: ShowInfo_show$data
}

export const ShowInfo: React.FC<ShowInfoProps> = ({
  show,
  show: { about, pressRelease, partner, hasLocation },
}) => {
  return (
    <>
      <Text as="h1" variant="xl" my={4}>
        About
      </Text>

      <GridColumns>
        <Column span={8}>
          <Join separator={<Spacer mt={4} />}>
            {about && (
              <Box>
                <Text as="h3" variant="lg" mb={2}>
                  Statement
                </Text>

                <Text variant="sm" mr={2}>
                  {about}
                </Text>
              </Box>
            )}

            {pressRelease && (
              <Box>
                <Text as="h3" variant="lg" mb={2}>
                  Press Release
                </Text>

                <HTML variant="sm" mr={2}>
                  <Media lessThan="sm">
                    <ReadMore content={pressRelease} maxChars={400} />
                  </Media>

                  <Media greaterThanOrEqual="sm">
                    <ReadMore content={pressRelease} maxChars={600} />
                  </Media>
                </HTML>
              </Box>
            )}
          </Join>
        </Column>

        {hasLocation && (
          <Column span={4}>
            <Join separator={<Spacer mt={4} />}>
              {partner && partner.__typename === "Partner" && (
                <Box>
                  <Text as="h2" variant="lg" mb={2}>
                    {partner.type}
                  </Text>

                  <ShowPartnerEntityHeader partner={partner} />
                </Box>
              )}

              <Box>
                <Text as="h3" variant="lg" mb={2}>
                  Location
                </Text>

                <ShowInfoLocation show={show} my={1} />

                <ShowHoursFragmentContainer show={show} my={2} />
              </Box>
            </Join>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const ShowInfoFragmentContainer = createFragmentContainer(ShowInfo, {
  show: graphql`
    fragment ShowInfo_show on Show {
      ...ShowInfoLocation_show
      ...ShowHours_show
      name
      about: description
      pressRelease(format: HTML)
      hasLocation
      partner {
        __typename
        ... on Partner {
          ...ShowPartnerEntityHeader_partner
          type
        }
      }
    }
  `,
})
