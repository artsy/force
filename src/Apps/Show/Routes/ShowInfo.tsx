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
import { ShowInfo_show$data } from "__generated__/ShowInfo_show.graphql"
import { ShowInfoLocationFragmentContainer as ShowInfoLocation } from "Apps/Show/Components/ShowInfoLocation"
import { Media } from "Utils/Responsive"
import { ShowHoursFragmentContainer } from "Apps/Show/Components/ShowHours"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"

interface ShowInfoProps {
  show: ShowInfo_show$data
}

export const ShowInfo: React.FC<ShowInfoProps> = ({
  show,
  show: { about, pressRelease, partner, hasLocation },
}) => {
  const events = show.events || []

  return (
    <>
      <Text as="h1" variant="xl" my={4}>
        About
      </Text>

      <GridColumns>
        <Column span={8}>
          <Join separator={<Spacer y={4} />}>
            {about && (
              <Box>
                <Text as="h3" variant="lg-display" mb={2}>
                  Statement
                </Text>

                <Text variant="sm" mr={2}>
                  {about}
                </Text>
              </Box>
            )}

            {pressRelease && (
              <Box>
                <Text as="h3" variant="lg-display" mb={2}>
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

            {events.length > 0 && <EventList events={events} />}
          </Join>
        </Column>

        {hasLocation && (
          <Column span={4}>
            <Join separator={<Spacer y={4} />}>
              {partner && partner.__typename === "Partner" && (
                <Box>
                  <Text as="h2" variant="lg-display" mb={2}>
                    {partner.type}
                  </Text>

                  <EntityHeaderPartnerFragmentContainer partner={partner} />
                </Box>
              )}

              <Box>
                <Text as="h3" variant="lg-display" mb={2}>
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

const EventList: React.FC<{ events: ShowInfoProps["show"]["events"] }> = ({
  events,
}) => {
  if (!events?.length) return null

  return (
    <Box>
      <Text as="h2" variant="xl" mb="2">
        Events
      </Text>

      <Join separator={<Spacer y="2" />}>
        {events.map((event, index) => {
          if (!event) return null

          const eventHeading = event.title || event.eventType

          return (
            <Box key={index}>
              <Text as="h3" variant="lg">
                {eventHeading}
              </Text>
              <Text color="black60" mb="1">
                {event.dateTimeRange}
              </Text>
              <Text>{event.description}</Text>
            </Box>
          )
        })}
      </Join>
    </Box>
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
      events {
        dateTimeRange
        description
        eventType
        title
      }
      partner {
        __typename
        ... on Partner {
          ...EntityHeaderPartner_partner
          type
        }
      }
    }
  `,
})
