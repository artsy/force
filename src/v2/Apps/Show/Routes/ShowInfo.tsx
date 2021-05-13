import React from "react"
import { Box, Column, GridColumns, HTML, ReadMore, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowInfo_show } from "v2/__generated__/ShowInfo_show.graphql"
import { ShowPartnerEntityHeaderFragmentContainer as ShowPartnerEntityHeader } from "../Components/ShowPartnerEntityHeader"
import { ShowInfoLocationFragmentContainer as ShowInfoLocation } from "../Components/ShowInfoLocation"
import { Media } from "v2/Utils/Responsive"
import { ShowHoursFragmentContainer } from "../Components/ShowHours"

interface ShowInfoProps {
  show: ShowInfo_show
}

export const ShowInfo: React.FC<ShowInfoProps> = ({
  show,
  show: { about, pressRelease, partner, hasLocation },
}) => {
  return (
    <>
      <Text as="h1" variant="md" my={2}>
        About
      </Text>

      <GridColumns>
        <Column span={8}>
          {partner && partner.__typename === "Partner" && (
            <Box mb={2}>
              <Text as="h2" variant="md" mb={1}>
                {partner.type}
              </Text>

              <ShowPartnerEntityHeader partner={partner} />
            </Box>
          )}

          {about && (
            <Box mb={2}>
              <Text as="h3" variant="md" mb={1}>
                Statement
              </Text>

              <Text>{about}</Text>
            </Box>
          )}

          {pressRelease && (
            <Box>
              <Text as="h3" variant="md" mb={1}>
                Press Release
              </Text>

              <HTML>
                <Media lessThan="sm">
                  <ReadMore content={pressRelease} maxChars={400} />
                </Media>

                <Media greaterThanOrEqual="sm">
                  <ReadMore content={pressRelease} maxChars={600} />
                </Media>
              </HTML>
            </Box>
          )}
        </Column>

        {hasLocation && (
          <Column span={4}>
            <Text as="h3" variant="md" mb={1}>
              Location
            </Text>

            <ShowInfoLocation show={show} my={1} />

            <ShowHoursFragmentContainer show={show} my={2} />
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
