import React from "react"
import { Box, Column, GridColumns, HTML, ReadMore, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowInfo_show } from "v2/__generated__/ShowInfo_show.graphql"
import { ShowPartnerEntityHeaderFragmentContainer as ShowPartnerEntityHeader } from "../Components/ShowPartnerEntityHeader"
import { ShowInfoLocationFragmentContainer as ShowInfoLocation } from "../Components/ShowInfoLocation"
import { Media } from "v2/Utils/Responsive"

interface ShowInfoProps {
  show: ShowInfo_show
}

export const ShowInfo: React.FC<ShowInfoProps> = ({
  show,
  show: { about, pressRelease, partner, hasLocation },
}) => {
  return (
    <>
      <Text as="h1" variant="largeTitle" my={3}>
        About
      </Text>

      <GridColumns>
        <Column span={8}>
          {partner && partner.__typename === "Partner" && (
            <Box mb={3}>
              <Text as="h2" variant="mediumText" mb={1}>
                {partner.type}
              </Text>

              <ShowPartnerEntityHeader partner={partner} />
            </Box>
          )}

          {about && (
            <Box mb={3}>
              <Text as="h3" variant="mediumText" mb={1}>
                Statement
              </Text>

              <Text>{about}</Text>
            </Box>
          )}

          {pressRelease && (
            <Box>
              <Text as="h3" variant="mediumText" mb={1}>
                Press Release
              </Text>

              <HTML variant="text">
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
            <Text as="h3" variant="mediumText" mb={1}>
              Location
            </Text>

            <ShowInfoLocation show={show} />
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

// Top-level route needs to be exported for bundle splitting in the router
export default ShowInfoFragmentContainer
